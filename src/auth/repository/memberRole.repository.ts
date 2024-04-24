import { Injectable } from "@nestjs/common";
import { DataSource, FindOptionsUtils, Repository, createQueryBuilder } from "typeorm";
import { MemberEntity } from "../entity/member.entity";
import _l from "src/util/logger/log.util";
import { classToClassFromExist } from "class-transformer";
import MasterRepository from "../../lib/definition/repository/master.repository";
import { UpdateMemberProfileDTO } from "src/auth/dto/updateMemberProfile.dto";
import { passwordEncrypt } from "src/util/common/text.util";
import { MyConst } from "src/const/MyConst";
import { MemberRoleEntity } from "../entity/role.entity";

@Injectable()
export class MemberRoleRepository extends MasterRepository<MemberRoleEntity>
{
    // private repository: Repository<MemberRoleEntity>;

    constructor(dataSource: DataSource)
    // constructor()
    {
        // _l.log(dataSource);
        super(MemberRoleEntity, dataSource.createEntityManager());
        // this.repository = this.dataSource.getRepository(MemberRoleEntity)
    }

    async findOneByMemID( id: number )
    {
        const where: any = {};
        where[MyConst.DB_FIELD_MEM_ID] = id;
        return await this.manager.findOneBy(MemberRoleEntity, where);
    }

    // 특정 유저의 member role을 전부 지운다.
    async deleteAllMemberRole( memID: number ) 
    {
        const where: any = {};
        where[MyConst.DB_FIELD_MEM_ID] = memID;
        const deleteRes = await this.delete(where);
        // const sql = `DETELE FROM T_MEMBER_ROle where "nmem_id"=:memid`;
        // const params = { memid};
        // const deleteres = this.dorawquery(sql, params, {});
        // this.delete(memID);
        return deleteRes;
    }

    // 특정 유저의 member role을 추가한다.
    async insertMemberRole( memID: number, roleCode: string )
    {
        const mre = new MemberRoleEntity();
        mre.nMEM_ID = memID;
        mre.cROLE = roleCode;

        if ( MyConst.DB_MODE_ORACLE ) // 오라클일 경우 auto_increment가 안되므로 seq를 이용한 업데이트
        {
            const sql = `
INSERT INTO VSTS.T_MEMBER_ROLE ("nMEM_ROLE_ID", "cROLE", "nMEM_ID")
VALUES(:seq, :roleCode, :memID)
            `;
            const params = {
                seq: ()=>"T_MEMBER_ROLE_SEQ.NEXTVAL",
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

}