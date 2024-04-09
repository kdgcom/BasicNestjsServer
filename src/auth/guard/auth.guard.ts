import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { MyConst } from 'src/const/MyConst';
import BasicException from 'src/util/response/basicException';
import { ResponseCode } from 'src/util/response/responseCode';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
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
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        // request의 user에 payload를 심어 이후 사용가능하게 해 줌
        request['user'] = payload;
      } catch {
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