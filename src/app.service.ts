import { Injectable } from '@nestjs/common';
import BasicResponse from './lib/definition/response/BasicResponse';
import { ResponseCode } from './lib/definition/response/responseCode';

@Injectable()
export class AppService {
  getHello(): BasicResponse {
    return new BasicResponse(ResponseCode.OK).message("Hello!");
  }
}
