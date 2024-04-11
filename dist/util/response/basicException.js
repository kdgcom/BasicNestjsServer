"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const responseCode_1 = require("./responseCode");
const ERROR = __importStar(require("./Error.json"));
const text_util_1 = require("../common/text.util");
const log_util_1 = __importDefault(require("../logger/log.util"));
class BasicException extends common_1.HttpException {
    constructor(statusCode = responseCode_1.ResponseCode.INTERNAL_SERVER_ERROR, message, data, errorAlias) {
        let response = {
            error: responseCode_1.ErrorMessage[statusCode] || 'Unknown Error',
            statusCode: statusCode,
            message: message || '',
            data: data,
        };
        if (!(0, text_util_1.isEmpty)(errorAlias)) {
            let nsError = ERROR[errorAlias];
            let errorData = {};
            if (!(0, text_util_1.isEmpty)(nsError)) {
                errorData = nsError;
                errorData['errorAlias'] = errorAlias;
            }
            else {
                errorData['errorAlias'] = errorAlias;
                errorData['developerNote'] = 'Unknown Error Alias';
            }
            response.error = errorData;
        }
        super(response, statusCode);
        log_util_1.default.httpException(` ${JSON.stringify(this)}`);
        return this;
    }
}
exports.default = BasicException;
//# sourceMappingURL=basicException.js.map