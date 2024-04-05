import { IsNotEmpty } from "class-validator";
import { MemberEntity } from "src/VSTS/entity/member.entity";
import DTODefinition from "src/definition/dto.definition";
import { isEmpty } from "src/util/common/text.util";

export class UpdateMemberProfileDTO extends DTODefinition
{
    name: string;
    userID: string;
    passwd: string;
    depID: number;      // 부서ID
    rankCode: string;   // 계급 코드
    isActive: number;   // 활성화여부. 1/0
    
    @IsNotEmpty()
    armyCode: string;

    public toEntity(): MemberEntity 
    {
        const member = new MemberEntity();
        member.sARMY_CODE = this.armyCode;
        if ( this.name ) member.sNAME = this.name;
        if ( this.userID ) member.sUSER_ID = this.userID;
        if ( this.passwd ) member.sPASSWORD = this.passwd;
        if ( this.depID ) member.nDEP_ID = this.depID;
        if ( this.rankCode ) member.cRANK = this.rankCode;
        if ( !isEmpty(this.isActive) ) member.bACTIVE = this.isActive;

        return member;
    }
}