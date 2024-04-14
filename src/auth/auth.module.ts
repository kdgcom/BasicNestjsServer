import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MemberRepository } from 'src/auth/repository/member.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MyConst } from 'src/const/MyConst';
import { ConfigModule } from '@nestjs/config';
import { MemberRoleRepository } from 'src/auth/repository/memberRole.repository';

@Module({
  imports: [
    ConfigModule.forRoot( { isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: MyConst.JWT_SECRET,
      signOptions: { expiresIn: MyConst.JWT_AT_EXPIREIN},
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MemberRepository,
    MemberRoleRepository
  ],
})
export class AuthModule {}
