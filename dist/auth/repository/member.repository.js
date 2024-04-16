"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const member_entity_1 = require("../entity/member.entity");
const log_util_1 = __importDefault(require("../../util/logger/log.util"));
const master_repository_1 = __importDefault(require("../../repository/master.repository"));
const text_util_1 = require("../../util/common/text.util");
const MyConst_1 = require("../../const/MyConst");
const typeorm_2 = require("@nestjs/typeorm");
const memberRole_repository_1 = require("./memberRole.repository");
const role_entity_1 = require("../entity/role.entity");
const basicException_1 = __importDefault(require("../../util/response/basicException"));
const responseCode_1 = require("../../util/response/responseCode");
let MemberRepository = class MemberRepository extends master_repository_1.default {
    constructor(dataSource, memberRoleRepository) {
        super(member_entity_1.MemberEntity, dataSource.createEntityManager());
        this.dataSource = dataSource;
        this.memberRoleRepository = memberRoleRepository;
    }
    async memberList() {
        return await this.find();
    }
    async findOneByMemID(id) {
        return await this.findOneByWhat(MyConst_1.MyConst.DB_FIELD_MEM_ID, id);
    }
    async findOneByID(id) {
        return await this.findOneByWhat(MyConst_1.MyConst.DB_FIELD_MEM_UNIQUE, id);
    }
    async findOneByWhat(what, str) {
        const where = {};
        where[what] = str;
        return await this.manager.findOneBy(member_entity_1.MemberEntity, where);
    }
    async findOneByArmycode(sARMY_CODE) {
        return await this.findOneByID(sARMY_CODE);
    }
    async updateMemberProfile(profile) {
        if (profile.passwd)
            profile.passwd = (0, text_util_1.passwordEncrypt)(profile.passwd);
        const entity = profile.toEntity();
        const user = await this.findOneByID(profile.userID);
        if (!user)
            throw new basicException_1.default(responseCode_1.ResponseCode.NOT_FOUND);
        const where = {};
        where[MyConst_1.MyConst.DB_FIELD_MEM_ID] = user?.nMEM_ID;
        let newQR = this.queryRunner || this.dataSource.createQueryRunner();
        try {
            await newQR.startTransaction();
            const manager = newQR.manager;
            if (profile.role && profile.role.length > 0) {
                const roles = profile.role.split(';');
                await manager.getRepository(role_entity_1.MemberRoleEntity).delete(where);
                for (let i = 0; i < roles.length; ++i)
                    await this.memberRoleRepository.insertMemberRole(user.nMEM_ID, roles[i]);
            }
            await manager.getRepository(member_entity_1.MemberEntity).update(where, entity);
            await newQR.commitTransaction();
        }
        catch (e) {
            log_util_1.default.hl(e);
            await newQR.rollbackTransaction();
            throw new basicException_1.default(responseCode_1.ResponseCode.INTERNAL_SERVER_ERROR, e.message);
        }
        finally {
            await newQR.release();
        }
        return true;
    }
    async findOneByArmycode2(id) {
        const sql = `
        SELECT * FROM T_MEMBER where "${MyConst_1.MyConst.DB_FIELD_MEM_UNIQUE}"=:id
        `;
        const res = await this.doRawQuery(sql, { id }, {});
        if (res && res.length > 0)
            return res[0];
        else
            return null;
    }
};
exports.MemberRepository = MemberRepository;
exports.MemberRepository = MemberRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(memberRole_repository_1.MemberRoleRepository)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        memberRole_repository_1.MemberRoleRepository])
], MemberRepository);
//# sourceMappingURL=member.repository.js.map