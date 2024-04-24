import { INestiaConfig } from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
// import { FastifyAdaptor } from "@nestjs/platform-fastify";
 
import { MyConst } from "src/const/MyConst";
 
const NESTIA_CONFIG: INestiaConfig = {
//   input: async () => {
//     const app = await NestFactory.create(YourModule);
//     // const app = await NestFactory.create(YourModule, new FastifyAdaptor());
//     // app.setGlobalPrefix("api");
//     // app.enableVersioning({
//     //     type: VersioningType.URI,
//     //     prefix: "v",
//     // })
//     return app;
//   },
  input:[
    "src/**/*controller.ts"
  ],
  swagger: {
    output: "src/swagger.json",
    beautify: true,
    security: {
      bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    servers: [
      // {
      //   url: `http://192.168.0.7:4000`,
      //   description: "Local Server",
      // },
      {
        url: `http://localhost:4000`,
        description: "Local Server",
      },
      {
        url: `http://localhost:${<number>MyConst.LISTEN_PORT+1}`,
        description: "Local Server",
      },
    ],
  },
};
export default NESTIA_CONFIG;