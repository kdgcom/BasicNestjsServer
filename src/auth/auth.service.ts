import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  authHello(): string {
    return 'Auth Hello!';
  }
}
