import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import BasicException from '../../lib/definition/response/basicException';
import { ResponseCode } from '../../lib/definition/response/responseCode';
import { JwtService } from '@nestjs/jwt';
import { MyConst } from '../../const/MyConst';
import _l from '../../util/logger/log.util';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor( private readonly jwtService: JwtService ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> 
  {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new BasicException(ResponseCode.UNAUTHORIZED);
    }
    try {
      // JWT 토큰에서 payload를 뽑아냄
      const payload = await this.jwtService.decode( token );
      _l.info("User Level : ", payload.level);
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