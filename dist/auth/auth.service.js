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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const member_repository_1 = require("../VSTS/repository/member.repository");
const text_util_1 = require("../util/common/text.util");
const BasicResponse_1 = __importDefault(require("../util/response/BasicResponse"));
const basicException_1 = __importDefault(require("../util/response/basicException"));
const updateMemberProfile_dto_1 = require("./dto/updateMemberProfile.dto");
const member_entity_1 = require("../VSTS/entity/member.entity");
const responseCode_1 = require("../util/response/responseCode");
const log_util_1 = __importDefault(require("../util/logger/log.util"));
const class_transformer_1 = require("class-transformer");
const jwt_1 = require("@nestjs/jwt");
const payload_jwt_1 = require("./guard/payload.jwt");
const MyConst_1 = require("../const/MyConst");
let AuthService = class AuthService {
    constructor(memberRepository, jwtService) {
        this.memberRepository = memberRepository;
        this.jwtService = jwtService;
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
        const user = me.toPlain();
        if (!(0, text_util_1.passwordCompare)(sidto.passwd, user.password))
            throw new basicException_1.default(responseCode_1.ResponseCode.UNAUTHORIZED);
        const payload = new payload_jwt_1.JWTPayload(user.armyCode, user.name, user.rank, user.memID, user.level);
        const data = {
            accessToken: await payload.toJWTAT(),
            refreshToken: await payload.toJWTRT(),
        };
        const member = new updateMemberProfile_dto_1.UpdateMemberProfileDTO();
        member.userID = sidto.userID;
        member.accessToken = data.accessToken;
        member.refreshToken = data.refreshToken;
        this.memberRepository.updateMemberProfile(member);
        return { ret: new BasicResponse_1.default(responseCode_1.ResponseCode.OK).data(data), refreshToken: data.refreshToken };
    }
    async tokenRefresh(rt) {
        let refreshToken = "";
        try {
            const payload = await this.jwtService.verifyAsync(rt, {
                secret: MyConst_1.MyConst.JWT_SECRET
            });
            this.memberRepository.findOneByMemID(payload.memID);
        }
        catch {
            throw new basicException_1.default(responseCode_1.ResponseCode.UNAUTHORIZED);
        }
        return { res: new BasicResponse_1.default(responseCode_1.ResponseCode.OK), refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [member_repository_1.MemberRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map