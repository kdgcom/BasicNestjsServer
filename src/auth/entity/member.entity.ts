import EntityDefinition from "src/lib/definition/entity.definition";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('T_MEMBER')
export class MemberEntity extends EntityDefinition
{
   @PrimaryGeneratedColumn()
    nMEM_ID!: number;

    @Column()
    sUSER_ID!: string;

    @Column()
    sNAME!: string;

    // @Column()
    // cROLE!: string;

    @Column()
    dCREATE!: string;

    @Column()
    dUPDATE!: string;

    @Column()
    sPASSWORD!: string;

    @Column()
    sMEMO!: string;

    @Column()
    tSEARCH!: string;

    @Column( {default: false} )
    bACTIVE!: number;

    @Column()
    sACCESS_TOKEN!: string;

    @Column()
    sREFRESH_TOKEN!: string;

    @Column()
    nLEVEL!: number;

    // @Column()
    // sEMAIL: string;

}