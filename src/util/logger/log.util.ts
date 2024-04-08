const _log = require("log-beautify");

_log.setColors( {httpError: "magenta", httpError_: "magenta", highlight:"yellow", highlight_:"yellow"});
_log.setSymbols( {httpError: "❌", highlight:'🌈🌈🌈'} );
_log.setLabels({ httpError: "HTTP Exception!!", highlight:"Check!! : "});
_log.setTextColors( {httpError_: "pink", highlight_: "yellow"});

const __show = _log.show.bind(_log);
const __debug = _log.debug.bind(_log);
const __info = _log.info.bind(_log);
const __log = __show;
const __error = _log.error.bind(_log);
const __warning = _log.warn.bind(_log);
const __success = _log.success.bind(_log);
const __httpError = _log.httpError.bind(_log);
const __hl = _log.highlight.bind(_log);

_log.trace('Trace');//change the level to use trace
// __log.bind(_log)("_log : ", _log);

/**
 * Log class
 * 
 * - 일반 케이스 : _l.log 이용
 * - debug에만 남길 메시지 : _l.debug 이용
 * - 서버에 남길 메시지는 _l. info, warn, error 를 이용 (시간이 함께 출력됨)
 */
export default class _l {

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

    static hl(...args) {
      this._common(__hl, false, true, ...args);
    }
  
  
    /**
     * 일반 로그 함수
     * @param args 
     */
    static log(...args) {
      this._common(__log, false, false, ...args);
    }
    /**
     * prefix를 사용하는 log함수
     * @param args 
     */
    static logp(...args) {
      this._common(__log, true, false, ...args);
    }
  
    /**
     * 인수가 object일 경우 자세한 내용을 보고 싶을 때 
     */
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

    /**
     * 성공적으로 request를 날릴 때 사용할 log
     * @param args log 내용
     */
    static success(...args)
    {
      this._common(__success, true, false, ...args);
    }

    static success_detail(...args)
    {
      this._common(__success, true, true, ...args);
    }

    static httpException(...args) {
      _log.useLabels = true;
      _log.useSymbols = true;
      this._common(__httpError, true, false, ...args);
      _log.useSymbols = false;
      _log.useLabels = false;
    }
  
    // static notice(...args) {
    //   noticeLog(`[${process.pid}|${getTraceId()}]`, ...args)
    //   this._common(__debug, true, ...args)
    // }

    static _common(_func, flagUsePrefix, flagPrintDetail, ...args)
    {
      let contents = [...args];
      if ( flagPrintDetail ) // 자세한 내용을 보고 싶을 때
        contents = [...args].map( i=>JSON.stringify(i, null, 2));
        

        if ( _func )
        {
            if ( flagUsePrefix )
            {
                // _log.useLabels = false;
                // _log.useSymbols = false;
                // _func(_l.prefix());
                // _log.useLabels = true;
                // _log.useSymbols = true;
              _func(_l.prefix(), ...contents);
            }
            else
              _func(...contents);
        }
        else
            __log(...contents);
    }
  }