export default class _l {
    static _time: number;
    constructor();
    static setLevel(str: any): void;
    static getDiffTime(): string;
    static prefix(): string;
    static log(...args: any[]): void;
    static logp(...args: any[]): void;
    static log_detail(...args: any[]): void;
    static debug(...args: any[]): void;
    static debug_prefix(...args: any[]): void;
    static info(...args: any[]): void;
    static warn(...args: any[]): void;
    static error(...args: any[]): void;
    static success(...args: any[]): void;
    static httpException(...args: any[]): void;
    static _common(_func: any, flagUsePrefix: any, flagPrintDetail: any, ...args: any[]): void;
}
