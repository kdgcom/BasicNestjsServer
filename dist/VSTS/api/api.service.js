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
exports.APIService = void 0;
const common_1 = require("@nestjs/common");
const BasicResponse_1 = __importDefault(require("../../util/response/BasicResponse"));
const member_repository_1 = require("../../auth/repository/member.repository");
let APIService = class APIService {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async getMembers() {
        const members = await this.memberRepository.memberList();
        return new BasicResponse_1.default(200).data(members);
    }
};
exports.APIService = APIService;
exports.APIService = APIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [member_repository_1.MemberRepository])
], APIService);
//# sourceMappingURL=api.service.js.map