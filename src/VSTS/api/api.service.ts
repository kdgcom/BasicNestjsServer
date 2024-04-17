import { Controller, Injectable } from "@nestjs/common";
import BasicResponse from "src/definition/response/BasicResponse";
import { MemberRepository } from "../../auth/repository/member.repository";

@Injectable()
export class APIService
{
    constructor(private readonly memberRepository: MemberRepository) {}

    async getMembers(): Promise<BasicResponse>
    {
        const members = await this.memberRepository.memberList();
        return new BasicResponse(200).data(members);
    }
}