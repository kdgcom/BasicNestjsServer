import { Injectable } from "@nestjs/common";
import { getStringToArray } from "src/util/common/text.util";
import _l from "src/util/logger/log.util";

export class MyConst 
{
  static LISTEN_PORT = process.env.LISTEN_PORT || 40000;

  static MODE_DEV = 0;
  static MODE_PRODUCTION = 1;
  static checkMode = () =>
  {
    if ( 
      process.env.NODE_ENV=="production" ||
      process.env.NODE_ENV=="prod"
    )
      return MyConst.MODE_PRODUCTION;
    else
      return MyConst.MODE_DEV;
  }

  static isProduction = () => MyConst.checkMode()===MyConst.MODE_PRODUCTION;
  static mode = MyConst.checkMode();

  static DB_MODE_ORACLE = true;

  static PW_SALT_NROUND = 10;
  static JWT_SECRET = "-temp_jwt_secret-.,-";
  static JWT_AT_EXPIREIN = '30s'; // access_token expires in
  static JWT_RT_EXPIREIN = '1m'; // refresh_token expires in
  
  static CORS_ORIGIN = process.env.ENV_CORS_ORIGIN || "";

  // 쿠키는 ,로 구분해 넣을 수 있다.
  static COOKIE_ALLOWED_DOMAIN : string = "localhost:"+MyConst.LISTEN_PORT
  static COOKIE_SECURE : boolean = false;

  static COOKIE_REFRESH_TOKEN = "refreshToken";

  static DB_FIELD_MEM_UNIQUE = "sEMAIL";
  // static DB_FIELD_MEM_UNIQUE = "sARMY_CODE";
  // static DB_FIELD_MEM_UNIQUE = "sEMAIL";
  static DB_FIELD_MEM_ID = "nMEM_ID";

  // process.env를 통해 초기화 하고 싶은 내용이 있다면 반드시 여기 써줘야 함.
  static initialize()
  {
    MyConst.LISTEN_PORT = process.env.LISTEN_PORT || MyConst.LISTEN_PORT;
    MyConst.mode = MyConst.checkMode();
    MyConst.DB_MODE_ORACLE = true;
    MyConst.PW_SALT_NROUND = 10;
    MyConst.JWT_SECRET = process.env.JWT_SECRET || MyConst.JWT_SECRET;
    MyConst.JWT_AT_EXPIREIN = process.env.JWT_AT_EXPIREIN || MyConst.JWT_AT_EXPIREIN;
    MyConst.JWT_RT_EXPIREIN = process.env.JWT_RT_EXPIREIN || MyConst.JWT_RT_EXPIREIN;

    MyConst.CORS_ORIGIN = process.env.ENV_CORS_ORIGIN || "";
    MyConst.COOKIE_ALLOWED_DOMAIN = process.env.ENV_COOKIE_ALLOWED_DOMAIN || MyConst.COOKIE_ALLOWED_DOMAIN;
    MyConst.COOKIE_REFRESH_TOKEN = "refreshToken";
    MyConst.COOKIE_SECURE = MyConst.isProduction();

    MyConst.DB_FIELD_MEM_UNIQUE = process.env.DB_FIELD_MEM_UNIQUE || MyConst.DB_FIELD_MEM_UNIQUE;
    MyConst.DB_FIELD_MEM_ID = "nMEM_ID";

    _l.info("MyConst was initialized. ");

    return MyConst;
  }
}
