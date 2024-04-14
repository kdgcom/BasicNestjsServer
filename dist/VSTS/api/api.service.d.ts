import BasicResponse from "src/util/response/BasicResponse";
import { MemberRepository } from "../../auth/repository/member.repository";
export declare class APIService {
    private readonly memberRepository;
    constructor(memberRepository: MemberRepository);
    getMembers(): Promise<BasicResponse>;
}
