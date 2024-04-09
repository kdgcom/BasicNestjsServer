import { HttpCode, Injectable, UnauthorizedException } from '@nestjs/common';
import { MemberRepository } from 'src/VSTS/repository/member.repository';
import { isEmpty, passwordCompare } from 'src/util/common/text.util';
import BasicResponse from 'src/util/response/BasicResponse';
import BasicException from 'src/util/response/basicException';
import { UpdateMemberProfileDTO } from './dto/updateMemberProfile.dto';
import { MemberEntity } from 'src/VSTS/entity/member.entity';
import { ResponseCode } from 'src/util/response/responseCode';
import _l from 'src/util/logger/log.util';
import { plainToClass } from 'class-transformer';
import { SignInDTO } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private jwtService: JwtService
  ) {}

  async sample(profile: UpdateMemberProfileDTO): Promise<BasicResponse>
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
    _l.log(mem);
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
   * 유저를 로그인 시킴
   * 
   * @param id 
   * @param pw 
   */
  async signIn(sidto: SignInDTO)
  {
    let me: MemberEntity = null;
    if ( !(me = await this.memberRepository.findOneByArmycode(sidto.userID)) ) // 유저가 없을 경우
      // throw new UnauthorizedException();
      throw new BasicException(ResponseCode.NOT_FOUND);
    const user = me.toPlain();
    if ( !passwordCompare(sidto.passwd, user.password) ) // 패스워드가 틀릴 경우 Forbidden
      // throw new UnauthorizedException();
      throw new BasicException(ResponseCode.UNAUTHORIZED);
    
    const payload = { id: user.armyCode, username: user.name, rank: user.rank, memID: user.memID };
    const ret = { access_token: await this.jwtService.signAsync(payload) };
    return new BasicResponse(ResponseCode.OK).data(ret);

  }
}
