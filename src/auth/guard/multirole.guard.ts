import { Injectable, CanActivate, ExecutionContext, SetMetadata, mixin } from '@nestjs/common';
import _l from '../../util/logger/log.util';
import { Reflector } from '@nestjs/core';
import { UserRoleRepository } from '../repository/userRole.repository';

/**
 * 본 Multi Role guard는 role 테이블을 추가로 두어 user가 1개 이상의 role에 대해 작동하게끔 한다.
 */
export enum MultiRoleEnum
{
  USER='user',
  ADMIN='admin',
  INSTRUCTOR='instructor',
  SUPERADMIN='superadmin',
}

export const MULTI_ROLES_KEY="multiroles";
export const MultiRoles = (...multiroles: string[])=> SetMetadata(MULTI_ROLES_KEY, multiroles);

export const MultiRoleGuard = (role: MultiRoleEnum) => {
  @Injectable()
  class RoleGuardInner implements CanActivate {
    constructor( 
      public readonly reflector: Reflector,
      public readonly userRoleRepository: UserRoleRepository
    ) {}
    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> 
    {
      const request = context.switchToHttp().getRequest();
      const memID = request.user.memID;
      const roles = this.userRoleRepository.getUserRoles(memID);
      let permission = false;


      // user의 level이 role 보다 같거나 크면 실행 가능
      // return ( level>=role );
      return true;
    }
  }

  const guard = mixin(RoleGuardInner);
  return guard;
}