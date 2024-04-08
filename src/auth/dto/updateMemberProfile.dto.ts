import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { MemberEntity } from "src/VSTS/entity/member.entity";
import DTODefinition from "src/definition/dto.definition";
import { isEmpty } from "src/util/common/text.util";

export class UpdateMemberProfileDTO extends DTODefinition
{
    @IsString()
    name: string;

    @IsString()
    userID: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    passwd: string;

    @IsNumber()
    depID: number;      // 부서ID

    @IsString()
    rankCode: string;   // 계급 코드

    @IsNumber()
    isActive: number;   // 활성화여부. 1/0
    
    @IsString()
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