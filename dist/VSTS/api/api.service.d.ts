import BasicResponse from "src/util/response/BasicResponse";
import { MemberRepository } from "../repository/member.repository";
export declare class APIService {
    private readonly memberRepository;
    constructor(memberRepository: MemberRepository);
    getMembers(): Promise<BasicResponse>;
}
