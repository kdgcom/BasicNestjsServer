import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Member } from "../entity/member.entity";
import _l from "src/util/logger/log.util";

@Injectable()
export class MemberRepository
{
    private memberRepository: Repository<Member>;

    constructor(private readonly dataSource: DataSource)
    {
        this.memberRepository = dataSource.getRepository(Member)
    }

    // createMember()
    async memberList()
    {
        return await this.memberRepository.find();
    }

    async findOneByArmycode(sARMY_CODE: string)
    {
        return await this.memberRepository.find({
            select: {
                sNAME: true,
            },
            where: {
                "sARMY_CODE": sARMY_CODE
            }
        })
    }

    /**
     * 
     * @param info 어떤 정보를 update할 것인가? json형태
     */
    async updateMemberProfile(info: any)
    {

    }
}