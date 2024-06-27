/**
 * @file
 * 규칙대로 Reponse를 리턴하기 위한 클래스
 */

import { stat } from "fs";
import { isEmpty } from "../../../util/common/text.util";
import _l from "../../../util/logger/log.util";
import { MyConst } from "src/const/MyConst";

export default class BasicResponse {

  private _success: boolean | string = false;
  private _status: number = 0;
  private _error: any = null;
  private _message: string | null = null;
  private _data: any = {};

  constructor(status?: number) {
    if ( status )
        return this.status(status);
    else
        return this;
  };

  /**
   * 
   * @param status 
   * @param error 
   * @returns 
   */
  header(status: number, error ? : any) {
    this._status = status;
    this._error = error;
    this._success = this.setSuccess(status)
    return this;
  }

  /**
   * 
   * @param status 
   * @returns 
   */
  status(status: number) {
    this._status = status;
    this._success = this.setSuccess(status)
    return this;
  }

  getStatus() {
    return this._status
  }

  message(message: string) {
    this._message = message;
    return this;
  };

  data(data ? : any, useRegex = true) {
    this._data = data;

    _l.log("Return Data : ", this.toJSON())
    // _d.log('Bres', {
    //   success: this._success,
    //   status: this._status,
    //   message: this._message,
    //   error: this._error,
    //   // body: this._data
    // })

    return this;
  };

  error(error ? : any) {
    this._error = error;
    return this;
  }

  /**
   * toJSON함수를 만들어 두면 Controller에서 return될 때 알아서 return string을 만든다
   * @returns 
   */
  toJSON(): Object {
    // 유효성 검사 해야함

    const _retObj: any = 
    {
      success: this._success,
      statusCode: this._status,
      message: this._message,
      error: this._error,
      data: this._data,
    }
    if ( MyConst.NEW_ACCESS_TOKEN.length>0 )
      _retObj["accessToken"] = MyConst.NEW_ACCESS_TOKEN;

    return _retObj;
  }

  private setSuccess(status: number): boolean | string {
    // 일반적인 경우 status code는 200보다 작거나 599보다 클 수 없다.
    if ( status<200 || status>600 )
        throw new Error(`Bad status number : ${status}`);
    if (200 <= status && status < 300) {
      return true;
    } else if (300 <= status && status < 400) {
      return "redirect";
    }
    return false
  }
}


export class BasicRedirection {
  private url: string;
  private statusCode: number;

  constructor(statusCode: number, url: string, msg?: string) {
    this.statusCode = statusCode;
    this.url = url;
    if (!isEmpty(url)) this.setMsgQuery(msg || "");
    return this;
  }

  private setMsgQuery(msg: string) {
    this.url += '?msg=';
    this.url += encodeURIComponent(msg);
  }
}
