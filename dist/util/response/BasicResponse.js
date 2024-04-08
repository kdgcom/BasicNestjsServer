"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicRedirection = void 0;
const text_util_1 = require("../../util/common/text.util");
const log_util_1 = require("../logger/log.util");
class BasicResponse {
    constructor(status) {
        this._success = false;
        this._status = 0;
        this._error = null;
        this._message = null;
        this._data = {};
        if (status)
            return this.status(status);
        else
            return this;
    }
    ;
    header(status, error) {
        this._status = status;
        this._error = error;
        this._success = this.setSuccess(status);
        return this;
    }
    status(status) {
        this._status = status;
        this._success = this.setSuccess(status);
        return this;
    }
    getStatus() {
        return this._status;
    }
    message(message) {
        this._message = message;
        return this;
    }
    ;
    data(data, useRegex = true) {
        this._data = data;
        log_util_1.default.log("Return Data : ", this.toJSON());
        return this;
    }
    ;
    error(error) {
        this._error = error;
        return this;
    }
    toJSON() {
        return {
            success: this._success,
            statusCode: this._status,
            message: this._message,
            error: this._error,
            data: this._data,
        };
    }
    setSuccess(status) {
        if (status < 200 || status > 600)
            throw new Error(`Bad status number : ${status}`);
        if (200 <= status && status < 300) {
            return true;
        }
        else if (300 <= status && status < 400) {
            return "redirect";
        }
        return false;
    }
}
exports.default = BasicResponse;
class BasicRedirection {
    constructor(statusCode, url, msg) {
        this.statusCode = statusCode;
        this.url = url;
        if (!(0, text_util_1.isEmpty)(url))
            this.setMsgQuery(msg);
        return this;
    }
    setMsgQuery(msg) {
        this.url += '?msg=';
        this.url += encodeURIComponent(msg);
    }
}
exports.BasicRedirection = BasicRedirection;
//# sourceMappingURL=BasicResponse.js.map