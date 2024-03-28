import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyConst } from './const/MyConst';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule, 
    {
      logger: process.env.NODE_ENV === 'production' 
      ? ['error', 'warn', 'log']
      : ['error', 'warn', 'log', 'verbose', 'debug']
    }
  );

  /** Listen **/
  const port = process.env.LISTEN_PORT || MyConst.LISTEN_PORT;
  await app.listen(port, ()=>
  {
    console.log("LISTEN port : ", port);
  });
}
bootstrap();
