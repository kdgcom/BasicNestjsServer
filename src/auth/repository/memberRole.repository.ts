import { Injectable } from "@nestjs/common";
import { DataSource, Repository, createQueryBuilder } from "typeorm";
import { MemberEntity } from "../entity/member.entity";
import _l from "src/util/logger/log.util";
import { classToClassFromExist } from "class-transformer";
import MasterRepository from "../../repository/master.repository";
import { UpdateMemberProfileDTO } from "src/auth/dto/updateMemberProfile.dto";
import { passwordEncrypt } from "src/util/common/text.util";
import { MyConst } from "src/const/MyConst";
import { MemberRoleEntity } from "../entity/role.entity";

@Injectable()
export class MemberRoleRepository extends MasterRepository<MemberRoleEntity>
{
    // private repository: Repository<MemberRoleEntity>;

    constructor(protected readonly dataSource: DataSource)
    // constructor()
    {
        super(MemberRoleEntity, dataSource);
        // this.repository = this.dataSource.getRepository(MemberRoleEntity)
    }

    async findOneByMemID( id: number )
    {
        const where = {};
        where[MyConst.DB_FIELD_MEM_ID] = id;
        return await this.find({ where })[0];
    }

    // 특정 유저의 member role을 전부 지운다.
    async deleteMemberRole( memID: number ) 
    {
        const where = { };
        where[MyConst.DB_FIELD_MEM_ID] = memID;
        const deleteRes = await this.delete(where);

        return deleteRes;
    }

    // 특정 유저의 member role을 추가한다.
    async insertMemberRole( memID, roleCode )
    {
        const mre = new MemberRoleEntity();
        mre.nMEM_ID = memID;
        mre.cROLE = roleCode;

        if ( MyConst.DB_MODE_ORACLE ) // 오라클일 경우 auto_increment가 안되므로 seq를 이용한 업데이트
        {
            const sql = `
INSERT INTO VSTS.T_MEMBER_ROLE ("nMEM_ROLE_ID", "cROLE", "nMEM_ID")
VALUES(:seq, :roleCode, :memID);
            `;
            const params = {
                nMEM_ROLE_ID: ()=>"T_MEMBER_ROLE_SEQ.NEXTVAL",
                memID,
                roleCode
            }
            return await this.doRawQuery(sql, params, {});
        }
        else
        {
            return await this.insert(mre);
        }
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
        const newQR = await this.dataSource.createQueryRunner();
        await newQR.connect();
        await newQR.startTransaction();
        const manager = newQR.manager;
        try
        {
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

        return 

//        return await this.dataSource.createQueryBuilder().update(MemberEntity)
//            .set( profile ).where("").execute();
    }
}