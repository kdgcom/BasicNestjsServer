import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { MemberEntity } from "src/VSTS/entity/member.entity";
import DTODefinition from "src/definition/dto.definition";
import { isEmpty } from "src/util/common/text.util";

export class SignInDTO extends DTODefinition
{
    @IsString()
    @IsNotEmpty()
    userID: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    passwd: string;
    
    public toEntity(): any
    {
        return null;
    }
}