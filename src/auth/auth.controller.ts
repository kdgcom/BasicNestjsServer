import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import BasicResponse from 'src/util/response/BasicResponse';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  getHello(): string {
    return this.authService.authHello();
  }

  @Get('/user/:armyCode')
  async getUserByArmyCode(@Param('armycode') armycode: string): Promise<BasicResponse>
  {
    return await this.authService.getUser(armycode);
  }
}
