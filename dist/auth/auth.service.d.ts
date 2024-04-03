import { MemberRepository } from 'src/VSTS/repository/member.repository';
import BasicResponse from 'src/util/response/BasicResponse';
export declare class AuthService {
    private readonly memberRepository;
    constructor(memberRepository: MemberRepository);
    authHello(): string;
    getUser(armycode: string): Promise<BasicResponse>;
}
