const _log = require("log-beautify");

const __debug = _log.debug.bind(_log);
const __info = _log.info.bind(_log);
const __log = _log.debug.bind(_log);
const __error = _log.error.bind(_log);
const __warning = _log.warn.bind(_log);
const __success = _log.success.bind(_log);

const __show = _log.show.bind(_log);

// _log.trace('Trace');//change the level to use trace
// __log.bind(_log)("_log : ", _log);

export default class _d {

    static _time = 0;
  
    constructor() {}
  
    static setLevel(str) {
      localStorage.debug = str;
    }
  
    static getDiffTime() {
      let exTime = this._time;
      let now = new Date().getTime();
      let diff = exTime ? now - this._time : 0;
      this._time = new Date().getTime();
      return `+${diff}ms`
    }
  
    static prefix()
    {
      let _d = new Date();
      const d = new Date(_d.getTime() - _d.getTimezoneOffset()*60*1000).toISOString().split(/[T.]/);
      const date = d[0].replace(/-/g, '');
      const time = d[1].replace(/:/g, '');
    //   return `[${time} ${process.pid}|${getTraceId()}]`;
      return `[${time} ${process.pid}]`;
    }
  
    /**
     * 일반 로그 함수
     * @param args 
     */
    static log(...args) {
      this._common(__debug, false, ...args);
    }
  
    static info(...args) {
      this._common(__info, true, ...args);
    }
  
    static warn(...args) {
      this._common(__warning, true, ...args);
    }
  
    static error(...args) {
      this._common(__error, true, ...args);
    }

    /**
     * 성공적으로 request를 날릴 때 사용할 log
     * @param args log 내용
     */
    static success(...args)
    {
      this._common(__success, true, ...args);
    }
  
    // static notice(...args) {
    //   noticeLog(`[${process.pid}|${getTraceId()}]`, ...args)
    //   this._common(__debug, true, ...args)
    // }

    static _common(_func, flagUsePrefix, ...args)
    {
        if ( _func )
        {
            if ( flagUsePrefix )
                __show(_d.prefix());
            _func(...args);
        }
    }
  }