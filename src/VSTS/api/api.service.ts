import { Controller, Injectable } from "@nestjs/common";
import BasicResponse from "src/util/response/BasicResponse";
import { MemberRepository } from "../repository/member.repository";

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