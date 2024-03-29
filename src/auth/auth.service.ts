import { Injectable } from '@nestjs/common';
import BasicResponse from 'src/util/response/BasicResponse';

@Injectable()
export class AuthService {
  authHello(): string {
    return 'Auth Hello!';
  }

  async getUser(): Promise<BasicResponse>
  {
    return new BasicResponse(200);
  }
}
