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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const member_entity_1 = require("../entity/member.entity");
let MemberRepository = class MemberRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.memberRepository = dataSource.getRepository(member_entity_1.MemberEntity);
    }
    async memberList() {
        return await this.memberRepository.find();
    }
    async findOneByArmycode(sARMY_CODE) {
        return await this.memberRepository.find({
            select: {
                sNAME: true,
            },
            where: {
                "sARMY_CODE": sARMY_CODE
            }
        });
    }
    async updateMemberProfile(profile) {
        return await this.memberRepository.update({ "sARMY_CODE": profile.sARMY_CODE }, profile);
    }
};
exports.MemberRepository = MemberRepository;
exports.MemberRepository = MemberRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], MemberRepository);
//# sourceMappingURL=member.repository.js.map