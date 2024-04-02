import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('T_MEMBER')
export class Member
{
    @PrimaryGeneratedColumn()
    nMEM_ID: number;

    @Column()
    sUSER_ID: string;

    @Column()
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
    bACTIVE: string;
}