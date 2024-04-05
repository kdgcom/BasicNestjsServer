import EntityDefinition from "src/definition/entity.definition";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('T_MEMBER')
export class MemberEntity extends EntityDefinition
{
//    @PrimaryGeneratedColumn()
    @Column()
    nMEM_ID: number;

    @Column()
    sUSER_ID: string;

    @PrimaryColumn()
    sARMY_CODE: string;

    @Column()
    sNAME: string;

    @Column()
    cRANK: string;

    @Column()
    cROLE: string;

    @Column()
    dCREATE: string;

    @Column()
    dUPDATE: string;

    @Column()
    sPASSWORD: string;

    @Column()
    sMEMO: string;

    @Column()
    cSHIP_TYPE: string;

    @Column()
    nDEP_ID: number;

    @Column()
    nUNIT_ID: number;

    @Column()
    tSEARCH: string;

    @Column( {default: false} )
    bACTIVE: number;
}