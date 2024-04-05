import { DataSource } from "typeorm";
import { MemberEntity } from "../entity/member.entity";
export declare class MemberRepository {
    private readonly dataSource;
    private memberRepository;
    constructor(dataSource: DataSource);
    memberList(): Promise<MemberEntity[]>;
    findOneByArmycode(sARMY_CODE: string): Promise<MemberEntity[]>;
    updateMemberProfile(profile: MemberEntity): Promise<import("typeorm").UpdateResult>;
}
