import { Injectable } from "@nestjs/common";
import { DataSource, Repository, createQueryBuilder } from "typeorm";
import { MemberEntity } from "../entity/member.entity";
import _l from "src/util/logger/log.util";
import { classToClassFromExist } from "class-transformer";
import MasterRepository from "../../repository/master.repository";
import { UpdateMemberProfileDTO } from "src/auth/dto/updateMemberProfile.dto";
import { passwordEncrypt } from "src/util/common/text.util";
import { MyConst } from "src/const/MyConst";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberRoleRepository } from "./memberRole.repository";
import { MemberRoleEntity } from "../entity/role.entity";
import BasicException from "src/util/response/basicException";

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
        // const where: any = {};
        // where[MyConst.DB_FIELD_MEM_ID] = id;
        // const res = this.manager.findOneBy(MemberEntity, where);
        // return res;
        return await this.findOneByWhat(MyConst.DB_FIELD_MEM_ID, id);
    }

    async findOneByID(id: string)
    {
        // const where = {};
        // where[MyConst.DB_FIELD_MEM_UNIQUE] = id;
        // return await this.find({ where })[0];

        return await this.findOneByWhat(MyConst.DB_FIELD_MEM_UNIQUE, id);
    }

    async findOneByWhat(what: string, str: any)
    {
        if ( !this.queryRunner )
            throw new BasicException(500);
        const where: any = {};
        where[what] = str;
        return await this.queryRunner.manager.findOneBy(MemberEntity, where);
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
        const where: any = {}
        where[MyConst.DB_FIELD_MEM_UNIQUE] = profile.userID;

        // transaction START
        // queryRunner를 새로 받음
        const newQR = this.dataSource.createQueryRunner();
        await newQR.connect();
        await newQR.startTransaction();
        const manager = newQR.manager;

        // user의 memID를 확보 (슈퍼유저가 update하는 경우도 있으므로)
        const user = await this.findOneByID(profile.userID);
        if ( !user )
            throw new BasicException(404);

        try
        {
            if ( profile.role && profile.role.length>0 )
            {
                const roles = profile.role.split(';');
                // await manager.getRepository(MemberRoleEntity).delete(where);
                this.memberRoleRepository.deleteAllMemberRole(user.nMEM_ID);
                for(let i=0; i<roles.length; ++i)
                    this.memberRoleRepository.insertMemberRole(user.nMEM_ID, roles[i]);
            }
            await manager.getRepository(MemberEntity).update(where, entity);
            await newQR.commitTransaction();
        }
        catch(e)
        {
            await newQR.rollbackTransaction();
        }
        finally
        {
            await newQR.release();
        }

        // transaction END

        return true;

//        return await this.dataSource.createQueryBuilder().update(MemberEntity)
//            .set( profile ).where("").execute();
    }

    async findOneByArmycode2(id: string): Promise<any>
    {
        const sql: string = 
        `
        SELECT * FROM T_MEMBER where "${MyConst.DB_FIELD_MEM_UNIQUE}"=:id
        `
        const res = await this.doRawQuery(sql, {id}, {});
        if ( res && res.length>0 )
            return res[0];
        else
            return null
    }
}