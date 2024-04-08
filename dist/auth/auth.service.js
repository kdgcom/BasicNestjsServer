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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const member_repository_1 = require("../VSTS/repository/member.repository");
const text_util_1 = require("../util/common/text.util");
const BasicResponse_1 = require("../util/response/BasicResponse");
const basicException_1 = require("../util/response/basicException");
const member_entity_1 = require("../VSTS/entity/member.entity");
const responseCode_1 = require("../util/response/responseCode");
const log_util_1 = require("../util/logger/log.util");
const class_transformer_1 = require("class-transformer");
let AuthService = class AuthService {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async sample(profile) {
        return new BasicResponse_1.default(200);
    }
    async getUser(armycode) {
        const mem = await this.memberRepository.findOneByArmycode(armycode);
        if ((0, text_util_1.isEmpty)(mem))
            throw new basicException_1.default(responseCode_1.ResponseCode.INTERNAL_SERVER_ERROR);
        return new BasicResponse_1.default(responseCode_1.ResponseCode.OK).data(mem);
    }
    async getUser2(armycode) {
        const memPlain = await this.memberRepository.findOneByArmycode2(armycode);
        if ((0, text_util_1.isEmpty)(memPlain))
            throw new basicException_1.default(responseCode_1.ResponseCode.NOT_FOUND);
        const mem = (0, class_transformer_1.plainToClass)(member_entity_1.MemberEntity, memPlain);
        log_util_1.default.log(mem);
        return new BasicResponse_1.default(responseCode_1.ResponseCode.OK).data(mem.toPlain());
    }
    async updateUser(profile) {
        const res = await this.memberRepository.updateMemberProfile(profile);
        log_util_1.default.success_detail("res : ", res);
        return new BasicResponse_1.default(responseCode_1.ResponseCode.ACCEPTED);
    }
    async signIn(sidto) {
        let me = null;
        if (!(me = await this.memberRepository.findOneByArmycode(sidto.userID)))
            throw new basicException_1.default(responseCode_1.ResponseCode.NOT_FOUND);
        const member = me.toPlain();
        if (!(0, text_util_1.passwordCompare)(sidto.passwd, member.password))
            throw new basicException_1.default(responseCode_1.ResponseCode.UNAUTHORIZED);
        return new BasicResponse_1.default(responseCode_1.ResponseCode.OK);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [member_repository_1.MemberRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map