import { IsNotEmpty } from "class-validator";

export class UpdateMemberProfileDTO
{
    name: string;
    userID: string;
    passwd: string;
    depID: string;      // 부서ID
    rankCode: string;   // 계급 코드
    isActive: boolean;   // 활성화여부
}