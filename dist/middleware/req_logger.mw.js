"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqResLoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const log_util_1 = require("../util/logger/log.util");
let ReqResLoggerMiddleware = class ReqResLoggerMiddleware {
    use(req, res, next) {
        log_util_1.default.info('------------START------------');
        log_util_1.default.debug('REQ : ', {
            headers: req.headers,
            body: req.body,
            originalUrl: req.originalUrl,
        });
        if (next) {
            next();
        }
    }
};
exports.ReqResLoggerMiddleware = ReqResLoggerMiddleware;
exports.ReqResLoggerMiddleware = ReqResLoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], ReqResLoggerMiddleware);
//# sourceMappingURL=req_logger.mw.js.map