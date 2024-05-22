import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleEnum, RoleGuard, Roles } from './auth/guard/role.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('apppp')
  @Render('app')
  apppp() {
    return {};
  }

  @Get('admin')
  @Render('index') // index는 pages/의 파일 이름
  admin() {
    return {};
  }
}
