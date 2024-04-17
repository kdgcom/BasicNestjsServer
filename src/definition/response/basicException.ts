/**
 * @file
 * HttpException 관리 클래스
 * filter에 걸려, BasicResponse로 리턴됨
 */

import { HttpException } from '@nestjs/common';
import { ErrorMessage, ResponseCode } from './responseCode';
import * as ERROR from './Error.json';
import { isEmpty } from '../../util/common/text.util';
import _l from '../../util/logger/log.util';

export default class BasicException extends HttpException {
  /**
   * 공통 Exception 클래스
   * 기본적으로 message와 status code를 설정한다.
   * 4번째 인수인 errorAlias를 설정할 경우, 코드 내에 정의된 오류 코드 및 오류 메시지를 error 부분에 추가적으로 전달한다.
   * 
   * @param statusCode   http status code
   * @param message      헤더에 담길 메세지
   * @param data         body에 넘길 데이타
   * @param errorAlias   ERROR를 사용할 경우) 오류 코드 alias
   * @returns
   */
  constructor(statusCode: number = ResponseCode.INTERNAL_SERVER_ERROR, message?: string | object | string[], data?: any, errorAlias?: string) {
    // BasicResponse[statusCode] 도 가능함
    let response = {
      error: ErrorMessage[statusCode] || 'Unknown Error',
      statusCode: statusCode,
      message: message || '',
      data: data,
    };

    // 만약 Error Alias값이 있을 경우, 정의된 값을 error 값에 넣는다.
    if (!isEmpty(errorAlias) && errorAlias) {
      let nsError = ERROR[errorAlias as keyof typeof ERROR];
      let errorData: Record<string|number, any> = {};

      if (!isEmpty(nsError)) {
        errorData = nsError;
        errorData['errorAlias'] = errorAlias;
      } else {
        errorData['errorAlias'] = errorAlias;
        errorData['developerNote'] = 'Unknown Error Alias';
      }
      response.error = errorData;
    }
    super(response, statusCode);
    // _l.warn(`-- Bexc ${JSON.stringify(this)}`)
    _l.httpException(` ${JSON.stringify(this)}`)
    return this;
  }
}
