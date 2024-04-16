import { DataSource } from "typeorm";
import MasterRepository from "../../repository/master.repository";
import { MemberRoleEntity } from "../entity/role.entity";
export declare class MemberRoleRepository extends MasterRepository<MemberRoleEntity> {
    constructor(dataSource: DataSource);
    findOneByMemID(id: number): Promise<MemberRoleEntity | null>;
    deleteAllMemberRole(memID: number): Promise<import("typeorm").DeleteResult>;
    insertMemberRole(memID: number, roleCode: string): Promise<any>;
}
