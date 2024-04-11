"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqResLoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const log_util_1 = __importDefault(require("../util/logger/log.util"));
const text_util_1 = require("../util/common/text.util");
let ReqResLoggerMiddleware = class ReqResLoggerMiddleware {
    use(req, res, next) {
        const clientIP = require('request-ip').getClientIp(req);
        log_util_1.default.info(`------- REQ START [ ${clientIP} ] --> [ ${req.originalUrl} ] ------- `);
        log_util_1.default.logp(" >>>> Req", {
            headers: JSON.stringify({ ...req.headers }),
            body: req.body,
        });
        getResponseLog(res, req, clientIP);
        if (next) {
            next();
        }
    }
};
exports.ReqResLoggerMiddleware = ReqResLoggerMiddleware;
exports.ReqResLoggerMiddleware = ReqResLoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], ReqResLoggerMiddleware);
const getResponseLog = (res, req, ip) => {
    const rawResponse = res.write;
    const rawResponseEnd = res.end;
    const chunkBuffers = [];
    res.write = (...chunks) => {
        const resArgs = [];
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
    log_util_1.default.info('----------------- RES START -----------------');
    res.end = (...chunk) => {
        const resArgs = [];
        for (let i = 0; i < chunk.length; i++) {
            resArgs[i] = chunk[i];
        }
        if (resArgs[0]) {
            chunkBuffers.push(Buffer.from(resArgs[0]));
        }
        const body = Buffer.concat(chunkBuffers).toString('utf8');
        res.setHeader('origin', 'restjs-req-res-logging-repo');
        let responseLog = null;
        try {
            const bodyObject = JSON.parse(body);
            const data = bodyObject.data;
            delete bodyObject.data;
            responseLog = {
                headers: JSON.stringify(res.getHeaders()),
                result: JSON.stringify(bodyObject),
                data,
            };
            if ((0, text_util_1.isEmpty)(data))
                delete responseLog.data;
        }
        catch (e) {
            responseLog = body;
        }
        log_util_1.default.logp(' <<<< Res: ', responseLog);
        log_util_1.default.info(`------- RES END [ ${ip} ] --> [ ${req.originalUrl} ] ------- `);
        rawResponseEnd.apply(res, resArgs);
        return responseLog;
    };
};
//# sourceMappingURL=reqres_logger.mw.js.map