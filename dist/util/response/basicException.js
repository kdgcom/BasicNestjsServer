"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const responseCode_1 = require("./responseCode");
const ERROR = require("./Error.json");
const text_util_1 = require("../common/text.util");
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
        return this;
    }
}
exports.default = BasicException;
//# sourceMappingURL=basicException.js.map