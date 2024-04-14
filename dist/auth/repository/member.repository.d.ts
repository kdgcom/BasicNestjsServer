import { DataSource } from "typeorm";
import { MemberEntity } from "../entity/member.entity";
import MasterRepository from "../../repository/master.repository";
import { UpdateMemberProfileDTO } from "src/auth/dto/updateMemberProfile.dto";
import { MemberRoleRepository } from "./memberRole.repository";
export declare class MemberRepository extends MasterRepository<MemberEntity> {
    protected readonly dataSource: DataSource;
    private memberRoleRepository;
    constructor(dataSource: DataSource, memberRoleRepository: MemberRoleRepository);
    memberList(): Promise<MemberEntity[]>;
    findOneByMemID(id: number): Promise<any>;
    findOneByID(id: string): Promise<any>;
    findOneByArmycode(sARMY_CODE: string): Promise<any>;
    updateMemberProfile(profile: UpdateMemberProfileDTO): Promise<void>;
    findOneByArmycode2(id: string): Promise<any>;
}
