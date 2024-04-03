import { DataSource } from "typeorm";
import { Member } from "../entity/member.entity";
export declare class MemberRepository {
    private readonly dataSource;
    private memberRepository;
    constructor(dataSource: DataSource);
    memberList(): Promise<Member[]>;
    findOneByArmycode(sARMY_CODE: string): Promise<Member[]>;
}
