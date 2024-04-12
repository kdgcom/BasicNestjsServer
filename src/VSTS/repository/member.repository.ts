import { Injectable } from "@nestjs/common";
import { DataSource, Repository, createQueryBuilder } from "typeorm";
import { MemberEntity } from "../entity/member.entity";
import _l from "src/util/logger/log.util";
import { classToClassFromExist } from "class-transformer";
import MasterRepository from "./master.repository";
import { UpdateMemberProfileDTO } from "src/auth/dto/updateMemberProfile.dto";
import { passwordEncrypt } from "src/util/common/text.util";
import { MyConst } from "src/const/MyConst";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberRoleRepository } from "./memberRole.repository";

@Injectable()
export class MemberRepository extends MasterRepository<MemberEntity>
{
    constructor(
        protected readonly dataSource: DataSource,
        @InjectRepository(MemberRoleRepository) 
        private memberRoleRepository: MemberRoleRepository
    )
    // constructor()
    {
        super(MemberEntity, dataSource);
        // this.repository = this.dataSource.getRepository(MemberEntity)
    }

    // createMember()
    async memberList()
    {
        return await this.find();
    }

    async findOneByMemID( id: number )
    {
        const where = {};
        where[MyConst.DB_FIELD_MEM_ID] = id;
        return await this.find({ where })[0];
    }

    async findOneByID(id: string)
    {
        const where = {};
        where[MyConst.DB_FIELD_MEM_UNIQUE] = id;
        return await this.find({ where })[0];
    }

    async findOneByArmycode(sARMY_CODE: string)
    {
        // return (await this.repository.find({
        //     where: {
        //         "sARMY_CODE": sARMY_CODE
        //     }
        // }))[0];

        return await this.findOneByID(sARMY_CODE);
    }

    /**
     * 유저의 정보를 update. info는 DTO --> DTO를 Entity형태로 전환하여 save를 수행.
     * 이때 업데이트 키값 역시 DTO에 들어 있어야 한다.
     * 
     * role이 들어올 경우 DB에 role을 따로 저장해 줘야 함.
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
        const where = {}
        where[MyConst.DB_FIELD_MEM_UNIQUE] = profile.userID;
        // transaction START
        // connection을 새로 받음

        // const newQR = await this.dataSource.createQueryRunner();
        // await newQR.connect();
        // await newQR.startTransaction();
        // this.setQueryRunner(newQR);
        // const manager = newQR.manager;
        // try
        // {
        //     await manager.getRepository(MemberRoleEntity).
        //     await manager.getRepository(MemberEntity).update(where, entity);
        //     await newQR.commitTransaction();
        // }
        // catch(e)
        // {
        //     await newQR.rollbackTransaction();
        // }
        // finally
        // {
        //     await newQR.release();
        //     this.returnOriginalQueryRunner();
        // }

        const qr = this.queryRunner;
        await qr.startTransaction();
        try
        {
        }
        catch(e)
        {
            await qr.rollbackTransaction();
        }
        finally
        {
            await qr.release();
        }
        // transaction END
        return 

//        return await this.dataSource.createQueryBuilder().update(MemberEntity)
//            .set( profile ).where("").execute();
    }

    async findOneByArmycode2(id: string): Promise<any>
    {
        const sql: string = 
        `
        SELECT * FROM T_MEMBER where "${MyConst.DB_FIELD_MEM_UNIQUE}"=:id
        `
        return (await this.doRawQuery(sql, {id}, {}))[0];
    }
}