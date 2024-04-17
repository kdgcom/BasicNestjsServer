import BasicException from "src/lib/definition/response/basicException";
import { ResponseCode } from "src/lib/definition/response/responseCode";

export class ExceptionApiNotFound extends BasicException 
{ constructor() { super(ResponseCode.NOT_FOUND); } }
export class ExceptionApiUnauthorized extends BasicException
{ constructor() { super(ResponseCode.UNAUTHORIZED); } }