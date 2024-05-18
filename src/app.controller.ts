import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
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
