"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = exports.ResponseCode = void 0;
var ResponseCode;
(function (ResponseCode) {
    ResponseCode[ResponseCode["OK"] = 200] = "OK";
    ResponseCode[ResponseCode["CREATED"] = 201] = "CREATED";
    ResponseCode[ResponseCode["ACCEPTED"] = 202] = "ACCEPTED";
    ResponseCode[ResponseCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    ResponseCode[ResponseCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseCode[ResponseCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseCode[ResponseCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseCode[ResponseCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseCode[ResponseCode["WRONG_DATA"] = 406] = "WRONG_DATA";
    ResponseCode[ResponseCode["CONFLICT"] = 409] = "CONFLICT";
    ResponseCode[ResponseCode["ENTITIY_TOO_LONG"] = 413] = "ENTITIY_TOO_LONG";
    ResponseCode[ResponseCode["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    ResponseCode[ResponseCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(ResponseCode || (exports.ResponseCode = ResponseCode = {}));
exports.ErrorMessage = {
    "204": "No Content",
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "406": "Wrong Data",
    "409": "Conflict",
    "413": "Entity Too Long",
    "415": "Unsupported Media Type",
    "500": "Internal Server Error",
};
//# sourceMappingURL=responseCode.js.map