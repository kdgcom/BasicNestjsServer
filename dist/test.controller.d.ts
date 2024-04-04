import { TestService } from './test.service';
import { UpdateMemberProfileDTO } from './auth/dto/updateMemberProfile.dto';
export declare class TestController {
    private readonly testService;
    constructor(testService: TestService);
    test(updateDTO: UpdateMemberProfileDTO): string;
}
