import { HttpException } from '@nestjs/common';
export default class BasicException extends HttpException {
    constructor(statusCode?: number, message?: string | object | string[], data?: any, errorAlias?: string);
}
