import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MemberRepository } from 'src/VSTS/repository/member.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MyConst } from 'src/const/MyConst';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: MyConst.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIREIN},
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MemberRepository
  ],
})
export class AuthModule {}
