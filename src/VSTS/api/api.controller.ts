import { Controller, Get, UseGuards } from "@nestjs/common";
import { APIService } from "./api.service";
import { AuthGuard } from "../../auth/guard/auth.guard";
import { RolesGuard } from "src/auth/guard/role.guard";

@Controller('/api')
export class APIController
{
    constructor(private readonly apiService: APIService ) { }

    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Get('/members')
    getMembers()
    {
        return this.apiService.getMembers();
    }
}