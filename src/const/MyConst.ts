export class MyConst 
{
  static LISTEN_PORT = process.env.LISTEN_PORT || 40000;

  static MODE_DEV = 0;
  static MODE_PRODUCTION = 1;

  static DB_MODE_ORACLE = true;

  static PW_SALT_NROUND = 10;
  static JWT_SECRET = process.env.JWT_SECRET || "-temp_jwt_secret-.,-";
  static JWT_AT_EXPIREIN = process.env.JWT_AT_EXPIREIN || '30s'; // access_token expires in
  static JWT_RT_EXPIREIN = process.env.JWT_RT_EXPIREIN || '1m'; // refresh_token expires in
  // 쿠키는 ,로 구분해 넣을 수 있다.
  static COOKIE_ALLOWED_DOMAIN = process.env.COOKIE_ALLOWED_DOMAIN || "localhost:"+this.LISTEN_PORT


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

  static mode = MyConst.checkMode();

  static COOKIE_REFRESH_TOKEN = "refreshToken";

  // static DB_FIELD_MEM_UNIQUE = "sARMY_CODE";
  static DB_FIELD_MEM_UNIQUE = "sEMAIL";
  static DB_FIELD_MEM_ID = "nMEM_ID";
}
