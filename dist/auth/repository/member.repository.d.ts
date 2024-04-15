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
    findOneByMemID(id: number): Promise<MemberEntity | null>;
    findOneByID(id: string): Promise<MemberEntity | null>;
    findOneByWhat(what: string, str: any): Promise<MemberEntity | null>;
    findOneByArmycode(sARMY_CODE: string): Promise<MemberEntity | null>;
    updateMemberProfile(profile: UpdateMemberProfileDTO): Promise<boolean>;
    findOneByArmycode2(id: string): Promise<any>;
}
