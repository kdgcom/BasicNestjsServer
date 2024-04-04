import { MemberRepository } from 'src/VSTS/repository/member.repository';
import BasicResponse from 'src/util/response/BasicResponse';
import { UpdateMemberProfileDTO } from './dto/updateMemberProfile.dto';
export declare class AuthService {
    private readonly memberRepository;
    constructor(memberRepository: MemberRepository);
    sample(profile: UpdateMemberProfileDTO): Promise<BasicResponse>;
    getUser(armycode: string): Promise<BasicResponse>;
    updateUser(profile: UpdateMemberProfileDTO): Promise<BasicResponse>;
}
