import { AuthService } from './auth.service';
import BasicResponse from 'src/util/response/BasicResponse';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getHello(): string;
    getUserByArmyCode(params: any): Promise<BasicResponse>;
}
