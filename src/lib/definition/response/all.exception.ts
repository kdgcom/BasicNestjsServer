import BasicException from "src/lib/definition/response/basicException";
import { ResponseCode } from "src/lib/definition/response/responseCode";

export class ExceptionApiNotFound extends BasicException 
{ constructor() { super(ResponseCode.NOT_FOUND); } }
export class ExceptionApiUnauthorized extends BasicException
{ constructor() { super(ResponseCode.UNAUTHORIZED); } }
export class ExceptionApiBadRequest extends BasicException
{ constructor() { super(ResponseCode.BAD_REQUEST); } }
export class ExceptionApiConflict extends BasicException
{ constructor() { super(ResponseCode.CONFLICT); } }
export class ExceptionApiForbidden extends BasicException
{ constructor() { super(ResponseCode.FORBIDDEN); } }
export class ExceptionApiNoContent extends BasicException
{ constructor() { super(ResponseCode.NO_CONTENT); } }
export class ExceptionApiUnsupportedMediaType extends BasicException
{ constructor() { super(ResponseCode.UNSUPPORTED_MEDIA_TYPE); } }
export class ExceptionApiWrongData extends BasicException
{ constructor() { super(ResponseCode.WRONG_DATA); } }