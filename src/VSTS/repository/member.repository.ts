import { Injectable } from "@nestjs/common";
import { DataSource, Repository, createQueryBuilder } from "typeorm";
import { MemberEntity } from "../entity/member.entity";
import _l from "src/util/logger/log.util";
import { classToClassFromExist } from "class-transformer";
import MasterRepository from "./master.repository";
import { UpdateMemberProfileDTO } from "src/auth/dto/updateMemberProfile.dto";
import { passwordEncrypt } from "src/util/common/text.util";

@Injectable()
export class MemberRepository extends MasterRepository
{
    private repository: Repository<MemberEntity>;

    constructor(protected readonly dataSource: DataSource)
    // constructor()
    {
        super(dataSource);
        this.repository = this.dataSource.getRepository(MemberEntity)
    }

    // createMember()
    async memberList()
    {
        return await this.repository.find();
    }

    async findOneByArmycode(sARMY_CODE: string)
    {
        return (await this.repository.find({
            // select: {
            //     sNAME: true,
            // },
            where: {
                "sARMY_CODE": sARMY_CODE
            }
        }))[0];
    }

    /**
     * 유저의 정보를 update. info는 DTO --> DTO를 Entity형태로 전환하여 save를 수행.
     * 이때 업데이트 키값 역시 DTO에 들어 있어야 한다.
     * 
     * password의 경우 자동으로 bcrypt가 적용 되어 들어가게 된다.
     * 
     * @param info 어떤 정보를 update할 것인가? json형태의 DTO
     */
    async updateMemberProfile(profile: UpdateMemberProfileDTO)
    {
        if ( profile.passwd ) // 패스워드가 들어 왔다면 bcrypt를 이용한 해쉬를 이용
            profile.passwd = passwordEncrypt(profile.passwd);

        const entity = profile.toEntity();
        return await this.repository.update({"sARMY_CODE": entity.sARMY_CODE}, entity);

//        return await this.dataSource.createQueryBuilder().update(MemberEntity)
//            .set( profile ).where("").execute();
    }

    async findOneByArmycode2(armyCode: string): Promise<any>
    {
        const sql: string = 
        `
        SELECT * FROM T_MEMBER where "sARMY_CODE"=:armyCode
        `
        return (await this.doRawQuery(sql, {armyCode}, {}))[0];
    }
}