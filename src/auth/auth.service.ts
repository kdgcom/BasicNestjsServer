import { Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/VSTS/repository/member.repository';
import BasicResponse from 'src/util/response/BasicResponse';
import BasicException from 'src/util/response/basicException';

@Injectable()
export class AuthService {
  constructor(private readonly memberRepository: MemberRepository) {}

  authHello(): string {
    return 'Auth Hello!';
  }

  async getUser(armycode: string): Promise<BasicResponse>
  {
    throw new BasicException(470);
    const mem = await this.memberRepository.findOneByArmycode(armycode);
    return new BasicResponse(200);
  }
}
