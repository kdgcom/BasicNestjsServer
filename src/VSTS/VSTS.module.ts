import { Module } from "@nestjs/common";
import { APIService } from "./api/api.service";
import { APIController } from "./api/api.controller";
import { MemberRepository } from "../auth/repository/member.repository";
import { MemberRoleRepository } from "../auth/repository/memberRole.repository";

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