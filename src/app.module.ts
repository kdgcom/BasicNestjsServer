import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { ConstModule } from './const/const.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import _l from './util/logger/log.util';
import { ConfigModule } from '@nestjs/config';

const get_oracle_options = () => 
{
  const oracle_options = 
  {
    type: 'oracle',
    host: process.env.ORACLE_HOST,
    port: process.env.ORACLE_PORT,
    // sid: process.env.SID,
    // serviceName: process.env.ORACLE_SERVICENAME,
    // sid: process.env.ORACLE_SERVICENAME,
    database: process.env.ORACLE_DATABASE,
    username: process.env.ORACLE_USER,
    password: process.env.ORACLE_PW,
    // role: process.env.ORACLE_ROLE,
    entities: [],
    dropSchema: false,
    synchronize: false,
    keepConnectionAlive: true,

  }
  _l.debug("Oracle Options : ", oracle_options );
  return oracle_options;
}

const imports = [
  ConfigModule.forRoot(
    {
      isGlobal: true
    }
  ),
  AuthModule, 
  ConstModule,
  TypeOrmModule.forRootAsync(
    {
      name: 'default',
      type: 'oracle',
      useFactory: async () => {
        return get_oracle_options()
      },
    } as TypeOrmModuleAsyncOptions
  )
];

@Module({
  imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
