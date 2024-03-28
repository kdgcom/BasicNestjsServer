import { Module } from '@nestjs/common';
import { MyConst } from './MyConst';

@Module({
  imports: [MyConst],
  controllers: [],
  providers: [],
})
export class ConstModule {}
