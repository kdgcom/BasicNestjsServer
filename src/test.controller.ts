import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { UpdateMemberProfileDTO } from './auth/dto/updateMemberProfile.dto';
import _l from './util/logger/log.util';
import { decryptAES256, decryptCHACHA20, encryptAES256, encryptCHACHA20 } from './util/common/crypt.util';
import { deflate, inflate } from './util/common/compress.util';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('/test')
  test(@Body() updateDTO: UpdateMemberProfileDTO): string {
    return this.testService.test();
  }

  @Get('/encrypt')
  async enc(): Promise<string> 
  {
    const a = "앗싸라비야 뿅뿅 쿠쿠루 삥뽕 ❌❌😂🤞😎🚄🛵金度均";

    const ba = await encryptAES256(a);
    // const za = await inflateSync(ba);
    // const ua = await deflateSync(za);
    const za = await deflate(ba);
    const ua = await inflate(za);
    const ca = await decryptAES256(ba);

    const bc = await encryptCHACHA20(a);
    // const zc = await inflateSync(bc);
    // const uc = await deflateSync(zc);
    const zc = await deflate(bc);
    const uc = await inflate(zc);
    const cc = await decryptCHACHA20(bc);

    _l.log_(a);
    _l.log();

    _l.log_(ba);
    _l.log_(za, za.length);
    _l.log_(ua, ua.length);
    _l.log_(ca);
    _l.log();

    _l.log_(bc);
    _l.log_(zc);
    _l.log_(uc);
    _l.log_(cc);

    return  "end"
  }
}
