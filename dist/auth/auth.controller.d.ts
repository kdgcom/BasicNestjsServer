import { AuthService } from './auth.service';
import BasicResponse from 'src/util/response/BasicResponse';
import { UpdateMemberProfileDTO } from './dto/updateMemberProfile.dto';
import { SignInDTO } from './dto/signIn.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getHello(): Promise<BasicResponse>;
    getUserByArmyCode(params: any): Promise<BasicResponse>;
    getUserByArmyCode2(params: any): Promise<BasicResponse>;
    updateUser(profile: UpdateMemberProfileDTO): Promise<BasicResponse>;
    signIn(body: SignInDTO): Promise<BasicResponse>;
}
