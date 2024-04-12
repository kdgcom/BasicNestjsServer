import { MemberEntity } from "src/VSTS/entity/member.entity";
import DTODefinition from "src/definition/dto.definition";
export declare class UpdateMemberProfileDTO extends DTODefinition {
    name: string;
    userID: string;
    passwd: string;
    depID: number;
    rankCode: string;
    isActive: number;
    accessToken: string;
    refreshToken: string;
    level: number;
    role: string;
    toEntity(): MemberEntity;
}
