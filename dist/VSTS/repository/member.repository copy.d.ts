import { DataSource } from "typeorm";
import { MemberEntity } from "../entity/member.entity";
import MasterRepository from "./master.repository";
import { UpdateMemberProfileDTO } from "src/auth/dto/updateMemberProfile.dto";
export declare class MemberRepository extends MasterRepository {
    protected readonly dataSource: DataSource;
    private repository;
    constructor(dataSource: DataSource);
    memberList(): Promise<MemberEntity[]>;
    findOneByMemID(id: number): Promise<any>;
    findOneByID(id: string): Promise<any>;
    findOneByArmycode(sARMY_CODE: string): Promise<any>;
    updateMemberProfile(profile: UpdateMemberProfileDTO): Promise<void>;
    findOneByArmycode2(id: string): Promise<any>;
}
