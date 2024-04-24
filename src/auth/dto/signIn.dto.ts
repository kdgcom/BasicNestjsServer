import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { MemberEntity } from "src/auth/entity/member.entity";
import DTODefinition from "src/lib/definition/dto.definition";
import { isEmpty } from "src/util/common/text.util";

export class SignInDTO extends DTODefinition
{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"유저ID"})
    userID!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({description:"패스워드"})
    passwd!: string;
    
    public toEntity(): any
    {
        return null;
    }
}

export class SignInResDTO extends DTODefinition
{
    @IsString()
    @IsNotEmpty()
    // @ApiProperty({})
    accessToken!: string;

    public toEntity(): any
    {
        return null;
    }
}