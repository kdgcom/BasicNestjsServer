import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import BasicResponse from 'src/util/response/BasicResponse';
import _l from 'src/util/logger/log.util';
import { UpdateMemberProfileDTO } from './dto/updateMemberProfile.dto';
import { plainToClass } from 'class-transformer';
import { SignInDTO } from './dto/signIn.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  async getHello(): Promise<BasicResponse> {
    return await this.authService.sample(null);
  }

  @Get('/user/:armycode')
  async getUserByArmyCode(@Param() params: any): Promise<BasicResponse>
  {
    return await this.authService.getUser(params.armycode);
  }

  @UseGuards(AuthGuard)
  @Get('/user2/:armycode')
  async getUserByArmyCode2(@Param() params: any): Promise<BasicResponse>
  {
    _l.info("user2 controller");
    return await this.authService.getUser2(params.armycode);
  }

  @Patch('/user')
  async updateUser(@Body() profile: UpdateMemberProfileDTO): Promise<BasicResponse>
  {
    const dto = plainToClass(UpdateMemberProfileDTO, profile);
    return await this.authService.updateUser(dto);
  }
  
  @Post('/signin')
  async signIn(@Body() body: SignInDTO): Promise<BasicResponse>
  {
    _l.info("user2 controller");
    return await this.authService.signIn(body);
  }

}
