"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VSTSModule = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("./api/api.service");
const api_controller_1 = require("./api/api.controller");
const member_repository_1 = require("./repository/member.repository");
const memberRole_repository_1 = require("./repository/memberRole.repository");
let VSTSModule = class VSTSModule {
};
exports.VSTSModule = VSTSModule;
exports.VSTSModule = VSTSModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            api_controller_1.APIController
        ],
        providers: [
            api_service_1.APIService,
            member_repository_1.MemberRepository,
            memberRole_repository_1.MemberRoleRepository
        ],
    })
], VSTSModule);
//# sourceMappingURL=VSTS.module.js.map