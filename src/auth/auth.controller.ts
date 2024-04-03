import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import BasicResponse from 'src/util/response/BasicResponse';
import _l from 'src/util/logger/log.util';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  getHello(): string {
    return this.authService.authHello();
  }

  @Get('/user/:armycode')
  async getUserByArmyCode(@Param() params: any): Promise<BasicResponse>
  {
    _l.log("아미코드 : ", params);
    return await this.authService.getUser(params.armycode);
  }
}
