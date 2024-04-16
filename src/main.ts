import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyConst } from './const/MyConst';
import { warn } from 'console';
import _l from './util/logger/log.util';
import 'reflect-metadata';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule, 
    {
      logger: process.env.NODE_ENV === 'production' 
      ? ['error', 'warn', 'log']
      : ['error', 'warn', 'log', 'verbose', 'debug']
    }
  );


  // Set validation pipe for DTO
  app.useGlobalPipes(new ValidationPipe(
    {
      disableErrorMessages: false,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        _l.error("** ValidationError : ", JSON.stringify(validationErrors));
        return new BadRequestException(validationErrors);
      },
      
    }));
  
  // 쿠기 사용 설정
  app.use(cookieParser());

  /** Listen **/
  // const port = MyConst.LISTEN_PORT = process.env.LISTEN_PORT || MyConst.LISTEN_PORT;
  const port = MyConst.LISTEN_PORT;
  await app.listen(port, ()=>
  {
    _l.info("LISTEN port : ", port);
  });
}
bootstrap();
