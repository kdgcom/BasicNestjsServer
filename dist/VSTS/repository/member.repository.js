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
exports.MemberRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const member_entity_1 = require("../entity/member.entity");
const master_repository_1 = __importDefault(require("./master.repository"));
const text_util_1 = require("../../util/common/text.util");
let MemberRepository = class MemberRepository extends master_repository_1.default {
    constructor(dataSource) {
        super(dataSource);
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(member_entity_1.MemberEntity);
    }
    async memberList() {
        return await this.repository.find();
    }
    async findOneByArmycode(sARMY_CODE) {
        return (await this.repository.find({
            where: {
                "sARMY_CODE": sARMY_CODE
            }
        }))[0];
    }
    async updateMemberProfile(profile) {
        if (profile.passwd)
            profile.passwd = (0, text_util_1.passwordEncrypt)(profile.passwd);
        const entity = profile.toEntity();
        return await this.repository.update({ "sARMY_CODE": entity.sARMY_CODE }, entity);
    }
    async findOneByArmycode2(armyCode) {
        const sql = `
        SELECT * FROM T_MEMBER where "sARMY_CODE"=:armyCode
        `;
        return (await this.doRawQuery(sql, { armyCode }, {}))[0];
    }
};
exports.MemberRepository = MemberRepository;
exports.MemberRepository = MemberRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], MemberRepository);
//# sourceMappingURL=member.repository.js.map