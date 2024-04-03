import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/VSTS/repository/member.repository';
import BasicResponse from 'src/util/response/BasicResponse';

@Injectable()
export class AuthService {
  constructor(private readonly memberRepository: MemberRepository) {}

  authHello(): string {
    return 'Auth Hello!';
  }

  async getUser(armycode): Promise<BasicResponse>
  {
    const mem = await this.memberRepository.findOneByArmycode(armycode);
    return new BasicResponse(200);
  }
}
