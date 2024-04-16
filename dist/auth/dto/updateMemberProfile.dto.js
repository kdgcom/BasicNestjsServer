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
exports.UpdateMemberProfileDTO = void 0;
const class_validator_1 = require("class-validator");
const member_entity_1 = require("../entity/member.entity");
const MyConst_1 = require("../../const/MyConst");
const dto_definition_1 = __importDefault(require("../../definition/dto.definition"));
const text_util_1 = require("../../util/common/text.util");
class UpdateMemberProfileDTO extends dto_definition_1.default {
    toEntity() {
        const member = new member_entity_1.MemberEntity();
        member[MyConst_1.MyConst.DB_FIELD_MEM_UNIQUE] = this.userID;
        if (this.name)
            member.sNAME = this.name;
        if (this.passwd)
            member.sPASSWORD = this.passwd;
        if (this.depID)
            member.nDEP_ID = this.depID;
        if (this.rankCode)
            member.cRANK = this.rankCode;
        if (this.level)
            member.nLEVEL = this.level;
        if (!(0, text_util_1.isEmpty)(this.isActive))
            member.bACTIVE = this.isActive;
        if (!(0, text_util_1.isEmpty)(this.accessToken))
            member.sACCESS_TOKEN = this.accessToken;
        if (!(0, text_util_1.isEmpty)(this.refreshToken))
            member.sREFRESH_TOKEN = this.refreshToken;
        return member;
    }
}
exports.UpdateMemberProfileDTO = UpdateMemberProfileDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMemberProfileDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberProfileDTO.prototype, "userID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], UpdateMemberProfileDTO.prototype, "passwd", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMemberProfileDTO.prototype, "depID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMemberProfileDTO.prototype, "rankCode", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMemberProfileDTO.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMemberProfileDTO.prototype, "accessToken", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMemberProfileDTO.prototype, "refreshToken", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMemberProfileDTO.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMemberProfileDTO.prototype, "role", void 0);
//# sourceMappingURL=updateMemberProfile.dto.js.map