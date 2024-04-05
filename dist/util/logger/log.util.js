"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _log = require("log-beautify");
_log.setColors({ httpError: "magenta", httpError_: "magenta" });
_log.setSymbols({ httpError: "❌" });
_log.setLabels({ httpError: "HTTP Exception!!" });
_log.setTextColors({ httpError_: "pink" });
const __show = _log.show.bind(_log);
const __debug = _log.debug.bind(_log);
const __info = _log.info.bind(_log);
const __log = __show;
const __error = _log.error.bind(_log);
const __warning = _log.warn.bind(_log);
const __success = _log.success.bind(_log);
const __httpError = _log.httpError.bind(_log);
_log.trace('Trace');
class _l {
    constructor() { }
    static setLevel(str) {
        localStorage.debug = str;
    }
    static getDiffTime() {
        let exTime = this._time;
        let now = new Date().getTime();
        let diff = exTime ? now - this._time : 0;
        this._time = new Date().getTime();
        return `+${diff}ms`;
    }
    static prefix() {
        let _d = new Date();
        const d = new Date(_d.getTime() - _d.getTimezoneOffset() * 60 * 1000).toISOString().split(/[T.]/);
        const date = d[0].replace(/-/g, '');
        const time = d[1].replace(/:/g, '');
        return `[${time} ${process.pid}]`;
    }
    static log(...args) {
        this._common(__log, false, false, ...args);
    }
    static logp(...args) {
        this._common(__log, true, false, ...args);
    }
    static log_detail(...args) {
        this._common(__log, false, true, ...args);
    }
    static debug(...args) {
        this._common(__debug, false, false, ...args);
    }
    static debug_prefix(...args) {
        this._common(__debug, true, false, ...args);
    }
    static info(...args) {
        this._common(__info, true, false, ...args);
    }
    static warn(...args) {
        this._common(__warning, true, false, ...args);
    }
    static error(...args) {
        this._common(__error, true, false, ...args);
    }
    static success(...args) {
        this._common(__success, true, false, ...args);
    }
    static success_detail(...args) {
        this._common(__success, true, true, ...args);
    }
    static httpException(...args) {
        _log.useLabels = true;
        _log.useSymbols = true;
        this._common(__httpError, true, false, ...args);
        _log.useSymbols = false;
        _log.useLabels = false;
    }
    static _common(_func, flagUsePrefix, flagPrintDetail, ...args) {
        let contents = [...args];
        if (flagPrintDetail)
            contents = [...args].map(i => JSON.stringify(i, null, 2));
        if (_func) {
            if (flagUsePrefix) {
                _func(_l.prefix(), ...contents);
            }
            else
                _func(...contents);
        }
        else
            __log(...contents);
    }
}
_l._time = 0;
exports.default = _l;
//# sourceMappingURL=log.util.js.map