import { DataSource } from "typeorm";
import MasterRepository from "./master.repository";
import { UpdateMemberProfileDTO } from "src/auth/dto/updateMemberProfile.dto";
import { MemberRoleEntity } from "../entity/role.entity";
export declare class MemberRoleRepository extends MasterRepository<MemberRoleEntity> {
    protected readonly dataSource: DataSource;
    constructor(dataSource: DataSource);
    findOneByMemID(id: number): Promise<any>;
    deleteMemberRole(memID: number): Promise<import("typeorm").DeleteResult>;
    insertMemberRole(memID: any, roleCode: any): Promise<any>;
    updateMemberProfile(profile: UpdateMemberProfileDTO): Promise<void>;
}
