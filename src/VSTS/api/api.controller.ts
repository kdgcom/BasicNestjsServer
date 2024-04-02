import { Controller, Get } from "@nestjs/common";
import { APIService } from "./api.service";

@Controller('/api')
export class APIController
{
    constructor(private readonly apiService: APIService ) { }

    @Get('/members')
    getMembers()
    {
        return this.apiService.getMembers();
    }
}