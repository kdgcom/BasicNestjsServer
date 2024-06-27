import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { MyConst } from '../../const/MyConst';
// import { MyConst } from 'src/const/MyConst';
import BasicException from '../../lib/definition/response/basicException';
import { ResponseCode } from '../../lib/definition/response/responseCode';
import _l from 'src/util/logger/log.util';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new BasicException(ResponseCode.UNAUTHORIZED);
    }
    try {
      // JWT 토큰에서 payload를 뽑아냄
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: MyConst.JWT_SECRET
        }
      );
      // JWT 토큰에서 payload를 뽑아냄
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // request의 user에 payload를 심어 이후 사용가능하게 해 줌
      request['user'] = payload;
    } 
    catch (e)
    {
      if ( e instanceof TokenExpiredError ) // AT가 expired되었을 때
      {
        _l.debug_("RT 만료됨");
        const rt = request.cookies.refreshToken;
        let rtPayload: any = null;
        try
        {
          rtPayload = await this.jwtService.verifyAsync(rt, {secret: MyConst.JWT_SECRET});
        }
        catch(rtE)
        {
          if ( rtE instanceof TokenExpiredError ) // 쿠키로 온 RT마저 expired되었을 때
            throw new BasicException(ResponseCode.UNAUTHORIZED);
        }
        /// 여기로 오면 RT가 정상인 상황
        /// AT를 재발급하여 전역 변수에 등록한다. 이후 기본 프로토콜 리턴시 전역변수에 값이 있으면 클라에 보내준다.
        _l.log_("valid RT: ", rt, rtPayload);
        MyConst.NEW_ACCESS_TOKEN = await this.authService.refreshATFromRT(rt);
      }
      else
        throw new BasicException(ResponseCode.UNAUTHORIZED);
    }
    return true;
  }

  // Authorization 헤더에 Bearer를 이용할 경우 JWT 접근이 가능하도록 한다.
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}