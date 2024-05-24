import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { UpdateMemberProfileDTO } from './auth/dto/updateMemberProfile.dto';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('/test')
  test(@Body() updateDTO: UpdateMemberProfileDTO): string {
    return this.testService.test();
  }
}
