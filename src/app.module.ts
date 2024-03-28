import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { ConstModule } from './const/const.module';

const imports = [AuthModule, ConstModule];

@Module({
  imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
