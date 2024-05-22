import { Injectable, CanActivate, ExecutionContext, SetMetadata, mixin } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import BasicException from '../../lib/definition/response/basicException';
import { ResponseCode } from '../../lib/definition/response/responseCode';
import { JwtService } from '@nestjs/jwt';
import { MyConst } from '../../const/MyConst';
import _l from '../../util/logger/log.util';
import { Reflector } from '@nestjs/core';

/**
 * 본 Role guard는 user의 level에 따라 role을 부여하는 방식으로 작동한다.
 */
export enum RoleEnum
{
  USER=1,
  ADMIN=100,
  SUPERADMIN=10000
}

export const ROLES_KEY="roles";
export const Roles = (...roles: string[])=> SetMetadata(ROLES_KEY, roles);

export const RoleGuard = (role: RoleEnum) => {
  @Injectable()
  class RoleGuardInner implements CanActivate {
    constructor( public readonly reflector: Reflector ) {}
    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> 
    {
      const request = context.switchToHttp().getRequest();
      const level = request.user.level;
      // user의 level이 role 보다 같거나 크면 실행 가능
      return ( level>=role );
    }
  }

  const guard = mixin(RoleGuardInner);
  return guard;
}