import { MemberRepository } from 'src/VSTS/repository/member.repository';
import BasicResponse from 'src/util/response/BasicResponse';
import { UpdateMemberProfileDTO } from './dto/updateMemberProfile.dto';
import { SignInDTO } from './dto/signIn.dto';
export declare class AuthService {
    private readonly memberRepository;
    constructor(memberRepository: MemberRepository);
    sample(profile: UpdateMemberProfileDTO): Promise<BasicResponse>;
    getUser(armycode: string): Promise<BasicResponse>;
    getUser2(armycode: string): Promise<BasicResponse>;
    updateUser(profile: UpdateMemberProfileDTO): Promise<BasicResponse>;
    signIn(sidto: SignInDTO): Promise<BasicResponse>;
}
