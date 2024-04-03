export default class BasicResponse {
    private _success;
    private _status;
    private _error;
    private _message;
    private _data;
    constructor(status?: number);
    header(status: number, error?: any): this;
    status(status: number): this;
    getStatus(): number;
    message(message: string): this;
    data(data?: any, useRegex?: boolean): this;
    error(error?: any): this;
    toJSON(): Object;
    private setSuccess;
}
export declare class BasicRedirection {
    private url;
    private statusCode;
    constructor(statusCode: number, url: string, msg?: string);
    private setMsgQuery;
}
