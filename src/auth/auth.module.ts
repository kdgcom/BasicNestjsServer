import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MemberRepository } from 'src/VSTS/repository/member.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    MemberRepository
  ],
})
export class AuthModule {}
