import EntityDefinition from "src/lib/definition/entity.definition";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('T_MEMBER_ROLE')
export class MemberRoleEntity extends EntityDefinition
{
    @PrimaryColumn()
    nMEM_ROLE_ID!: number;

    @Column()
    cROLE!: string;

    @Column()
    nMEM_ID!: number

}

@Entity('TAB_USER_ROLE')
export class UserRoleEntity extends EntityDefinition
{
    @PrimaryColumn()
    USER_ROLE_ID    !: number;

    @Column()
    ROLE    !: string;

    @Column()
    ACCOUNT_ID    !: number

}