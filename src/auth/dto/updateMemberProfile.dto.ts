import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { MemberEntity } from "src/auth/entity/member.entity";
import { MyConst } from "src/const/MyConst";
import DTODefinition from "src/definition/dto.definition";
import { isEmpty } from "src/util/common/text.util";

export class UpdateMemberProfileDTO extends DTODefinition
{
    @IsString()
    @IsOptional()
    name!: string;

    @IsString()
    @IsOptional()
    userID!: string;

    @IsString()
    @IsOptional()
    @MinLength(8)
    passwd!: string;

    @IsNumber()
    @IsOptional()
    depID!: number;      // 부서ID

    @IsString()
    @IsOptional()
    rankCode!: string;   // 계급 코드

    @IsNumber()
    @IsOptional()
    isActive!: number;   // 활성화여부. 1/0
    
    @IsString()
    @IsOptional()
    accessToken!: string;

    @IsString()
    @IsOptional()
    refreshToken!: string;

    @IsNumber()
    @IsOptional()
    level!: number;

    @IsString()
    @IsOptional()
    role!: string;

    public toEntity(): MemberEntity 
    {
        const member: any = new MemberEntity();
        member[MyConst.DB_FIELD_MEM_UNIQUE] = this.userID;
        if ( this.name )    member.sNAME = this.name;
        if ( this.passwd )  member.sPASSWORD = this.passwd;
        if ( this.depID )   member.nDEP_ID = this.depID;
        if ( this.rankCode ) member.cRANK = this.rankCode;
        if ( this.level )   member.nLEVEL = this.level;

        if ( !isEmpty(this.isActive) ) member.bACTIVE = this.isActive;
        if ( !isEmpty(this.accessToken) ) member.sACCESS_TOKEN = this.accessToken;
        if ( !isEmpty(this.refreshToken) ) member.sREFRESH_TOKEN = this.refreshToken;

        return member;
    }
}