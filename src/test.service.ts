import { Injectable } from '@nestjs/common';
import _l from './util/logger/log.util';
import { serialize } from 'class-transformer';

@Injectable()
export class TestService {
  test(): string {
    const a =
    {
      aa: 1,
      bb: "222",
      cc: [1, 2, 3, 4, 5],
      dd: new Date(),
    }
    _l.log( "Serialize A : ", serialize(a) );
    return 'Test finished.';
  }
}
