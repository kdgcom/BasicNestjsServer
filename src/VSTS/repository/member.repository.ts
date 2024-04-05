import { Injectable } from "@nestjs/common";
import { DataSource, Repository, createQueryBuilder } from "typeorm";
import { MemberEntity } from "../entity/member.entity";
import _l from "src/util/logger/log.util";
import { classToClassFromExist } from "class-transformer";

@Injectable()
export class MemberRepository
{
    private memberRepository: Repository<MemberEntity>;

    constructor(private readonly dataSource: DataSource)
    {
        this.memberRepository = dataSource.getRepository(MemberEntity)
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
     * 유저의 정보를 update. info는 DTO --> DTO를 Entity형태로 전환하여 save를 수행.
     * 이때 업데이트 키값 역시 DTO에 들어 있어야 한다.
     * 
     * @param info 어떤 정보를 update할 것인가? json형태의 DTO
     */
    async updateMemberProfile(profile: MemberEntity)
    {
        return await this.memberRepository.update({"sARMY_CODE": profile.sARMY_CODE}, profile);
//        return await this.dataSource.createQueryBuilder().update(MemberEntity)
//            .set( profile ).where("").execute();
    }
}