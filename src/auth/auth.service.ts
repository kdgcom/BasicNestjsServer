import { HttpCode, Injectable, UnauthorizedException } from '@nestjs/common';
import { MemberRepository } from 'src/auth/repository/member.repository';
import { isEmpty, passwordCompare } from 'src/util/common/text.util';
import BasicResponse from 'src/lib/definition/response/BasicResponse';
import BasicException from 'src/lib/definition/response/basicException';
import { UpdateMemberProfileDTO } from './dto/updateMemberProfile.dto';
import { MemberEntity } from 'src/auth/entity/member.entity';
import { ResponseCode } from 'src/lib/definition/response/responseCode';
import _l from 'src/util/logger/log.util';
import { plainToClass } from 'class-transformer';
import { SignInDTO } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './guard/payload.jwt';
import { MyConst } from 'src/const/MyConst';
import { ExceptionApiNotFound, ExceptionApiUnauthorized } from 'src/lib/definition/response/all.exception';
import { bool } from 'aws-sdk/clients/signer';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private jwtService: JwtService
  ) {}

  async sample(profile: UpdateMemberProfileDTO | null): Promise<BasicResponse>
  {
    // do something
    return new BasicResponse(200);
  }

  async getUser(armycode: string): Promise<BasicResponse>
  {
    const mem = await this.memberRepository.findOneByArmycode(armycode);
    if ( isEmpty(mem) )
      throw new BasicException(ResponseCode.INTERNAL_SERVER_ERROR);
    return new BasicResponse(ResponseCode.OK).data(mem);
  }

  /**
   * 
   * @param armycode 
   * @returns 
   */
  async getUser2(armycode: string): Promise<BasicResponse>
  {
    const memPlain = await this.memberRepository.findOneByArmycode2(armycode);
    if ( isEmpty(memPlain) )
      throw new BasicException(ResponseCode.NOT_FOUND);
    const mem = plainToClass(MemberEntity, memPlain);
    // _l.log(mem);
    return new BasicResponse(ResponseCode.OK).data(mem.toPlain());
  }

  /**
   * 유저 정보 update
   * 
   * @param profile UpdateMemberProfileDTO 형식의 유저 profile
   * @returns 
   */
  async updateUser(profile: UpdateMemberProfileDTO): Promise<BasicResponse>
  {
    const res = await this.memberRepository.updateMemberProfile(profile);
    _l.success_detail("res : ", res);
    return new BasicResponse(ResponseCode.ACCEPTED);
  }

  /**
   * 유저를 로그인 시킴 by ID/PW
   * 사용자에게 access_token을 전달하고, 
   * refresh_token은 cookie set 되도록 한다.(httpOnly 로)
   * 
   * @param id 
   * @param pw 
   * @return {BasicResponse, refresh_token} : controller에서 RT를 쿠키로 보내기 위함
   */
  async signIn(user: any): Promise<any>
  {
    let me: MemberEntity | null = null;
    // DB에서 유저 확인
    // if ( !(me = await this.memberRepository.findOneByID(sidto.userID)) ) // 유저가 없을 경우
    //   throw new ExceptionApiNotFound();
    // DB 결과물을 plain json으로 변환
    // const user = me.toPlain();
    // const user: any = this.validateUser(sidto.userID, sidto.passwd);
    // if ( !passwordCompare(sidto.passwd, user.password) ) // 패스워드가 틀릴 경우 Forbidden
    //   throw new ExceptionApiUnauthorized();
    
    const data = await this.makeNewTokens(user.memID, user);
    // payload에 탑재하여 jwt로 변환 및 클라이언트로 리턴
    // const payloadObject = { id: user.armyCode, username: user.name, rank: user.rank, memID: user.memID };
    // // const payload = new JWTPayload(user.armyCode, user.name, user.rank, user.memID, user.level);
    // const payload = new JWTPayload(payloadObject);
    // const data = 
    // { 
    //   // access_token: await this.jwtService.signAsync(payload) ,
    //   accessToken: await payload.toJWTAT(),
    //   refreshToken: await payload.toJWTRT(),
    // };

    // // AT 및 RT 업데이트
    // const member = new UpdateMemberProfileDTO();
    // member.userID = user.id;
    // member.accessToken = data.accessToken;
    // member.refreshToken = data.refreshToken;
    // this.memberRepository.updateMemberProfile(member);
    return { ret: new BasicResponse(ResponseCode.ACCEPTED).data(data), refreshToken: data.refreshToken };
  }

  async tokenRefresh(rt: string): Promise<any>
  {
    let refreshToken = "";
    try {
        // JWT 토큰에서 payload를 뽑아냄
        const payload = await this.jwtService.verifyAsync(
          rt,
          {
            secret: MyConst.JWT_SECRET
          }
        );
        // 여기에 오면 valid 한 rt
        // DB의 값과 확인
        this.memberRepository.findOneByMemID(payload.memID)

      } catch {
        throw new BasicException(ResponseCode.UNAUTHORIZED);
      }
    return {res:new BasicResponse(ResponseCode.OK), refreshToken};

  }

  async refreshATFromRT(rt: string)
  {
    let refreshToken = "";
    try 
    {
      // RT validation
      const rtPayload = await this.jwtService.verifyAsync(
        rt,
        {
          secret: MyConst.JWT_SECRET
        }
      );
      // 여기에 오면 valid 한 rt
      // DB의 값과 확인
      const _user = await this.memberRepository.findOneByMemID(rtPayload.memID);

_l.debug_("user : ", _user);
      if ( !_user ) // 이런 케이스는 존재할 수 없지만 일단 오류 처리. 대외적으로는 unauthorized로 나가도 될거라 봄
        throw new BasicException(ResponseCode.WRONG_DATA);
      const user = _user.toPlain();

      const data = await this.makeNewTokens(rtPayload.memID, user, false);
_l.debug_("data : ", data);

      return data.accessToken;
    }
    catch(e) 
    {
_l.debug_("exception : ", e);
      throw new BasicException(ResponseCode.UNAUTHORIZED);

    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const me = await this.memberRepository.findOneByID(username);
    _l.log("me : ", me);
    const user = me?.toPlain();
    if ( !passwordCompare(pass, user.password) ) // 패스워드가 틀릴 경우 Forbidden
      throw new ExceptionApiUnauthorized();
    const { password, ...result } = user;
    return result;
  }

  /**
   * 유저 정보로부터 accessToken 생성
   * 새로 생성된 토큰은 사용자의 DB에 update된다.
   * @param memID 
   * @param _user DB로부터 전해 받은 계정 정보 일체. toPlain()을 수행한 결과를 넣어야 한다.
   */
  async makeNewTokens(memID: number, user: any, flagNewRT:boolean=true)
  {
    try
    {
    // at와 rt 새로 생성
    const payloadObject = { id: user.armyCode, username: user.name, rank: user.rank, memID: memID };
    const payload = new JWTPayload(payloadObject);
    const data: any = 
    { 
      accessToken: await payload.toJWTAT(),
    };

    // AT 및 RT 업데이트
    const member = new UpdateMemberProfileDTO();
    member.userID = payloadObject.id;
    member.accessToken = data.accessToken;
    if ( flagNewRT )
    {
      data["refreshToken"] = await payload.toJWTRT();
      member.refreshToken = data.refreshToken;        
    }
    this.memberRepository.updateMemberProfile(member);

    return data;

    }
    catch(e)
    {
      throw new BasicException(ResponseCode.INTERNAL_SERVER_ERROR, "JWT 토큰을 생성할 수 없습니다.");
    }
  }
}
