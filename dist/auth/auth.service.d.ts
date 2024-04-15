import { MemberRepository } from 'src/auth/repository/member.repository';
import BasicResponse from 'src/util/response/BasicResponse';
import { UpdateMemberProfileDTO } from './dto/updateMemberProfile.dto';
import { SignInDTO } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly memberRepository;
    private jwtService;
    constructor(memberRepository: MemberRepository, jwtService: JwtService);
    sample(profile: UpdateMemberProfileDTO | null): Promise<BasicResponse>;
    getUser(armycode: string): Promise<BasicResponse>;
    getUser2(armycode: string): Promise<BasicResponse>;
    updateUser(profile: UpdateMemberProfileDTO): Promise<BasicResponse>;
    signIn(sidto: SignInDTO): Promise<any>;
    tokenRefresh(rt: string): Promise<any>;
}
