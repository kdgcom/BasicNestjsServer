"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyConst = void 0;
class MyConst {
}
exports.MyConst = MyConst;
MyConst.LISTEN_PORT = 40000;
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
//# sourceMappingURL=MyConst.js.map