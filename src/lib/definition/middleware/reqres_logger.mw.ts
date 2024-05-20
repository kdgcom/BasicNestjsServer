/**
 * @Author DG Kim
 */
import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RouteInfo } from '@nestjs/common/interfaces';
import { request } from 'http';
import _l from 'src/util/logger/log.util';
import { isEmpty, isURLMediaFile } from 'src/util/common/text.util';

/**
 * ReqResLoggerMiddleware
 * 
 * 참고 사이트 : https://yflooi.medium.com/nestjs-request-and-response-logging-with-middleware-b486121e4907
 * 
 * http 접속이 들어올 때의 req와 
 * 완료하고 마지막 응답을 보낼 때의 res를 
 * 자동으로 처리하는 middleware
 */
@Injectable()
export class ReqResLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const clientIP = require('request-ip').getClientIp(req);
    const headers = req.headers;
    // Gets the request log
    _l.info(`------- REQ START [ ${clientIP } ] --> ${req.method} [ ${req.get('host')}${req.originalUrl} ] ------- `);
    delete headers.host; delete headers["user-agent"];

    /** 특수 케이스들은 response를 찍을 필요가 없음 **/
    if(req.originalUrl == '/health') { // health check
      // health check만 짧게 찍기
      _l.log(`*** Health check Request ***`);
    } else if (isURLMediaFile(req.originalUrl)) { // favicon
      _l.log(`Request media ${req.originalUrl}`)
    } else if(req.originalUrl.includes('_next')) { // next 번들 파일들
      _l.log(`next js 관련 요청 ${req.originalUrl}`)
    } else { // 일반 nestjs 응답의 경우
      _l.logp(" >>>> Req", {
        referer: req.get('referer'),
        userAgent: req.headers['user-agent'],
        // headers: JSON.stringify({...req.headers}),
        headers,
        body: req.body,
      });

      // response를 처리할 수 있는 이벤트를 등록시켜
      // 답변을 발송하고 나면 자동으로 res의 내용이 찍히도록 한다.
      getResponseLog(res, req, clientIP);

    }
    // Ends middleware function execution, hence allowing to move on 
    if (next) {
      next();
    }
  }
}

/**
 * response는 writer를 통해 결과를 쓰므로 이벤트 등록을 통해 처리 해야 한다.
 * getResponseLog 함수를 만들어 두고 middleware에서 호출해 이벤트가 등록되도록 처리 하는 방식
 * 
 * @param res 
 */
const getResponseLog = (res: Response, req:Request, ip: string) => {
  const rawResponse = res.write;
  const rawResponseEnd = res.end;
  const chunkBuffers: any[] = [];
  res.write = (...chunks) => {
    const resArgs: any = [];
    for (let i = 0; i < chunks.length; i++) {
      resArgs[i] = chunks[i];
      if (!resArgs[i]) {
        res.once('drain', res.write);
        i--;
      }
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    return rawResponse.apply(res, resArgs);
  };
  // _l.info('----------------- RES START -----------------');
  res.end = (...chunk: any[]) => {
    const resArgs:any = [];
    for (let i = 0; i < chunk.length; i++) {
      resArgs[i] = chunk[i];
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    const body = Buffer.concat(chunkBuffers).toString('utf8');
    res.setHeader('origin', 'restjs-req-res-logging-repo');
    let responseLog = null;
    try
    {
      const bodyObject = JSON.parse(body);
      const data = bodyObject.data;
      delete bodyObject.data;
      responseLog = {
        // Returns a shallow copy of the current outgoing headers
        headers: JSON.stringify(res.getHeaders()),
        // statusCode: res.statusCode,
        result: JSON.stringify(bodyObject),
        data,
      };
      if ( isEmpty(data) ) delete responseLog.data;
    }
    catch(e)
    {
      responseLog = body;
    }

    _l.logp(' <<<< Res: ', responseLog);
    _l.info(`------- RES END [ ${ip } ] --> [ ${req.originalUrl} ] ------- `);
    rawResponseEnd.apply(res, resArgs);
    return responseLog as unknown as Response;
  };
};