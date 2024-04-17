import { Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import BasicResponse from 'src/definition/response/BasicResponse';
import _l from 'src/util/logger/log.util';
import { UpdateMemberProfileDTO } from './dto/updateMemberProfile.dto';
import { plainToClass } from 'class-transformer';
import { SignInDTO } from './dto/signIn.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request, Response } from 'express';
import { MyConst } from 'src/const/MyConst';

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
  
  /**
   * /auth/signin
   * 유저의 일반적인 로그인. SignInDTO를 통해 ID/PW를 받아 처리
   * @param body 
   * @returns 
   */
  @Post('/signin')
  async signIn(
    @Body() body: SignInDTO, 
    @Res({passthrough: true}) response: Response
  ): Promise<any>
  {
    const { ret, refreshToken } = await this.authService.signIn(body);
    // 쿠키에 refresh_token을 세팅한다.
    response.cookie( MyConst.COOKIE_REFRESH_TOKEN, refreshToken, 
      {
        secure: true,
        sameSite: false,
        httpOnly: true, 
        domain: MyConst.COOKIE_ALLOWED_DOMAIN
      });
    return ret;
  }

  /**
   * /auth/regenerate
   */
  @Post('/regenerate')
  async signInRT(@Req() req: Request): Promise<any>
  {
    const rt = MyConst.COOKIE_REFRESH_TOKEN;

    const {res, refreshToken} = await this.authService.tokenRefresh(rt);
  }

}
