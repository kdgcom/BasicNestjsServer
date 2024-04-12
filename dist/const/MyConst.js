"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyConst = void 0;
class MyConst {
}
exports.MyConst = MyConst;
_a = MyConst;
MyConst.LISTEN_PORT = process.env.LISTEN_PORT || 40000;
MyConst.MODE_DEV = 0;
MyConst.MODE_PRODUCTION = 1;
MyConst.DB_MODE_ORACLE = true;
MyConst.PW_SALT_NROUND = 10;
MyConst.JWT_SECRET = process.env.JWT_SECRET || "-temp_jwt_secret-.,-";
MyConst.JWT_AT_EXPIREIN = process.env.JWT_AT_EXPIREIN || '30s';
MyConst.JWT_RT_EXPIREIN = process.env.JWT_RT_EXPIREIN || '1m';
MyConst.COOKIE_ALLOWED_DOMAIN = process.env.COOKIE_ALLOWED_DOMAIN || "localhost:" + _a.LISTEN_PORT;
MyConst.checkMode = () => {
    if (process.env.NODE_ENV == "production" ||
        process.env.NODE_ENV == "prod")
        return _a.MODE_PRODUCTION;
    else
        return _a.MODE_DEV;
};
MyConst.mode = _a.checkMode();
MyConst.COOKIE_REFRESH_TOKEN = "refreshToken";
MyConst.DB_FIELD_MEM_UNIQUE = "sARMY_CODE";
MyConst.DB_FIELD_MEM_ID = "nMEM_ID";
//# sourceMappingURL=MyConst.js.map