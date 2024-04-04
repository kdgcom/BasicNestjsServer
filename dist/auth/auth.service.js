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
            throw new basicException_1.default();
        return new BasicResponse_1.default(200);
    }
    async updateUser(profile) {
        return new BasicResponse_1.default(200);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [member_repository_1.MemberRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map