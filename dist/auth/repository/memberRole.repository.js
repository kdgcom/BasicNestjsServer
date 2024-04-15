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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoleRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const master_repository_1 = __importDefault(require("../../repository/master.repository"));
const MyConst_1 = require("../../const/MyConst");
const role_entity_1 = require("../entity/role.entity");
let MemberRoleRepository = class MemberRoleRepository extends master_repository_1.default {
    constructor(dataSource) {
        super(role_entity_1.MemberRoleEntity, dataSource);
        this.dataSource = dataSource;
    }
    async findOneByMemID(id) {
        const where = {};
        where[MyConst_1.MyConst.DB_FIELD_MEM_ID] = id;
        return await this.manager.findOneBy(role_entity_1.MemberRoleEntity, where);
    }
    async deleteAllMemberRole(memID) {
        const where = {};
        where[MyConst_1.MyConst.DB_FIELD_MEM_ID] = memID;
        const deleteRes = await this.delete(where);
        return deleteRes;
    }
    async insertMemberRole(memID, roleCode) {
        const mre = new role_entity_1.MemberRoleEntity();
        mre.nMEM_ID = memID;
        mre.cROLE = roleCode;
        if (MyConst_1.MyConst.DB_MODE_ORACLE) {
            const sql = `
INSERT INTO VSTS.T_MEMBER_ROLE ("nMEM_ROLE_ID", "cROLE", "nMEM_ID")
VALUES(:seq, :roleCode, :memID);
            `;
            const params = {
                seq: () => "T_MEMBER_ROLE_SEQ.NEXTVAL",
                memID,
                roleCode
            };
            return await this.doRawQuery(sql, params, {});
        }
        else {
            return await this.insert(mre);
        }
    }
};
exports.MemberRoleRepository = MemberRoleRepository;
exports.MemberRoleRepository = MemberRoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], MemberRoleRepository);
//# sourceMappingURL=memberRole.repository.js.map