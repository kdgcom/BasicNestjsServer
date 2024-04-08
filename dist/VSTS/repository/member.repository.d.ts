import { DataSource } from "typeorm";
import { MemberEntity } from "../entity/member.entity";
import MasterRepository from "./master.repository";
import { UpdateMemberProfileDTO } from "src/auth/dto/updateMemberProfile.dto";
export declare class MemberRepository extends MasterRepository {
    protected readonly dataSource: DataSource;
    private repository;
    constructor(dataSource: DataSource);
    memberList(): Promise<MemberEntity[]>;
    findOneByArmycode(sARMY_CODE: string): Promise<MemberEntity>;
    updateMemberProfile(profile: UpdateMemberProfileDTO): Promise<import("typeorm").UpdateResult>;
    findOneByArmycode2(armyCode: string): Promise<any>;
}
