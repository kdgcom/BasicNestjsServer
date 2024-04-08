import DTODefinition from "src/definition/dto.definition";
export declare class SignInDTO extends DTODefinition {
    userID: string;
    passwd: string;
    toEntity(): any;
}
