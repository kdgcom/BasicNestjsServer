import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyConst } from './const/MyConst';
import { warn } from 'console';
import _l from './util/logger/log.util';
import 'reflect-metadata';
import { BadRequestException, Response, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, OmitType, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import swaggerJSON from './swagger.json';
import * as fs from 'fs';
import { getStringToArray } from './util/common/text.util';
import { RenderService } from 'nest-next';
import { ServerResponse } from 'http';
import { ResponseCode } from './lib/definition/response/responseCode';
import BasicResponse from './lib/definition/response/BasicResponse';

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

  // nest-next가 모든 에러를 next의 error 페이지로 보내는 것을 막기위한 error handler 설정
  // nest-next 문서에 따르면, 에러 핸들러가 설정되어 있다면 next의 에러 페이지로 보내지 않는다 함.
  const renderService = app.get(RenderService);
  renderService.setErrorHandler( async(e, req, res) =>{
    _l.error(e);
    // res.sendStatus(ResponseCode.INTERNAL_SERVER_ERROR);
    // res.send(new BasicResponse(e.response).message('Internal Server Error').toJSON());
    res.send(new BasicResponse(e.response).toJSON());
  })

  /** Listen **/
  // const port = MyConst.LISTEN_PORT = process.env.LISTEN_PORT || MyConst.LISTEN_PORT;
  const port = MyConst.LISTEN_PORT;
  await app.listen(port, ()=>
  {
    _l.info_("                      --- === Server info === ---                      ")
    _l.info(`Envoronment : ${MyConst.checkMode()==1?"Production":"Development"}`);
    _l.info("Cookie domains : ", MyConst.COOKIE_ALLOWED_DOMAIN);
    _l.info("Cors origins : ", MyConst.CORS_ORIGIN);
    _l.info("LISTEN port : ", port);
    _l.info_("                                                                       ");
  });
}
bootstrap();
