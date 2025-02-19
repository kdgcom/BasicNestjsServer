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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const log_util_1 = __importDefault(require("../util/logger/log.util"));
const updateMemberProfile_dto_1 = require("./dto/updateMemberProfile.dto");
const class_transformer_1 = require("class-transformer");
const signIn_dto_1 = require("./dto/signIn.dto");
const auth_guard_1 = require("./guard/auth.guard");
const MyConst_1 = require("../const/MyConst");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async getHello() {
        return await this.authService.sample(null);
    }
    async getUserByArmyCode(params) {
        return await this.authService.getUser(params.armycode);
    }
    async getUserByArmyCode2(params) {
        log_util_1.default.info("user2 controller");
        return await this.authService.getUser2(params.armycode);
    }
    async updateUser(profile) {
        const dto = (0, class_transformer_1.plainToClass)(updateMemberProfile_dto_1.UpdateMemberProfileDTO, profile);
        return await this.authService.updateUser(dto);
    }
    async signIn(body, response) {
        const { ret, refreshToken } = await this.authService.signIn(body);
        response.cookie(MyConst_1.MyConst.COOKIE_REFRESH_TOKEN, refreshToken, {
            secure: true,
            sameSite: false,
            httpOnly: true,
            domain: MyConst_1.MyConst.COOKIE_ALLOWED_DOMAIN
        });
        return ret;
    }
    async signInRT(req) {
        const rt = MyConst_1.MyConst.COOKIE_REFRESH_TOKEN;
        const { res, refreshToken } = await this.authService.tokenRefresh(rt);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/user/:armycode'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserByArmyCode", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/user2/:armycode'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserByArmyCode2", null);
__decorate([
    (0, common_1.Patch)('/user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateMemberProfile_dto_1.UpdateMemberProfileDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_dto_1.SignInDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/regenerate'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInRT", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map