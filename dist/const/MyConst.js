"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyConst = void 0;
const log_util_1 = __importDefault(require("../util/logger/log.util"));
class MyConst {
    static initialize() {
        MyConst.LISTEN_PORT = process.env.LISTEN_PORT || MyConst.LISTEN_PORT;
        MyConst.mode = MyConst.checkMode();
        MyConst.DB_MODE_ORACLE = true;
        MyConst.PW_SALT_NROUND = 10;
        MyConst.JWT_SECRET = process.env.JWT_SECRET || MyConst.JWT_SECRET;
        MyConst.JWT_AT_EXPIREIN = process.env.JWT_AT_EXPIREIN || MyConst.JWT_AT_EXPIREIN;
        MyConst.JWT_RT_EXPIREIN = process.env.JWT_RT_EXPIREIN || MyConst.JWT_RT_EXPIREIN;
        MyConst.COOKIE_ALLOWED_DOMAIN = process.env.COOKIE_ALLOWED_DOMAIN || MyConst.COOKIE_ALLOWED_DOMAIN;
        MyConst.COOKIE_REFRESH_TOKEN = "refreshToken";
        MyConst.DB_FIELD_MEM_UNIQUE = process.env.DB_FIELD_MEM_UNIQUE || MyConst.DB_FIELD_MEM_UNIQUE;
        MyConst.DB_FIELD_MEM_ID = "nMEM_ID";
        log_util_1.default.info("MyConst was initialized. ");
        return MyConst;
    }
}
exports.MyConst = MyConst;
MyConst.LISTEN_PORT = process.env.LISTEN_PORT || 40000;
MyConst.MODE_DEV = 0;
MyConst.MODE_PRODUCTION = 1;
MyConst.checkMode = () => {
    if (process.env.NODE_ENV == "production" ||
        process.env.NODE_ENV == "prod")
        return MyConst.MODE_PRODUCTION;
    else
        return MyConst.MODE_DEV;
};
MyConst.mode = MyConst.checkMode();
MyConst.DB_MODE_ORACLE = true;
MyConst.PW_SALT_NROUND = 10;
MyConst.JWT_SECRET = "-temp_jwt_secret-.,-";
MyConst.JWT_AT_EXPIREIN = '30s';
MyConst.JWT_RT_EXPIREIN = '1m';
MyConst.COOKIE_ALLOWED_DOMAIN = "localhost:" + MyConst.LISTEN_PORT;
MyConst.COOKIE_REFRESH_TOKEN = "refreshToken";
MyConst.DB_FIELD_MEM_UNIQUE = "sEMAIL";
MyConst.DB_FIELD_MEM_ID = "nMEM_ID";
//# sourceMappingURL=MyConst.js.map