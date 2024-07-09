import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { ConstModule } from './const/const.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import _l from './util/logger/log.util';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { VSTSModule } from './VSTS/VSTS.module';
import { ReqResLoggerMiddleware } from './lib/definition/middleware/reqres_logger.mw';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { RenderModule } from 'nest-next';
import _Next from 'next';
import { RequestContextMiddleware } from './lib/definition/middleware/request_context.mw';

const get_db_options = () => 
{
  const db_options = 
  {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    serviceName: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    entities: [
      // MemberEntity
      __dirname + "/**/*entity.{js,ts}"
    ],
    dropSchema: false,
    synchronize: false,
    keepConnectionAlive: true,
    logging: true,

  }
  // _l.debug("DB Options : ", db_options );
  return db_options;
}

// const imports = [
//   ConfigModule.forRoot(
//     {
//       isGlobal: true
//     }
//   ),
//   RenderModule.forRootAsync(await Next({})),
//   AuthModule, 
//   ConstModule,
//   VSTSModule,
//   TypeOrmModule.forRootAsync(
//     {
//       name: 'default',
//       type: 'db',
//       useFactory: async () => {
//         return get_db_options()
//       },
//     } as TypeOrmModuleAsyncOptions
//   )
// ];

@Module({
  imports:[
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),
    AuthModule, 
    ConstModule,
    VSTSModule,
    TypeOrmModule.forRootAsync(
      {
        name: 'default',
        type: 'db',
        useFactory: async () => {
          return get_db_options()
        },
      } as TypeOrmModuleAsyncOptions
    ),
    RenderModule.forRootAsync(_Next({}), { viewsDir: null }),
  ],
  controllers: [AppController, TestController],
  providers: [
    AppService, 
    TestService
  ],
  exports:[
  ]
})
export class AppModule implements NestModule
{
  constructor( private dataSource: DataSource ) {}

  // for logger middle ware
  configure(consumer: MiddlewareConsumer) {
    consumer  // 모든 req와 res에 대한 정보 출력
      .apply(ReqResLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer  // 서버 접속 전체에 대한 글로벌 정보 저장용
      .apply(RequestContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

}
