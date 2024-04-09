export class MyConst 
{
  static LISTEN_PORT = 40000;

  static MODE_DEV = 0;
  static MODE_PRODUCTION = 1;

  static PW_SALT_NROUND = 10;
  static JWT_SECRET = process.env.JWT_SECRET || "-temp_jwt_secret-.,-";

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
}
