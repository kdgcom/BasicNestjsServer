import { Module } from "@nestjs/common";
import { APIService } from "./api/api.service";
import { APIController } from "./api/api.controller";
import { MemberRepository } from "./repository/member.repository";

@Module(
    {
        imports: [],
        controllers: [
            APIController
        ],
        providers: [
            APIService,
            MemberRepository
        ],
    }
)
export class VSTSModule {}