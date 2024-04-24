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
  async signIn(sidto: SignInDTO): Promise<any>
  {
    let me: MemberEntity | null = null;
    // DB에서 유저 확인
    if ( !(me = await this.memberRepository.findOneByArmycode(sidto.userID)) ) // 유저가 없을 경우
      throw new ExceptionApiNotFound();
    // DB 결과물을 plain json으로 변환
    const user = me.toPlain();
    if ( !passwordCompare(sidto.passwd, user.password) ) // 패스워드가 틀릴 경우 Forbidden
      throw new ExceptionApiUnauthorized();
    
    // payload에 탑재하여 jwt로 변환 및 클라이언트로 리턴
    // const payload = { id: user.armyCode, username: user.name, rank: user.rank, memID: user.memID };
    const payload = new JWTPayload(user.armyCode, user.name, user.rank, user.memID, user.level);
    const data = 
    { 
      // access_token: await this.jwtService.signAsync(payload) ,
      accessToken: await payload.toJWTAT(),
      refreshToken: await payload.toJWTRT(),
    };

    // AT 및 RT 업데이트
    const member = new UpdateMemberProfileDTO();
    member.userID = sidto.userID;
    member.accessToken = data.accessToken;
    member.refreshToken = data.refreshToken;
    this.memberRepository.updateMemberProfile(member);
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
}
