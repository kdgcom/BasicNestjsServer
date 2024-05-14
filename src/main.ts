import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyConst } from './const/MyConst';
import { warn } from 'console';
import _l from './util/logger/log.util';
import 'reflect-metadata';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, OmitType, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import swaggerJSON from './swagger.json';
import * as fs from 'fs';
import { getStringToArray } from './util/common/text.util';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule, 
    {
      // logger: process.env.NODE_ENV === 'production' 
      logger: MyConst.checkMode() // 1==production, 0==dev
      ? ['error', 'warn', 'log']
      : ['error', 'warn', 'log', 'verbose', 'debug']
    }
  );

  // Swagger는 /src에 있는 swagger.json에서 받아와 실행함.
  // npm run swagger로 swagger.json을 빌드한다.
  SwaggerModule.setup('doc', app, <OpenAPIObject>swaggerJSON);

  app.enableCors({
    credentials: true,
    origin: [...MyConst.CORS_ORIGIN.split(',').map(i=>i?.trim()), /localhost:[0-9]{4,5}/],
    exposedHeaders: ["set-cookie", "access_token"],
  })

  // Set validation pipe for DTO
  app.useGlobalPipes(new ValidationPipe(
    {
      disableErrorMessages: false,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        _l.error("** ValidationError : ", JSON.stringify(validationErrors));
        return new BadRequestException(validationErrors);
      },
      
    }));
  
  // 쿠키 사용 설정
  app.use(cookieParser());

  /** Listen **/
  // const port = MyConst.LISTEN_PORT = process.env.LISTEN_PORT || MyConst.LISTEN_PORT;
  const port = MyConst.LISTEN_PORT;
  console.log(">>> before ");
  await app.listen(port, ()=>
  {
    _l.info_(`Envoronment : ${MyConst.checkMode()==1?"Production":"Development"}`);
    _l.info_("Cookie domains : ", MyConst.COOKIE_ALLOWED_DOMAIN);
    _l.info_("Cors origins : ", MyConst.CORS_ORIGIN);
    _l.info_("LISTEN port : ", port);
  });
}
bootstrap();
