import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/VSTS/repository/member.repository';
import { isEmpty } from 'src/util/common/text.util';
import BasicResponse from 'src/util/response/BasicResponse';
import BasicException from 'src/util/response/basicException';
import { UpdateMemberProfileDTO } from './dto/updateMemberProfile.dto';

@Injectable()
export class AuthService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async sample(profile: UpdateMemberProfileDTO): Promise<BasicResponse>
  {
    // do something
    return new BasicResponse(200);
  }

  async getUser(armycode: string): Promise<BasicResponse>
  {
    const mem = await this.memberRepository.findOneByArmycode(armycode);
    if ( isEmpty(mem) )
      throw new BasicException();
    return new BasicResponse(200);
  }

  async updateUser(profile: UpdateMemberProfileDTO): Promise<BasicResponse>
  {
    return new BasicResponse(200);
  }
}
