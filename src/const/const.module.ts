import { Module } from '@nestjs/common';
import { MyConst } from './MyConst';

@Module({
  imports: [],
  controllers: [],
  providers: [MyConst.initialize()],
})
export class ConstModule {}
