import { Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import BasicResponse from 'src/lib/definition/response/BasicResponse';
import _l from 'src/util/logger/log.util';
import { UpdateMemberProfileDTO } from './dto/updateMemberProfile.dto';
import { plainToClass } from 'class-transformer';
import { SignInDTO, SignInResDTO } from './dto/signIn.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request, Response } from 'express';
import { MyConst } from 'src/const/MyConst';
import { TypedBody, TypedException, TypedRoute } from '@nestia/core';
import { ResponseCode } from 'src/lib/definition/response/responseCode';
import { ExceptionApiNotFound, ExceptionApiUnauthorized } from 'src/lib/definition/response/all.exception';
import { ApiExtraModels, ApiOkResponse, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiCommonAcceptedResponse, ApiCommonResponse } from 'src/lib/definition/swagger/common.api.response';
import { JWTPayload } from './guard/payload.jwt';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  async getHello(): Promise<BasicResponse> {
    return await this.authService.sample(null);
  }

  @Get('/user/:armycode')
  async getUserByArmyCode(@Param("armycode") params: string): Promise<BasicResponse>
  {
    return await this.authService.getUser(params);
  }

  @UseGuards(AuthGuard)
  @Get('/user2/:armycode')
  async getUserByArmyCode2(@Param("armycode") params: string): Promise<BasicResponse>
  {
    _l.info("user2 controller");
    return await this.authService.getUser2(params);
  }

  @ApiResponse({
    status: ResponseCode.ACCEPTED
  })
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
  // @TypedException<ExceptionApiNotFound>(ResponseCode.NOT_FOUND)
  // @TypedException<ExceptionApiUnauthorized>(ResponseCode.UNAUTHORIZED)
  // @ApiExtraModels(SignInResDTO)
  // @ApiResponse({
  //   status: ResponseCode.OK,
  //   type: SignInResDTO
  // })
  // @ApiCommonResponse({ $ref: getSchemaPath(SignInResDTO) }, ResponseCode.OK) 
  async signIn(
    @TypedBody() body: SignInDTO, 
    @Res({passthrough: true}) response: Response
  ): Promise<BasicResponse>
  {
    const { ret, refreshToken } = await this.authService.signIn(body);
    response.set(
      {
       'access_token': ret.data.accessToken,
       'Access-Control-Allow-Method': 'POST'
      });
    const tempRT = await JWTPayload.fromJWT(refreshToken);
    // 쿠키에 refresh_token을 세팅한다.
    response.cookie( MyConst.COOKIE_REFRESH_TOKEN, refreshToken, 
      {
        secure: true,
        sameSite: false,
        httpOnly: true, 
        domain: MyConst.COOKIE_ALLOWED_DOMAIN,
        maxAge: (tempRT.exp - tempRT.iat)*1000,
      });
    return <BasicResponse>ret;
  }

  /**
   * /auth/regenerate
   */
  @ApiResponse({
    status: ResponseCode.ACCEPTED
  })
  @Post('/regenerate')
  async signInRT(@Req() req: Request): Promise<any>
  {
    const rt = MyConst.COOKIE_REFRESH_TOKEN;

    const {res, refreshToken} = await this.authService.tokenRefresh(rt);
  }

}
