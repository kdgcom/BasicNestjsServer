import { Module } from "@nestjs/common";
import { APIService } from "./api/api.service";
import { APIController } from "./api/api.controller";
import { MemberRepository } from "./repository/member.repository";
import { MemberRoleRepository } from "./repository/memberRole.repository";

@Module(
    {
        imports: [],
        controllers: [
            APIController
        ],
        providers: [
            APIService,
            MemberRepository,
            MemberRoleRepository
        ],
    }
)
export class VSTSModule {}