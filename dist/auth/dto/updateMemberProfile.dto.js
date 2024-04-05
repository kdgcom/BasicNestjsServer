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
exports.UpdateMemberProfileDTO = void 0;
const class_validator_1 = require("class-validator");
const member_entity_1 = require("../../VSTS/entity/member.entity");
const dto_definition_1 = require("../../definition/dto.definition");
const text_util_1 = require("../../util/common/text.util");
class UpdateMemberProfileDTO extends dto_definition_1.default {
    toEntity() {
        const member = new member_entity_1.MemberEntity();
        member.sARMY_CODE = this.armyCode;
        if (this.name)
            member.sNAME = this.name;
        if (this.userID)
            member.sUSER_ID = this.userID;
        if (this.passwd)
            member.sPASSWORD = this.passwd;
        if (this.depID)
            member.nDEP_ID = this.depID;
        if (this.rankCode)
            member.cRANK = this.rankCode;
        if (!(0, text_util_1.isEmpty)(this.isActive))
            member.bACTIVE = this.isActive;
        return member;
    }
}
exports.UpdateMemberProfileDTO = UpdateMemberProfileDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMemberProfileDTO.prototype, "armyCode", void 0);
//# sourceMappingURL=updateMemberProfile.dto.js.map