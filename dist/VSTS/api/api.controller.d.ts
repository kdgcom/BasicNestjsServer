import { APIService } from "./api.service";
export declare class APIController {
    private readonly apiService;
    constructor(apiService: APIService);
    getMembers(): Promise<import("../../util/response/BasicResponse").default>;
}
