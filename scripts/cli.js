'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
	if (e && e.__esModule) { return e; } else {
		var n = {};
		if (e) {
			Object.keys(e).forEach(function (k) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return e[k];
					}
				});
			});
		}
		n['default'] = e;
		return n;
	}
}

const fs = require('@stencil/core/sys/node/graceful-fs');
const fs__default = _interopDefault(fs);
const path$1 = require('path');
const path$1__default = _interopDefault(path$1);
const util$2 = require('util');
const util$2__default = _interopDefault(util$2);
const fs$1 = _interopDefault(require('fs'));
const events = require('events');
const events__default = _interopDefault(events);
const assert = _interopDefault(require('assert'));
const os = require('os');
const os__default = _interopDefault(os);
const crypto = require('crypto');
const crypto__default = _interopDefault(crypto);
const cp = require('child_process');
const https = require('https');
const url = require('url');
const readline = _interopDefault(require('readline'));

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var symbols = createCommonjsModule(function (module) {

const isHyper = process.env.TERM_PROGRAM === 'Hyper';
const isWindows = process.platform === 'win32';
const isLinux = process.platform === 'linux';

const common = {
  ballotDisabled: '☒',
  ballotOff: '☐',
  ballotOn: '☑',
  bullet: '•',
  bulletWhite: '◦',
  fullBlock: '█',
  heart: '❤',
  identicalTo: '≡',
  line: '─',
  mark: '※',
  middot: '·',
  minus: '－',
  multiplication: '×',
  obelus: '÷',
  pencilDownRight: '✎',
  pencilRight: '✏',
  pencilUpRight: '✐',
  percent: '%',
  pilcrow2: '❡',
  pilcrow: '¶',
  plusMinus: '±',
  section: '§',
  starsOff: '☆',
  starsOn: '★',
  upDownArrow: '↕'
};

const windows = Object.assign({}, common, {
  check: '√',
  cross: '×',
  ellipsisLarge: '...',
  ellipsis: '...',
  info: 'i',
  question: '?',
  questionSmall: '?',
  pointer: '>',
  pointerSmall: '»',
  radioOff: '( )',
  radioOn: '(*)',
  warning: '‼'
});

const other = Object.assign({}, common, {
  ballotCross: '✘',
  check: '✔',
  cross: '✖',
  ellipsisLarge: '⋯',
  ellipsis: '…',
  info: 'ℹ',
  question: '?',
  questionFull: '？',
  questionSmall: '﹖',
  pointer: isLinux ? '▸' : '❯',
  pointerSmall: isLinux ? '‣' : '›',
  radioOff: '◯',
  radioOn: '◉',
  warning: '⚠'
});

module.exports = (isWindows && !isHyper) ? windows : other;
Reflect.defineProperty(module.exports, 'common', { enumerable: false, value: common });
Reflect.defineProperty(module.exports, 'windows', { enumerable: false, value: windows });
Reflect.defineProperty(module.exports, 'other', { enumerable: false, value: other });
});

const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);

/* eslint-disable no-control-regex */
// this is a modified version of https://github.com/chalk/ansi-regex (MIT License)
const ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;

const create = () => {
  const colors = { enabled: true, visible: true, styles: {}, keys: {} };

  if ('FORCE_COLOR' in process.env) {
    colors.enabled = process.env.FORCE_COLOR !== '0';
  }

  const ansi = style => {
    let open = style.open = `\u001b[${style.codes[0]}m`;
    let close = style.close = `\u001b[${style.codes[1]}m`;
    let regex = style.regex = new RegExp(`\\u001b\\[${style.codes[1]}m`, 'g');
    style.wrap = (input, newline) => {
      if (input.includes(close)) input = input.replace(regex, close + open);
      let output = open + input + close;
      // see https://github.com/chalk/chalk/pull/92, thanks to the
      // chalk contributors for this fix. However, we've confirmed that
      // this issue is also present in Windows terminals
      return newline ? output.replace(/\r*\n/g, `${close}$&${open}`) : output;
    };
    return style;
  };

  const wrap = (style, input, newline) => {
    return typeof style === 'function' ? style(input) : style.wrap(input, newline);
  };

  const style = (input, stack) => {
    if (input === '' || input == null) return '';
    if (colors.enabled === false) return input;
    if (colors.visible === false) return '';
    let str = '' + input;
    let nl = str.includes('\n');
    let n = stack.length;
    if (n > 0 && stack.includes('unstyle')) {
      stack = [...new Set(['unstyle', ...stack])].reverse();
    }
    while (n-- > 0) str = wrap(colors.styles[stack[n]], str, nl);
    return str;
  };

  const define = (name, codes, type) => {
    colors.styles[name] = ansi({ name, codes });
    let keys = colors.keys[type] || (colors.keys[type] = []);
    keys.push(name);

    Reflect.defineProperty(colors, name, {
      configurable: true,
      enumerable: true,
      set(value) {
        colors.alias(name, value);
      },
      get() {
        let color = input => style(input, color.stack);
        Reflect.setPrototypeOf(color, colors);
        color.stack = this.stack ? this.stack.concat(name) : [name];
        return color;
      }
    });
  };

  define('reset', [0, 0], 'modifier');
  define('bold', [1, 22], 'modifier');
  define('dim', [2, 22], 'modifier');
  define('italic', [3, 23], 'modifier');
  define('underline', [4, 24], 'modifier');
  define('inverse', [7, 27], 'modifier');
  define('hidden', [8, 28], 'modifier');
  define('strikethrough', [9, 29], 'modifier');

  define('black', [30, 39], 'color');
  define('red', [31, 39], 'color');
  define('green', [32, 39], 'color');
  define('yellow', [33, 39], 'color');
  define('blue', [34, 39], 'color');
  define('magenta', [35, 39], 'color');
  define('cyan', [36, 39], 'color');
  define('white', [37, 39], 'color');
  define('gray', [90, 39], 'color');
  define('grey', [90, 39], 'color');

  define('bgBlack', [40, 49], 'bg');
  define('bgRed', [41, 49], 'bg');
  define('bgGreen', [42, 49], 'bg');
  define('bgYellow', [43, 49], 'bg');
  define('bgBlue', [44, 49], 'bg');
  define('bgMagenta', [45, 49], 'bg');
  define('bgCyan', [46, 49], 'bg');
  define('bgWhite', [47, 49], 'bg');

  define('blackBright', [90, 39], 'bright');
  define('redBright', [91, 39], 'bright');
  define('greenBright', [92, 39], 'bright');
  define('yellowBright', [93, 39], 'bright');
  define('blueBright', [94, 39], 'bright');
  define('magentaBright', [95, 39], 'bright');
  define('cyanBright', [96, 39], 'bright');
  define('whiteBright', [97, 39], 'bright');

  define('bgBlackBright', [100, 49], 'bgBright');
  define('bgRedBright', [101, 49], 'bgBright');
  define('bgGreenBright', [102, 49], 'bgBright');
  define('bgYellowBright', [103, 49], 'bgBright');
  define('bgBlueBright', [104, 49], 'bgBright');
  define('bgMagentaBright', [105, 49], 'bgBright');
  define('bgCyanBright', [106, 49], 'bgBright');
  define('bgWhiteBright', [107, 49], 'bgBright');

  colors.ansiRegex = ANSI_REGEX;
  colors.hasColor = colors.hasAnsi = str => {
    colors.ansiRegex.lastIndex = 0;
    return typeof str === 'string' && str !== '' && colors.ansiRegex.test(str);
  };

  colors.alias = (name, color) => {
    let fn = typeof color === 'string' ? colors[color] : color;

    if (typeof fn !== 'function') {
      throw new TypeError('Expected alias to be the name of an existing color (string) or a function');
    }

    if (!fn.stack) {
      Reflect.defineProperty(fn, 'name', { value: name });
      colors.styles[name] = fn;
      fn.stack = [name];
    }

    Reflect.defineProperty(colors, name, {
      configurable: true,
      enumerable: true,
      set(value) {
        colors.alias(name, value);
      },
      get() {
        let color = input => style(input, color.stack);
        Reflect.setPrototypeOf(color, colors);
        color.stack = this.stack ? this.stack.concat(fn.stack) : fn.stack;
        return color;
      }
    });
  };

  colors.theme = custom => {
    if (!isObject(custom)) throw new TypeError('Expected theme to be an object');
    for (let name of Object.keys(custom)) {
      colors.alias(name, custom[name]);
    }
    return colors;
  };

  colors.alias('unstyle', str => {
    if (typeof str === 'string' && str !== '') {
      colors.ansiRegex.lastIndex = 0;
      return str.replace(colors.ansiRegex, '');
    }
    return '';
  });

  colors.alias('noop', str => str);
  colors.none = colors.clear = colors.noop;

  colors.stripColor = colors.unstyle;
  colors.symbols = symbols;
  colors.define = define;
  return colors;
};

var ansiColors = create();
var create_1 = create;
ansiColors.create = create_1;

function createNodeLogger(prcs) {
    return new NodeLogger(prcs);
}
class NodeLogger {
    constructor(prcs) {
        this.prcs = prcs;
        this.colors = true;
        this._level = 'info';
        this.writeLogQueue = [];
        this.buildLogFilePath = null;
    }
    get level() {
        return this._level;
    }
    set level(l) {
        if (typeof l === 'string') {
            l = l.toLowerCase().trim();
            if (LOG_LEVELS.indexOf(l) === -1) {
                this.error(`Invalid log level '${this.bold(l)}' (choose from: ${LOG_LEVELS.map(l => this.bold(l)).join(', ')})`);
            }
            else {
                this._level = l;
            }
        }
    }
    info(...msg) {
        if (this.shouldLog('info')) {
            const lines = wordWrap(msg, getColumns(this.prcs));
            this.infoPrefix(lines);
            console.log(lines.join('\n'));
        }
        this.queueWriteLog('I', msg);
    }
    infoPrefix(lines) {
        if (lines.length) {
            const d = new Date();
            const prefix = '[' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2) + '.' + Math.floor((d.getMilliseconds() / 1000) * 10) + ']';
            lines[0] = this.dim(prefix) + lines[0].substr(prefix.length);
        }
    }
    warn(...msg) {
        if (this.shouldLog('warn')) {
            const lines = wordWrap(msg, getColumns(this.prcs));
            this.warnPrefix(lines);
            console.warn('\n' + lines.join('\n') + '\n');
        }
        this.queueWriteLog('W', msg);
    }
    warnPrefix(lines) {
        if (lines.length) {
            const prefix = '[ WARN  ]';
            lines[0] = this.bold(this.yellow(prefix)) + lines[0].substr(prefix.length);
        }
    }
    error(...msg) {
        for (let i = 0; i < msg.length; i++) {
            if (msg[i] instanceof Error) {
                const err = msg[i];
                msg[i] = err.message;
                if (err.stack) {
                    msg[i] += '\n' + err.stack;
                }
            }
        }
        if (this.shouldLog('error')) {
            const lines = wordWrap(msg, getColumns(this.prcs));
            this.errorPrefix(lines);
            console.error('\n' + lines.join('\n') + '\n');
        }
        this.queueWriteLog('E', msg);
    }
    errorPrefix(lines) {
        if (lines.length) {
            const prefix = '[ ERROR ]';
            lines[0] = this.bold(this.red(prefix)) + lines[0].substr(prefix.length);
        }
    }
    debug(...msg) {
        if (this.shouldLog('debug')) {
            msg.push(this.dim(` MEM: ${(this.prcs.memoryUsage().rss / 1000000).toFixed(1)}MB`));
            const lines = wordWrap(msg, getColumns(this.prcs));
            this.debugPrefix(lines);
            console.log(lines.join('\n'));
        }
        this.queueWriteLog('D', msg);
    }
    debugPrefix(lines) {
        if (lines.length) {
            const d = new Date();
            const prefix = '[' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2) + '.' + Math.floor((d.getMilliseconds() / 1000) * 10) + ']';
            lines[0] = this.cyan(prefix) + lines[0].substr(prefix.length);
        }
    }
    timespanStart(startMsg, debug, appendTo) {
        const msg = [`${startMsg} ${this.dim('...')}`];
        if (debug) {
            if (this.shouldLog('debug')) {
                msg.push(this.dim(` MEM: ${(this.prcs.memoryUsage().rss / 1000000).toFixed(1)}MB`));
                const lines = wordWrap(msg, getColumns(this.prcs));
                this.debugPrefix(lines);
                console.log(lines.join('\n'));
                this.queueWriteLog('D', [`${startMsg} ...`]);
            }
        }
        else {
            const lines = wordWrap(msg, getColumns(this.prcs));
            this.infoPrefix(lines);
            console.log(lines.join('\n'));
            this.queueWriteLog('I', [`${startMsg} ...`]);
            if (appendTo) {
                appendTo.push(`${startMsg} ...`);
            }
        }
    }
    timespanFinish(finishMsg, timeSuffix, color, bold, newLineSuffix, debug, appendTo) {
        let msg = finishMsg;
        if (color) {
            msg = this.color(finishMsg, color);
        }
        if (bold) {
            msg = this.bold(msg);
        }
        msg += ' ' + this.dim(timeSuffix);
        if (debug) {
            if (this.shouldLog('debug')) {
                const m = [msg];
                m.push(this.dim(` MEM: ${(this.prcs.memoryUsage().rss / 1000000).toFixed(1)}MB`));
                const lines = wordWrap(m, getColumns(this.prcs));
                this.debugPrefix(lines);
                console.log(lines.join('\n'));
            }
            this.queueWriteLog('D', [`${finishMsg} ${timeSuffix}`]);
        }
        else {
            const lines = wordWrap([msg], getColumns(this.prcs));
            this.infoPrefix(lines);
            console.log(lines.join('\n'));
            this.queueWriteLog('I', [`${finishMsg} ${timeSuffix}`]);
            if (appendTo) {
                appendTo.push(`${finishMsg} ${timeSuffix}`);
            }
        }
        if (newLineSuffix) {
            console.log('');
        }
    }
    queueWriteLog(prefix, msg) {
        if (this.buildLogFilePath) {
            const d = new Date();
            const log = '' +
                ('0' + d.getHours()).slice(-2) +
                ':' +
                ('0' + d.getMinutes()).slice(-2) +
                ':' +
                ('0' + d.getSeconds()).slice(-2) +
                '.' +
                ('0' + Math.floor((d.getMilliseconds() / 1000) * 10)) +
                '  ' +
                ('000' + (this.prcs.memoryUsage().rss / 1000000).toFixed(1)).slice(-6) +
                'MB' +
                '  ' +
                prefix +
                '  ' +
                msg.join(', ');
            this.writeLogQueue.push(log);
        }
    }
    writeLogs(append) {
        if (this.buildLogFilePath) {
            try {
                this.queueWriteLog('F', ['--------------------------------------']);
                const log = this.writeLogQueue.join('\n');
                if (append) {
                    try {
                        fs__default.accessSync(this.buildLogFilePath);
                    }
                    catch (e) {
                        append = false;
                    }
                }
                if (append) {
                    fs__default.appendFileSync(this.buildLogFilePath, log);
                }
                else {
                    fs__default.writeFileSync(this.buildLogFilePath, log);
                }
            }
            catch (e) { }
        }
        this.writeLogQueue.length = 0;
    }
    color(msg, colorName) {
        return this.colors ? ansiColors[colorName](msg) : msg;
    }
    red(msg) {
        return this.colors ? ansiColors.red(msg) : msg;
    }
    green(msg) {
        return this.colors ? ansiColors.green(msg) : msg;
    }
    yellow(msg) {
        return this.colors ? ansiColors.yellow(msg) : msg;
    }
    blue(msg) {
        return this.colors ? ansiColors.blue(msg) : msg;
    }
    magenta(msg) {
        return this.colors ? ansiColors.magenta(msg) : msg;
    }
    cyan(msg) {
        return this.colors ? ansiColors.cyan(msg) : msg;
    }
    gray(msg) {
        return this.colors ? ansiColors.gray(msg) : msg;
    }
    bold(msg) {
        return this.colors ? ansiColors.bold(msg) : msg;
    }
    dim(msg) {
        return this.colors ? ansiColors.dim(msg) : msg;
    }
    bgRed(msg) {
        return this.colors ? ansiColors.bgRed(msg) : msg;
    }
    shouldLog(level) {
        return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(this.level);
    }
    createTimeSpan(startMsg, debug = false, appendTo) {
        return new CmdTimeSpan(this, startMsg, debug, appendTo);
    }
    printDiagnostics(diagnostics, cwd) {
        if (!diagnostics || diagnostics.length === 0)
            return;
        let outputLines = [''];
        diagnostics.forEach(d => {
            outputLines = outputLines.concat(this.printDiagnostic(d, cwd));
        });
        console.log(outputLines.join('\n'));
    }
    printDiagnostic(diagnostic, cwd) {
        const outputLines = wordWrap([diagnostic.messageText], getColumns(this.prcs));
        let header = '';
        if (diagnostic.header && diagnostic.header !== 'Build Error') {
            header += diagnostic.header;
        }
        if (typeof diagnostic.absFilePath === 'string' && typeof diagnostic.relFilePath !== 'string') {
            if (typeof cwd !== 'string') {
                cwd = this.prcs.cwd();
            }
            diagnostic.relFilePath = path$1__default.relative(cwd, diagnostic.absFilePath);
            if (!diagnostic.relFilePath.includes('/')) {
                diagnostic.relFilePath = './' + diagnostic.relFilePath;
            }
        }
        let filePath = diagnostic.relFilePath;
        if (typeof filePath !== 'string') {
            filePath = diagnostic.absFilePath;
        }
        if (typeof filePath === 'string') {
            if (header.length > 0) {
                header += ': ';
            }
            header += this.cyan(filePath);
            if (typeof diagnostic.lineNumber === 'number' && diagnostic.lineNumber > -1) {
                header += this.dim(`:`);
                header += this.yellow(`${diagnostic.lineNumber}`);
                if (typeof diagnostic.columnNumber === 'number' && diagnostic.columnNumber > -1) {
                    header += this.dim(`:`);
                    header += this.yellow(`${diagnostic.columnNumber}`);
                }
            }
        }
        if (header.length > 0) {
            outputLines.unshift(INDENT + header);
        }
        outputLines.push('');
        if (diagnostic.lines && diagnostic.lines.length) {
            const lines = prepareLines(diagnostic.lines);
            lines.forEach(l => {
                if (!isMeaningfulLine(l.text)) {
                    return;
                }
                let msg = ``;
                if (l.lineNumber > -1) {
                    msg = `L${l.lineNumber}:  `;
                }
                while (msg.length < INDENT.length) {
                    msg = ' ' + msg;
                }
                let text = l.text;
                if (l.errorCharStart > -1) {
                    text = this.highlightError(text, l.errorCharStart, l.errorLength);
                }
                msg = this.dim(msg);
                if (diagnostic.language === 'typescript' || diagnostic.language === 'javascript') {
                    msg += this.javaScriptSyntaxHighlight(text);
                }
                else if (diagnostic.language === 'scss' || diagnostic.language === 'css') {
                    msg += this.cssSyntaxHighlight(text);
                }
                else {
                    msg += text;
                }
                outputLines.push(msg);
            });
            outputLines.push('');
        }
        if (diagnostic.level === 'error') {
            this.errorPrefix(outputLines);
        }
        else if (diagnostic.level === 'warn') {
            this.warnPrefix(outputLines);
        }
        else if (diagnostic.level === 'debug') {
            this.debugPrefix(outputLines);
        }
        else {
            this.infoPrefix(outputLines);
        }
        if (diagnostic.debugText != null && this.level === 'debug') {
            outputLines.push(diagnostic.debugText);
            this.debugPrefix(wordWrap([diagnostic.debugText], getColumns(this.prcs)));
        }
        return outputLines;
    }
    highlightError(errorLine, errorCharStart, errorLength) {
        let rightSideChars = errorLine.length - errorCharStart + errorLength - 1;
        while (errorLine.length + INDENT.length > MAX_COLUMNS) {
            if (errorCharStart > errorLine.length - errorCharStart + errorLength && errorCharStart > 5) {
                // larger on left side
                errorLine = errorLine.substr(1);
                errorCharStart--;
            }
            else if (rightSideChars > 1) {
                // larger on right side
                errorLine = errorLine.substr(0, errorLine.length - 1);
                rightSideChars--;
            }
            else {
                break;
            }
        }
        const lineChars = [];
        const lineLength = Math.max(errorLine.length, errorCharStart + errorLength);
        for (var i = 0; i < lineLength; i++) {
            var chr = errorLine.charAt(i);
            if (i >= errorCharStart && i < errorCharStart + errorLength) {
                chr = this.bgRed(chr === '' ? ' ' : chr);
            }
            lineChars.push(chr);
        }
        return lineChars.join('');
    }
    javaScriptSyntaxHighlight(text) {
        if (text.trim().startsWith('//')) {
            return this.dim(text);
        }
        const words = text.split(' ').map(word => {
            if (JS_KEYWORDS.indexOf(word) > -1) {
                return this.cyan(word);
            }
            return word;
        });
        return words.join(' ');
    }
    cssSyntaxHighlight(text) {
        let cssProp = true;
        const safeChars = 'abcdefghijklmnopqrstuvwxyz-_';
        const notProp = '.#,:}@$[]/*';
        const chars = [];
        for (var i = 0; i < text.length; i++) {
            const c = text.charAt(i);
            if (c === ';' || c === '{') {
                cssProp = true;
            }
            else if (notProp.indexOf(c) > -1) {
                cssProp = false;
            }
            if (cssProp && safeChars.indexOf(c.toLowerCase()) > -1) {
                chars.push(this.cyan(c));
                continue;
            }
            chars.push(c);
        }
        return chars.join('');
    }
}
class CmdTimeSpan {
    constructor(logger, startMsg, debug, appendTo) {
        this.debug = debug;
        this.appendTo = appendTo;
        this.logger = logger;
        this.start = Date.now();
        this.logger.timespanStart(startMsg, debug, this.appendTo);
    }
    duration() {
        return Date.now() - this.start;
    }
    finish(msg, color, bold, newLineSuffix) {
        const duration = this.duration();
        let time;
        if (duration > 1000) {
            time = 'in ' + (duration / 1000).toFixed(2) + ' s';
        }
        else {
            const ms = parseFloat(duration.toFixed(3));
            if (ms > 0) {
                time = 'in ' + duration + ' ms';
            }
            else {
                time = 'in less than 1 ms';
            }
        }
        this.logger.timespanFinish(msg, time, color, bold, newLineSuffix, this.debug, this.appendTo);
        return duration;
    }
}
const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];
function getColumns(prcs) {
    const terminalWidth = (prcs.stdout && prcs.stdout.columns) || 80;
    return Math.max(Math.min(MAX_COLUMNS, terminalWidth), MIN_COLUMNS);
}
function wordWrap(msg, columns) {
    const lines = [];
    const words = [];
    msg.forEach(m => {
        if (m === null) {
            words.push('null');
        }
        else if (typeof m === 'undefined') {
            words.push('undefined');
        }
        else if (typeof m === 'string') {
            m.replace(/\s/gm, ' ')
                .split(' ')
                .forEach(strWord => {
                if (strWord.trim().length) {
                    words.push(strWord.trim());
                }
            });
        }
        else if (typeof m === 'number' || typeof m === 'boolean' || typeof m === 'function') {
            words.push(m.toString());
        }
        else if (Array.isArray(m)) {
            words.push(() => {
                return m.toString();
            });
        }
        else if (Object(m) === m) {
            words.push(() => {
                return m.toString();
            });
        }
        else {
            words.push(m.toString());
        }
    });
    let line = INDENT;
    words.forEach(word => {
        if (lines.length > 25) {
            return;
        }
        if (typeof word === 'function') {
            if (line.trim().length) {
                lines.push(line);
            }
            lines.push(word());
            line = INDENT;
        }
        else if (INDENT.length + word.length > columns - 1) {
            // word is too long to play nice, just give it its own line
            if (line.trim().length) {
                lines.push(line);
            }
            lines.push(INDENT + word);
            line = INDENT;
        }
        else if (word.length + line.length > columns - 1) {
            // this word would make the line too long
            // print the line now, then start a new one
            lines.push(line);
            line = INDENT + word + ' ';
        }
        else {
            line += word + ' ';
        }
    });
    if (line.trim().length) {
        lines.push(line);
    }
    return lines.map(line => {
        return line.trimRight();
    });
}
function prepareLines(orgLines) {
    const lines = JSON.parse(JSON.stringify(orgLines));
    for (let i = 0; i < 100; i++) {
        if (!eachLineHasLeadingWhitespace(lines)) {
            return lines;
        }
        for (let i = 0; i < lines.length; i++) {
            lines[i].text = lines[i].text.substr(1);
            lines[i].errorCharStart--;
            if (!lines[i].text.length) {
                return lines;
            }
        }
    }
    return lines;
}
function eachLineHasLeadingWhitespace(lines) {
    if (!lines.length) {
        return false;
    }
    for (var i = 0; i < lines.length; i++) {
        if (!lines[i].text || lines[i].text.length < 1) {
            return false;
        }
        const firstChar = lines[i].text.charAt(0);
        if (firstChar !== ' ' && firstChar !== '\t') {
            return false;
        }
    }
    return true;
}
function isMeaningfulLine(line) {
    if (line) {
        line = line.trim();
        return line.length > 0;
    }
    return false;
}
const JS_KEYWORDS = [
    'abstract',
    'any',
    'as',
    'break',
    'boolean',
    'case',
    'catch',
    'class',
    'console',
    'const',
    'continue',
    'debugger',
    'declare',
    'default',
    'delete',
    'do',
    'else',
    'enum',
    'export',
    'extends',
    'false',
    'finally',
    'for',
    'from',
    'function',
    'get',
    'if',
    'import',
    'in',
    'implements',
    'Infinity',
    'instanceof',
    'let',
    'module',
    'namespace',
    'NaN',
    'new',
    'number',
    'null',
    'public',
    'private',
    'protected',
    'require',
    'return',
    'static',
    'set',
    'string',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'true',
    'type',
    'typeof',
    'undefined',
    'var',
    'void',
    'with',
    'while',
    'yield',
];
const INDENT = '           ';
const MIN_COLUMNS = 60;
const MAX_COLUMNS = 120;

const buildEvents = () => {
    const evCallbacks = [];
    const off = (callback) => {
        const index = evCallbacks.findIndex(ev => ev.callback === callback);
        if (index > -1) {
            evCallbacks.splice(index, 1);
            return true;
        }
        return false;
    };
    const on = (arg0, arg1) => {
        if (typeof arg0 === 'function') {
            const eventName = null;
            const callback = arg0;
            evCallbacks.push({
                eventName,
                callback,
            });
            return () => off(callback);
        }
        else if (typeof arg0 === 'string' && typeof arg1 === 'function') {
            const eventName = arg0.toLowerCase().trim();
            const callback = arg1;
            evCallbacks.push({
                eventName,
                callback,
            });
            return () => off(callback);
        }
        return () => false;
    };
    const emit = (eventName, data) => {
        const normalizedEventName = eventName.toLowerCase().trim();
        const callbacks = evCallbacks.slice();
        for (const ev of callbacks) {
            if (ev.eventName == null) {
                try {
                    ev.callback(eventName, data);
                }
                catch (e) {
                    console.error(e);
                }
            }
            else if (ev.eventName === normalizedEventName) {
                try {
                    ev.callback(data);
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
    };
    const unsubscribeAll = () => {
        evCallbacks.length = 0;
    };
    return {
        emit,
        on,
        unsubscribeAll,
    };
};

const IS_NODE_ENV = typeof global !== 'undefined' &&
    typeof require === 'function' &&
    !!global.process &&
    Array.isArray(global.process.argv) &&
    typeof __filename === 'string' &&
    (!global.origin || typeof global.origin !== 'string');
const IS_NODE_WINDOWS_ENV = IS_NODE_ENV && global.process.platform === 'win32';
const requireFunc = (path) => (typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require)(path);

const toLowerCase = (str) => str.toLowerCase();
const dashToPascalCase = (str) => toLowerCase(str)
    .split('-')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
const noop = () => {
    /* noop*/
};
const flatOne = (array) => {
    if (array.flat) {
        return array.flat(1);
    }
    return array.reduce((result, item) => {
        result.push(...item);
        return result;
    }, []);
};
const unique = (array, predicate = i => i) => {
    const set = new Set();
    return array.filter(item => {
        const key = predicate(item);
        if (key == null) {
            return true;
        }
        if (set.has(key)) {
            return false;
        }
        set.add(key);
        return true;
    });
};
const isDefined = (v) => v !== null && v !== undefined;
const isFunction = (v) => typeof v === 'function';
const isString = (v) => typeof v === 'string';
const isIterable = (v) => isDefined(v) && isFunction(v[Symbol.iterator]);
const isPromise = (v) => !!v && (typeof v === 'object' || typeof v === 'function') && typeof v.then === 'function';

/*!
 * Ported to ESM from:
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
const isGlobChars = { '{': '}', '(': ')', '[': ']' };
const isGlobStrictRegex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
const isExtglobRegex = /(\\).|([@?!+*]\(.*\))/;
const isExtglob = (str) => {
    let match;
    while ((match = isExtglobRegex.exec(str))) {
        if (match[2]) {
            return true;
        }
        str = str.slice(match.index + match[0].length);
    }
    return false;
};
const isGlob = (str) => {
    if (!isString(str) || str === '') {
        return false;
    }
    if (isExtglob(str)) {
        return true;
    }
    const regex = isGlobStrictRegex;
    let match;
    while ((match = regex.exec(str))) {
        if (match[2]) {
            return true;
        }
        let idx = match.index + match[0].length;
        // if an open bracket/brace/paren is escaped,
        // set the index to the next closing character
        const open = match[1];
        const close = open ? isGlobChars[open] : null;
        if (open && close) {
            const n = str.indexOf(close, idx);
            if (n !== -1) {
                idx = n + 1;
            }
        }
        str = str.slice(idx);
    }
    return false;
};

const splitLineBreaks = (sourceText) => {
    if (typeof sourceText !== 'string')
        return [];
    sourceText = sourceText.replace(/\\r/g, '\n');
    return sourceText.split('\n');
};

const buildError = (diagnostics) => {
    const diagnostic = {
        level: 'error',
        type: 'build',
        header: 'Build Error',
        messageText: 'build error',
        relFilePath: null,
        absFilePath: null,
        lines: [],
    };
    if (diagnostics) {
        diagnostics.push(diagnostic);
    }
    return diagnostic;
};
const catchError = (diagnostics, err, msg) => {
    const diagnostic = {
        level: 'error',
        type: 'build',
        header: 'Build Error',
        messageText: 'build error',
        relFilePath: null,
        absFilePath: null,
        lines: [],
    };
    if (isString(msg)) {
        diagnostic.messageText = msg;
    }
    else if (err != null) {
        if (err.stack != null) {
            diagnostic.messageText = err.stack.toString();
        }
        else {
            if (err.message != null) {
                diagnostic.messageText = err.message.toString();
            }
            else {
                diagnostic.messageText = err.toString();
            }
        }
    }
    if (diagnostics != null && !shouldIgnoreError(diagnostic.messageText)) {
        diagnostics.push(diagnostic);
    }
    return diagnostic;
};
const hasError = (diagnostics) => {
    if (diagnostics == null || diagnostics.length === 0) {
        return false;
    }
    return diagnostics.some(d => d.level === 'error' && d.type !== 'runtime');
};
const shouldIgnoreError = (msg) => {
    return msg === TASK_CANCELED_MSG;
};
const TASK_CANCELED_MSG = `task canceled`;

/**
 * Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
 * Forward-slash paths can be used in Windows as long as they're not
 * extended-length paths and don't contain any non-ascii characters.
 * This was created since the path methods in Node.js outputs \\ paths on Windows.
 */
const normalizePath = (path) => {
    if (typeof path !== 'string') {
        throw new Error(`invalid path to normalize`);
    }
    path = normalizeSlashes(path.trim());
    const components = pathComponents(path, getRootLength(path));
    const reducedComponents = reducePathComponents(components);
    const rootPart = reducedComponents[0];
    const secondPart = reducedComponents[1];
    const normalized = rootPart + reducedComponents.slice(1).join('/');
    if (normalized === '') {
        return '.';
    }
    if (rootPart === '' && secondPart && path.includes('/') && !secondPart.startsWith('.') && !secondPart.startsWith('@')) {
        return './' + normalized;
    }
    return normalized;
};
const normalizeSlashes = (path) => path.replace(backslashRegExp, '/');
const altDirectorySeparator = '\\';
const urlSchemeSeparator = '://';
const backslashRegExp = /\\/g;
const reducePathComponents = (components) => {
    if (!Array.isArray(components) || components.length === 0) {
        return [];
    }
    const reduced = [components[0]];
    for (let i = 1; i < components.length; i++) {
        const component = components[i];
        if (!component)
            continue;
        if (component === '.')
            continue;
        if (component === '..') {
            if (reduced.length > 1) {
                if (reduced[reduced.length - 1] !== '..') {
                    reduced.pop();
                    continue;
                }
            }
            else if (reduced[0])
                continue;
        }
        reduced.push(component);
    }
    return reduced;
};
const getRootLength = (path) => {
    const rootLength = getEncodedRootLength(path);
    return rootLength < 0 ? ~rootLength : rootLength;
};
const getEncodedRootLength = (path) => {
    if (!path)
        return 0;
    const ch0 = path.charCodeAt(0);
    // POSIX or UNC
    if (ch0 === 47 /* slash */ || ch0 === 92 /* backslash */) {
        if (path.charCodeAt(1) !== ch0)
            return 1; // POSIX: "/" (or non-normalized "\")
        const p1 = path.indexOf(ch0 === 47 /* slash */ ? '/' : altDirectorySeparator, 2);
        if (p1 < 0)
            return path.length; // UNC: "//server" or "\\server"
        return p1 + 1; // UNC: "//server/" or "\\server\"
    }
    // DOS
    if (isVolumeCharacter(ch0) && path.charCodeAt(1) === 58 /* colon */) {
        const ch2 = path.charCodeAt(2);
        if (ch2 === 47 /* slash */ || ch2 === 92 /* backslash */)
            return 3; // DOS: "c:/" or "c:\"
        if (path.length === 2)
            return 2; // DOS: "c:" (but not "c:d")
    }
    // URL
    const schemeEnd = path.indexOf(urlSchemeSeparator);
    if (schemeEnd !== -1) {
        const authorityStart = schemeEnd + urlSchemeSeparator.length;
        const authorityEnd = path.indexOf('/', authorityStart);
        if (authorityEnd !== -1) {
            // URL: "file:///", "file://server/", "file://server/path"
            // For local "file" URLs, include the leading DOS volume (if present).
            // Per https://www.ietf.org/rfc/rfc1738.txt, a host of "" or "localhost" is a
            // special case interpreted as "the machine from which the URL is being interpreted".
            const scheme = path.slice(0, schemeEnd);
            const authority = path.slice(authorityStart, authorityEnd);
            if (scheme === 'file' && (authority === '' || authority === 'localhost') && isVolumeCharacter(path.charCodeAt(authorityEnd + 1))) {
                const volumeSeparatorEnd = getFileUrlVolumeSeparatorEnd(path, authorityEnd + 2);
                if (volumeSeparatorEnd !== -1) {
                    if (path.charCodeAt(volumeSeparatorEnd) === 47 /* slash */) {
                        // URL: "file:///c:/", "file://localhost/c:/", "file:///c%3a/", "file://localhost/c%3a/"
                        return ~(volumeSeparatorEnd + 1);
                    }
                    if (volumeSeparatorEnd === path.length) {
                        // URL: "file:///c:", "file://localhost/c:", "file:///c$3a", "file://localhost/c%3a"
                        // but not "file:///c:d" or "file:///c%3ad"
                        return ~volumeSeparatorEnd;
                    }
                }
            }
            return ~(authorityEnd + 1); // URL: "file://server/", "http://server/"
        }
        return ~path.length; // URL: "file://server", "http://server"
    }
    // relative
    return 0;
};
const isVolumeCharacter = (charCode) => (charCode >= 97 /* a */ && charCode <= 122 /* z */) || (charCode >= 65 /* A */ && charCode <= 90 /* Z */);
const getFileUrlVolumeSeparatorEnd = (url, start) => {
    const ch0 = url.charCodeAt(start);
    if (ch0 === 58 /* colon */)
        return start + 1;
    if (ch0 === 37 /* percent */ && url.charCodeAt(start + 1) === 51 /* _3 */) {
        const ch2 = url.charCodeAt(start + 2);
        if (ch2 === 97 /* a */ || ch2 === 65 /* A */)
            return start + 3;
    }
    return -1;
};
const pathComponents = (path, rootLength) => {
    const root = path.substring(0, rootLength);
    const rest = path.substring(rootLength).split('/');
    const restLen = rest.length;
    if (restLen > 0 && !rest[restLen - 1]) {
        rest.pop();
    }
    return [root, ...rest];
};

/**
 * Ok, so formatting overkill, we know. But whatever, it makes for great
 * error reporting within a terminal. So, yeah, let's code it up, shall we?
 */
const loadTypeScriptDiagnostics = (tsDiagnostics) => {
    const diagnostics = [];
    const maxErrors = Math.min(tsDiagnostics.length, 50);
    for (let i = 0; i < maxErrors; i++) {
        diagnostics.push(loadTypeScriptDiagnostic(tsDiagnostics[i]));
    }
    return diagnostics;
};
const loadTypeScriptDiagnostic = (tsDiagnostic) => {
    const d = {
        level: 'warn',
        type: 'typescript',
        language: 'typescript',
        header: 'TypeScript',
        code: tsDiagnostic.code.toString(),
        messageText: flattenDiagnosticMessageText(tsDiagnostic, tsDiagnostic.messageText),
        relFilePath: null,
        absFilePath: null,
        lines: [],
    };
    if (tsDiagnostic.category === 1) {
        d.level = 'error';
    }
    if (tsDiagnostic.file) {
        d.absFilePath = tsDiagnostic.file.fileName;
        const sourceText = tsDiagnostic.file.text;
        const srcLines = splitLineBreaks(sourceText);
        const posData = tsDiagnostic.file.getLineAndCharacterOfPosition(tsDiagnostic.start);
        const errorLine = {
            lineIndex: posData.line,
            lineNumber: posData.line + 1,
            text: srcLines[posData.line],
            errorCharStart: posData.character,
            errorLength: Math.max(tsDiagnostic.length, 1),
        };
        d.lineNumber = errorLine.lineNumber;
        d.columnNumber = errorLine.errorCharStart + 1;
        d.lines.push(errorLine);
        if (errorLine.errorLength === 0 && errorLine.errorCharStart > 0) {
            errorLine.errorLength = 1;
            errorLine.errorCharStart--;
        }
        if (errorLine.lineIndex > 0) {
            const previousLine = {
                lineIndex: errorLine.lineIndex - 1,
                lineNumber: errorLine.lineNumber - 1,
                text: srcLines[errorLine.lineIndex - 1],
                errorCharStart: -1,
                errorLength: -1,
            };
            d.lines.unshift(previousLine);
        }
        if (errorLine.lineIndex + 1 < srcLines.length) {
            const nextLine = {
                lineIndex: errorLine.lineIndex + 1,
                lineNumber: errorLine.lineNumber + 1,
                text: srcLines[errorLine.lineIndex + 1],
                errorCharStart: -1,
                errorLength: -1,
            };
            d.lines.push(nextLine);
        }
    }
    return d;
};
const flattenDiagnosticMessageText = (tsDiagnostic, diag) => {
    if (typeof diag === 'string') {
        return diag;
    }
    else if (diag === undefined) {
        return '';
    }
    const ignoreCodes = [];
    const isStencilConfig = tsDiagnostic.file.fileName.includes('stencil.config');
    if (isStencilConfig) {
        ignoreCodes.push(2322);
    }
    let result = '';
    if (!ignoreCodes.includes(diag.code)) {
        result = diag.messageText;
        if (isIterable(diag.next)) {
            for (const kid of diag.next) {
                result += flattenDiagnosticMessageText(tsDiagnostic, kid);
            }
        }
    }
    if (isStencilConfig) {
        result = result.replace(`type 'StencilConfig'`, `Stencil Config`);
        result = result.replace(`Object literal may only specify known properties, but `, ``);
        result = result.replace(`Object literal may only specify known properties, and `, ``);
    }
    return result.trim();
};

const validateComponentTag = (tag) => {
    if (tag !== tag.trim()) {
        return `Tag can not contain white spaces`;
    }
    if (tag !== tag.toLowerCase()) {
        return `Tag can not contain upper case characters`;
    }
    if (typeof tag !== 'string') {
        return `Tag "${tag}" must be a string type`;
    }
    if (tag.length === 0) {
        return `Received empty tag value`;
    }
    if (tag.indexOf(' ') > -1) {
        return `"${tag}" tag cannot contain a space`;
    }
    if (tag.indexOf(',') > -1) {
        return `"${tag}" tag cannot be used for multiple tags`;
    }
    const invalidChars = tag.replace(/\w|-/g, '');
    if (invalidChars !== '') {
        return `"${tag}" tag contains invalid characters: ${invalidChars}`;
    }
    if (tag.indexOf('--') > -1) {
        return `"${tag}" tag cannot contain multiple dashes (--) next to each other`;
    }
    if (tag.indexOf('-') === 0) {
        return `"${tag}" tag cannot start with a dash (-)`;
    }
    if (tag.lastIndexOf('-') === tag.length - 1) {
        return `"${tag}" tag cannot end with a dash (-)`;
    }
    return undefined;
};

const copyFile = util$2.promisify(fs__default.copyFile);
const mkdir = util$2.promisify(fs__default.mkdir);
const readdir = util$2.promisify(fs__default.readdir);
const stat = util$2.promisify(fs__default.stat);

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var isWindows = process.platform === 'win32';


// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = path$1__default.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

var realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = path$1__default.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs$1.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs$1.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs$1.statSync(base);
        linkTarget = fs$1.readlinkSync(base);
      }
      resolvedLink = path$1__default.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = path$1__default.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


var realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = path$1__default.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs$1.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs$1.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs$1.stat(base, function(err) {
      if (err) return cb(err);

      fs$1.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = path$1__default.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = path$1__default.resolve(resolvedLink, p.slice(pos));
    start();
  }
};

var old = {
	realpathSync: realpathSync,
	realpath: realpath
};

var fs_realpath = realpath$1;
realpath$1.realpath = realpath$1;
realpath$1.sync = realpathSync$1;
realpath$1.realpathSync = realpathSync$1;
realpath$1.monkeypatch = monkeypatch;
realpath$1.unmonkeypatch = unmonkeypatch;


var origRealpath = fs$1.realpath;
var origRealpathSync = fs$1.realpathSync;

var version = process.version;
var ok = /^v[0-5]\./.test(version);


function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath$1 (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache;
    cache = null;
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb);
    } else {
      cb(er, result);
    }
  });
}

function realpathSync$1 (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs$1.realpath = realpath$1;
  fs$1.realpathSync = realpathSync$1;
}

function unmonkeypatch () {
  fs$1.realpath = origRealpath;
  fs$1.realpathSync = origRealpathSync;
}

var concatMap = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var balancedMatch = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}

var braceExpansion = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balancedMatch('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balancedMatch('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length);
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}

var minimatch_1 = minimatch;
minimatch.Minimatch = Minimatch;

var path = { sep: '/' };
try {
  path = path$1__default;
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};


var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
};

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]';

// * => any number of characters
var star = qmark + '*?';

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!');

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true;
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/;

minimatch.filter = filter;
function filter (pattern, options) {
  options = options || {};
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {};
  b = b || {};
  var t = {};
  Object.keys(b).forEach(function (k) {
    t[k] = b[k];
  });
  Object.keys(a).forEach(function (k) {
    t[k] = a[k];
  });
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch;

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  };

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  };

  return m
};

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
};

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {};

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {};
  pattern = pattern.trim();

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/');
  }

  this.options = options;
  this.set = [];
  this.pattern = pattern;
  this.regexp = null;
  this.negate = false;
  this.comment = false;
  this.empty = false;

  // make the set of regexps etc.
  this.make();
}

Minimatch.prototype.debug = function () {};

Minimatch.prototype.make = make;
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern;
  var options = this.options;

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true;
    return
  }
  if (!pattern) {
    this.empty = true;
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate();

  // step 2: expand braces
  var set = this.globSet = this.braceExpand();

  if (options.debug) this.debug = console.error;

  this.debug(this.pattern, set);

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  });

  this.debug(this.pattern, set);

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this);

  this.debug(this.pattern, set);

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  });

  this.debug(this.pattern, set);

  this.set = set;
}

Minimatch.prototype.parseNegate = parseNegate;
function parseNegate () {
  var pattern = this.pattern;
  var negate = false;
  var options = this.options;
  var negateOffset = 0;

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate;
    negateOffset++;
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset);
  this.negate = negate;
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
};

Minimatch.prototype.braceExpand = braceExpand;

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options;
    } else {
      options = {};
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern;

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return braceExpansion(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse;
var SUBPARSE = {};
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options;

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = '';
  var hasMagic = !!options.nocase;
  var escaping = false;
  // ? => one single character
  var patternListStack = [];
  var negativeLists = [];
  var stateChar;
  var inClass = false;
  var reClassStart = -1;
  var classStart = -1;
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)';
  var self = this;

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star;
          hasMagic = true;
        break
        case '?':
          re += qmark;
          hasMagic = true;
        break
        default:
          re += '\\' + stateChar;
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re);
      stateChar = false;
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c);

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c;
      escaping = false;
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar();
        escaping = true;
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class');
          if (c === '!' && i === classStart + 1) c = '^';
          re += c;
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar);
        clearStateChar();
        stateChar = c;
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar();
      continue

      case '(':
        if (inClass) {
          re += '(';
          continue
        }

        if (!stateChar) {
          re += '\\(';
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        });
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
        this.debug('plType %j %j', stateChar, re);
        stateChar = false;
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)';
          continue
        }

        clearStateChar();
        hasMagic = true;
        var pl = patternListStack.pop();
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close;
        if (pl.type === '!') {
          negativeLists.push(pl);
        }
        pl.reEnd = re.length;
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|';
          escaping = false;
          continue
        }

        clearStateChar();
        re += '|';
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar();

        if (inClass) {
          re += '\\' + c;
          continue
        }

        inClass = true;
        classStart = i;
        reClassStart = re.length;
        re += c;
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c;
          escaping = false;
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i);
          try {
            RegExp('[' + cs + ']');
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
            hasMagic = hasMagic || sp[1];
            inClass = false;
            continue
          }
        }

        // finish up the class.
        hasMagic = true;
        inClass = false;
        re += c;
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar();

        if (escaping) {
          // no need
          escaping = false;
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\';
        }

        re += c;

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1);
    sp = this.parse(cs, SUBPARSE);
    re = re.substr(0, reClassStart) + '\\[' + sp[0];
    hasMagic = hasMagic || sp[1];
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length);
    this.debug('setting tail', re, pl);
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\';
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    });

    this.debug('tail=%j\n   %s', tail, tail, pl, re);
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type;

    hasMagic = true;
    re = re.slice(0, pl.reStart) + t + '\\(' + tail;
  }

  // handle trailing things that only matter at the very end.
  clearStateChar();
  if (escaping) {
    // trailing \\
    re += '\\\\';
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false;
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true;
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n];

    var nlBefore = re.slice(0, nl.reStart);
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
    var nlAfter = re.slice(nl.reEnd);

    nlLast += nlAfter;

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1;
    var cleanAfter = nlAfter;
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
    }
    nlAfter = cleanAfter;

    var dollar = '';
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$';
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
    re = newRe;
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re;
  }

  if (addPatternStart) {
    re = patternStart + re;
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : '';
  try {
    var regExp = new RegExp('^' + re + '$', flags);
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern;
  regExp._src = re;

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
};

Minimatch.prototype.makeRe = makeRe;
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set;

  if (!set.length) {
    this.regexp = false;
    return this.regexp
  }
  var options = this.options;

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot;
  var flags = options.nocase ? 'i' : '';

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|');

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$';

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$';

  try {
    this.regexp = new RegExp(re, flags);
  } catch (ex) {
    this.regexp = false;
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {};
  var mm = new Minimatch(pattern, options);
  list = list.filter(function (f) {
    return mm.match(f)
  });
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list
};

Minimatch.prototype.match = match;
function match (f, partial) {
  this.debug('match', f, this.pattern);
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options;

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/');
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit);
  this.debug(this.pattern, 'split', f);

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set;
  this.debug(this.pattern, 'set', set);

  // Find the basename of the path by looking for the last non-empty segment
  var filename;
  var i;
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i];
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i];
    var file = f;
    if (options.matchBase && pattern.length === 1) {
      file = [filename];
    }
    var hit = this.matchOne(file, pattern, partial);
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options;

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern });

  this.debug('matchOne', file.length, pattern.length);

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop');
    var p = pattern[pi];
    var f = file[fi];

    this.debug(pattern, p, f);

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f]);

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi;
      var pr = pi + 1;
      if (pr === pl) {
        this.debug('** at the end');
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr];

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee);
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr);
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue');
          fr++;
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit;
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase();
      } else {
        hit = f === p;
      }
      this.debug('string match', p, f, hit);
    } else {
      hit = f.match(p);
      this.debug('pattern match', p, f, hit);
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '');
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
};

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

var inherits_browser = createCommonjsModule(function (module) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}
});

var inherits = createCommonjsModule(function (module) {
try {
  var util = util$2__default;
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = inherits_browser;
}
});

var alphasort_1 = alphasort;
var alphasorti_1 = alphasorti;
var setopts_1 = setopts;
var ownProp_1 = ownProp;
var makeAbs_1 = makeAbs;
var finish_1 = finish;
var mark_1 = mark;
var isIgnored_1 = isIgnored;
var childrenIgnored_1 = childrenIgnored;

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}




var Minimatch$1 = minimatch_1.Minimatch;

function alphasorti (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}

function alphasort (a, b) {
  return a.localeCompare(b)
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || [];

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore];

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap);
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null;
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '');
    gmatcher = new Minimatch$1(gpattern, { dot: true });
  }

  return {
    matcher: new Minimatch$1(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {};

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern;
  }

  self.silent = !!options.silent;
  self.pattern = pattern;
  self.strict = options.strict !== false;
  self.realpath = !!options.realpath;
  self.realpathCache = options.realpathCache || Object.create(null);
  self.follow = !!options.follow;
  self.dot = !!options.dot;
  self.mark = !!options.mark;
  self.nodir = !!options.nodir;
  if (self.nodir)
    self.mark = true;
  self.sync = !!options.sync;
  self.nounique = !!options.nounique;
  self.nonull = !!options.nonull;
  self.nosort = !!options.nosort;
  self.nocase = !!options.nocase;
  self.stat = !!options.stat;
  self.noprocess = !!options.noprocess;
  self.absolute = !!options.absolute;

  self.maxLength = options.maxLength || Infinity;
  self.cache = options.cache || Object.create(null);
  self.statCache = options.statCache || Object.create(null);
  self.symlinks = options.symlinks || Object.create(null);

  setupIgnores(self, options);

  self.changedCwd = false;
  var cwd = process.cwd();
  if (!ownProp(options, "cwd"))
    self.cwd = cwd;
  else {
    self.cwd = path$1__default.resolve(options.cwd);
    self.changedCwd = self.cwd !== cwd;
  }

  self.root = options.root || path$1__default.resolve(self.cwd, "/");
  self.root = path$1__default.resolve(self.root);
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/");

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = path$1.isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
  self.nomount = !!options.nomount;

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true;
  options.nocomment = true;

  self.minimatch = new Minimatch$1(pattern, options);
  self.options = self.minimatch.options;
}

function finish (self) {
  var nou = self.nounique;
  var all = nou ? [] : Object.create(null);

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i];
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i];
        if (nou)
          all.push(literal);
        else
          all[literal] = true;
      }
    } else {
      // had matches
      var m = Object.keys(matches);
      if (nou)
        all.push.apply(all, m);
      else
        m.forEach(function (m) {
          all[m] = true;
        });
    }
  }

  if (!nou)
    all = Object.keys(all);

  if (!self.nosort)
    all = all.sort(self.nocase ? alphasorti : alphasort);

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i]);
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e));
        var c = self.cache[e] || self.cache[makeAbs(self, e)];
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c);
        return notDir
      });
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    });

  self.found = all;
}

function mark (self, p) {
  var abs = makeAbs(self, p);
  var c = self.cache[abs];
  var m = p;
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c);
    var slash = p.slice(-1) === '/';

    if (isDir && !slash)
      m += '/';
    else if (!isDir && slash)
      m = m.slice(0, -1);

    if (m !== p) {
      var mabs = makeAbs(self, m);
      self.statCache[mabs] = self.statCache[abs];
      self.cache[mabs] = self.cache[abs];
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f;
  if (f.charAt(0) === '/') {
    abs = path$1__default.join(self.root, f);
  } else if (path$1.isAbsolute(f) || f === '') {
    abs = f;
  } else if (self.changedCwd) {
    abs = path$1__default.resolve(self.cwd, f);
  } else {
    abs = path$1__default.resolve(f);
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/');

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}

var common = {
	alphasort: alphasort_1,
	alphasorti: alphasorti_1,
	setopts: setopts_1,
	ownProp: ownProp_1,
	makeAbs: makeAbs_1,
	finish: finish_1,
	mark: mark_1,
	isIgnored: isIgnored_1,
	childrenIgnored: childrenIgnored_1
};

var sync = globSync;
globSync.GlobSync = GlobSync;
var setopts$1 = common.setopts;
var ownProp$1 = common.ownProp;
var childrenIgnored$1 = common.childrenIgnored;
var isIgnored$1 = common.isIgnored;

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts$1(this, pattern, options);

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length;
  this.matches = new Array(n);
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false);
  }
  this._finish();
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync);
  if (this.realpath) {
    var self = this;
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null);
      for (var p in matchset) {
        try {
          p = self._makeAbs(p);
          var real = fs_realpath.realpathSync(p, self.realpathCache);
          set[real] = true;
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true;
          else
            throw er
        }
      }
    });
  }
  common.finish(this);
};


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync);

  // Get the first [n] parts of pattern that are all strings.
  var n = 0;
  while (typeof pattern[n] === 'string') {
    n ++;
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix;
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index);
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null;
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/');
      break
  }

  var remain = pattern.slice(n);

  // get the list of entries.
  var read;
  if (prefix === null)
    read = '.';
  else if (path$1.isAbsolute(prefix) || path$1.isAbsolute(pattern.join('/'))) {
    if (!prefix || !path$1.isAbsolute(prefix))
      prefix = '/' + prefix;
    read = prefix;
  } else
    read = prefix;

  var abs = this._makeAbs(read);

  //if ignored, skip processing
  if (childrenIgnored$1(this, read))
    return

  var isGlobStar = remain[0] === minimatch_1.GLOBSTAR;
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
};


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar);

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0];
  var negate = !!this.minimatch.negate;
  var rawGlob = pn._glob;
  var dotOk = this.dot || rawGlob.charAt(0) === '.';

  var matchedEntries = [];
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    if (e.charAt(0) !== '.' || dotOk) {
      var m;
      if (negate && !prefix) {
        m = !e.match(pn);
      } else {
        m = e.match(pn);
      }
      if (m)
        matchedEntries.push(e);
    }
  }

  var len = matchedEntries.length;
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null);

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i];
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e;
        else
          e = prefix + e;
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path$1__default.join(this.root, e);
      }
      this._emitMatch(index, e);
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift();
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i];
    var newPattern;
    if (prefix)
      newPattern = [prefix, e];
    else
      newPattern = [e];
    this._process(newPattern.concat(remain), index, inGlobStar);
  }
};


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored$1(this, e))
    return

  var abs = this._makeAbs(e);

  if (this.mark)
    e = this._mark(e);

  if (this.absolute) {
    e = abs;
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs];
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true;

  if (this.stat)
    this._stat(e);
};


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries;
  var lstat;
  try {
    lstat = fs$1.lstatSync(abs);
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink();
  this.symlinks[abs] = isSym;

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE';
  else
    entries = this._readdir(abs, false);

  return entries
};

GlobSync.prototype._readdir = function (abs, inGlobStar) {

  if (inGlobStar && !ownProp$1(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp$1(this.cache, abs)) {
    var c = this.cache[abs];
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, fs$1.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er);
    return null
  }
};

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i];
      if (abs === '/')
        e = abs + e;
      else
        e = abs + '/' + e;
      this.cache[e] = true;
    }
  }

  this.cache[abs] = entries;

  // mark and cache dir-ness
  return entries
};

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f);
      this.cache[abs] = 'FILE';
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd);
        error.path = this.cwd;
        error.code = er.code;
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false;
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false;
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er);
      break
  }
};

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar);

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1);
  var gspref = prefix ? [ prefix ] : [];
  var noGlobStar = gspref.concat(remainWithoutGlobStar);

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false);

  var len = entries.length;
  var isSym = this.symlinks[abs];

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i];
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar);
    this._process(instead, index, true);

    var below = gspref.concat(entries[i], remain);
    this._process(below, index, true);
  }
};

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix);

  if (!this.matches[index])
    this.matches[index] = Object.create(null);

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && path$1.isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix);
    if (prefix.charAt(0) === '/') {
      prefix = path$1__default.join(this.root, prefix);
    } else {
      prefix = path$1__default.resolve(this.root, prefix);
      if (trail)
        prefix += '/';
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/');

  // Mark this as a match
  this._emitMatch(index, prefix);
};

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f);
  var needDir = f.slice(-1) === '/';

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp$1(this.cache, abs)) {
    var c = this.cache[abs];

    if (Array.isArray(c))
      c = 'DIR';

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }
  var stat = this.statCache[abs];
  if (!stat) {
    var lstat;
    try {
      lstat = fs$1.lstatSync(abs);
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false;
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = fs$1.statSync(abs);
      } catch (er) {
        stat = lstat;
      }
    } else {
      stat = lstat;
    }
  }

  this.statCache[abs] = stat;

  var c = true;
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE';

  this.cache[abs] = this.cache[abs] || c;

  if (needDir && c === 'FILE')
    return false

  return c
};

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
};

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
};

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
var wrappy_1 = wrappy;
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    var ret = fn.apply(this, args);
    var cb = args[args.length-1];
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }
    return ret
  }
}

var once_1 = wrappy_1(once);
var strict = wrappy_1(onceStrict);

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  });

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  });
});

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  f.called = false;
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f
}
once_1.strict = strict;

var reqs = Object.create(null);


var inflight_1 = wrappy_1(inflight);

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb);
    return null
  } else {
    reqs[key] = [cb];
    return makeres(key)
  }
}

function makeres (key) {
  return once_1(function RES () {
    var cbs = reqs[key];
    var len = cbs.length;
    var args = slice(arguments);

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args);
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len);
        process.nextTick(function () {
          RES.apply(null, args);
        });
      } else {
        delete reqs[key];
      }
    }
  })
}

function slice (args) {
  var length = args.length;
  var array = [];

  for (var i = 0; i < length; i++) array[i] = args[i];
  return array
}

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

var glob_1 = glob;

var EE = events__default.EventEmitter;
var setopts$2 = common.setopts;
var ownProp$2 = common.ownProp;


var childrenIgnored$2 = common.childrenIgnored;
var isIgnored$2 = common.isIgnored;



function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {};
  if (!options) options = {};

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return sync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = sync;
var GlobSync$1 = glob.GlobSync = sync.GlobSync;

// old api surface
glob.glob = glob;

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_);
  options.noprocess = true;

  var g = new Glob(pattern, options);
  var set = g.minimatch.set;

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
};

glob.Glob = Glob;
inherits(Glob, EE);
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = null;
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync$1(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts$2(this, pattern, options);
  this._didRealPath = false;

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length;

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n);

  if (typeof cb === 'function') {
    cb = once_1(cb);
    this.on('error', cb);
    this.on('end', function (matches) {
      cb(null, matches);
    });
  }

  var self = this;
  this._processing = 0;

  this._emitQueue = [];
  this._processQueue = [];
  this.paused = false;

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true;
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done);
  }
  sync = false;

  function done () {
    --self._processing;
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish();
        });
      } else {
        self._finish();
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob);
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this);
  this.emit('end', this.found);
};

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true;

  var n = this.matches.length;
  if (n === 0)
    return this._finish()

  var self = this;
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next);

  function next () {
    if (--n === 0)
      self._finish();
  }
};

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index];
  if (!matchset)
    return cb()

  var found = Object.keys(matchset);
  var self = this;
  var n = found.length;

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null);
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p);
    fs_realpath.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true;
      else if (er.syscall === 'stat')
        set[p] = true;
      else
        self.emit('error', er); // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set;
        cb();
      }
    });
  });
};

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
};

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
};

Glob.prototype.abort = function () {
  this.aborted = true;
  this.emit('abort');
};

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true;
    this.emit('pause');
  }
};

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume');
    this.paused = false;
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0);
      this._emitQueue.length = 0;
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i];
        this._emitMatch(e[0], e[1]);
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0);
      this._processQueue.length = 0;
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i];
        this._processing--;
        this._process(p[0], p[1], p[2], p[3]);
      }
    }
  }
};

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob);
  assert(typeof cb === 'function');

  if (this.aborted)
    return

  this._processing++;
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb]);
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0;
  while (typeof pattern[n] === 'string') {
    n ++;
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix;
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb);
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null;
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/');
      break
  }

  var remain = pattern.slice(n);

  // get the list of entries.
  var read;
  if (prefix === null)
    read = '.';
  else if (path$1.isAbsolute(prefix) || path$1.isAbsolute(pattern.join('/'))) {
    if (!prefix || !path$1.isAbsolute(prefix))
      prefix = '/' + prefix;
    read = prefix;
  } else
    read = prefix;

  var abs = this._makeAbs(read);

  //if ignored, skip _processing
  if (childrenIgnored$2(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch_1.GLOBSTAR;
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
};

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this;
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  });
};

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0];
  var negate = !!this.minimatch.negate;
  var rawGlob = pn._glob;
  var dotOk = this.dot || rawGlob.charAt(0) === '.';

  var matchedEntries = [];
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    if (e.charAt(0) !== '.' || dotOk) {
      var m;
      if (negate && !prefix) {
        m = !e.match(pn);
      } else {
        m = e.match(pn);
      }
      if (m)
        matchedEntries.push(e);
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length;
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null);

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i];
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e;
        else
          e = prefix + e;
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path$1__default.join(this.root, e);
      }
      this._emitMatch(index, e);
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift();
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i];
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e;
      else
        e = prefix + e;
    }
    this._process([e].concat(remain), index, inGlobStar, cb);
  }
  cb();
};

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored$2(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e]);
    return
  }

  var abs = path$1.isAbsolute(e) ? e : this._makeAbs(e);

  if (this.mark)
    e = this._mark(e);

  if (this.absolute)
    e = abs;

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs];
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true;

  var st = this.statCache[abs];
  if (st)
    this.emit('stat', e, st);

  this.emit('match', e);
};

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs;
  var self = this;
  var lstatcb = inflight_1(lstatkey, lstatcb_);

  if (lstatcb)
    fs$1.lstat(abs, lstatcb);

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink();
    self.symlinks[abs] = isSym;

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE';
      cb();
    } else
      self._readdir(abs, false, cb);
  }
};

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight_1('readdir\0'+abs+'\0'+inGlobStar, cb);
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp$2(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp$2(this.cache, abs)) {
    var c = this.cache[abs];
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }
  fs$1.readdir(abs, readdirCb(this, abs, cb));
};

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb);
    else
      self._readdirEntries(abs, entries, cb);
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i];
      if (abs === '/')
        e = abs + e;
      else
        e = abs + '/' + e;
      this.cache[e] = true;
    }
  }

  this.cache[abs] = entries;
  return cb(null, entries)
};

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f);
      this.cache[abs] = 'FILE';
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd);
        error.path = this.cwd;
        error.code = er.code;
        this.emit('error', error);
        this.abort();
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false;
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false;
      if (this.strict) {
        this.emit('error', er);
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort();
      }
      if (!this.silent)
        console.error('glob error', er);
      break
  }

  return cb()
};

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this;
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
  });
};


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1);
  var gspref = prefix ? [ prefix ] : [];
  var noGlobStar = gspref.concat(remainWithoutGlobStar);

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb);

  var isSym = this.symlinks[abs];
  var len = entries.length;

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i];
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar);
    this._process(instead, index, true, cb);

    var below = gspref.concat(entries[i], remain);
    this._process(below, index, true, cb);
  }

  cb();
};

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this;
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb);
  });
};
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null);

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && path$1.isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix);
    if (prefix.charAt(0) === '/') {
      prefix = path$1__default.join(this.root, prefix);
    } else {
      prefix = path$1__default.resolve(this.root, prefix);
      if (trail)
        prefix += '/';
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/');

  // Mark this as a match
  this._emitMatch(index, prefix);
  cb();
};

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f);
  var needDir = f.slice(-1) === '/';

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp$2(this.cache, abs)) {
    var c = this.cache[abs];

    if (Array.isArray(c))
      c = 'DIR';

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }
  var stat = this.statCache[abs];
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE';
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this;
  var statcb = inflight_1('stat\0' + abs, lstatcb_);
  if (statcb)
    fs$1.lstat(abs, statcb);

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return fs$1.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb);
        else
          self._stat2(f, abs, er, stat, cb);
      })
    } else {
      self._stat2(f, abs, er, lstat, cb);
    }
  }
};

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false;
    return cb()
  }

  var needDir = f.slice(-1) === '/';
  this.statCache[abs] = stat;

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true;
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE';
  this.cache[abs] = this.cache[abs] || c;

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
};

async function nodeCopyTasks(copyTasks, srcDir) {
    const results = {
        diagnostics: [],
        dirPaths: [],
        filePaths: [],
    };
    try {
        copyTasks = flatOne(await Promise.all(copyTasks.map(task => processGlobs(task, srcDir))));
        copyTasks = unique(copyTasks, task => task.dest);
        const allCopyTasks = [];
        // figure out all the file copy tasks we'll have
        // by digging down through any directory copy tasks
        while (copyTasks.length > 0) {
            const tasks = copyTasks.splice(0, 100);
            await Promise.all(tasks.map(copyTask => processCopyTask(results, allCopyTasks, copyTask)));
        }
        // figure out which directories we'll need to make first
        const mkDirs = ensureDirs(allCopyTasks);
        try {
            await Promise.all(mkDirs.map(dir => mkdir(dir, { recursive: true })));
        }
        catch (mkDirErr) { }
        while (allCopyTasks.length > 0) {
            const tasks = allCopyTasks.splice(0, 100);
            await Promise.all(tasks.map(copyTask => copyFile(copyTask.src, copyTask.dest)));
        }
    }
    catch (e) {
        catchError(results.diagnostics, e);
    }
    return results;
}
async function processGlobs(copyTask, srcDir) {
    return isGlob(copyTask.src)
        ? await processGlobTask(copyTask, srcDir)
        : [
            {
                src: getSrcAbsPath(srcDir, copyTask.src),
                dest: copyTask.keepDirStructure ? path$1__default.join(copyTask.dest, copyTask.src) : copyTask.dest,
                warn: copyTask.warn,
                keepDirStructure: copyTask.keepDirStructure,
            },
        ];
}
function getSrcAbsPath(srcDir, src) {
    if (path$1__default.isAbsolute(src)) {
        return src;
    }
    return path$1__default.join(srcDir, src);
}
async function processGlobTask(copyTask, srcDir) {
    const files = await asyncGlob(copyTask.src, {
        cwd: srcDir,
        nodir: true,
    });
    return files.map(globRelPath => createGlobCopyTask(copyTask, srcDir, globRelPath));
}
function createGlobCopyTask(copyTask, srcDir, globRelPath) {
    const dest = path$1__default.join(copyTask.dest, copyTask.keepDirStructure ? globRelPath : path$1__default.basename(globRelPath));
    return {
        src: path$1__default.join(srcDir, globRelPath),
        dest,
        warn: copyTask.warn,
        keepDirStructure: copyTask.keepDirStructure,
    };
}
async function processCopyTask(results, allCopyTasks, copyTask) {
    try {
        copyTask.src = normalizePath(copyTask.src);
        copyTask.dest = normalizePath(copyTask.dest);
        // get the stats for this src to see if it's a directory or not
        const stats = await stat(copyTask.src);
        if (stats.isDirectory()) {
            // still a directory, keep diggin down
            if (!results.dirPaths.includes(copyTask.dest)) {
                results.dirPaths.push(copyTask.dest);
            }
            await processCopyTaskDirectory(results, allCopyTasks, copyTask);
        }
        else if (!shouldIgnore(copyTask.src)) {
            // this is a file we should copy
            if (!results.filePaths.includes(copyTask.dest)) {
                results.filePaths.push(copyTask.dest);
            }
            allCopyTasks.push(copyTask);
        }
    }
    catch (e) {
        if (copyTask.warn !== false) {
            const err = buildError(results.diagnostics);
            err.messageText = e.message;
        }
    }
}
async function processCopyTaskDirectory(results, allCopyTasks, copyTask) {
    try {
        const dirItems = await readdir(copyTask.src);
        await Promise.all(dirItems.map(async (dirItem) => {
            const subCopyTask = {
                src: path$1__default.join(copyTask.src, dirItem),
                dest: path$1__default.join(copyTask.dest, dirItem),
                warn: copyTask.warn,
            };
            await processCopyTask(results, allCopyTasks, subCopyTask);
        }));
    }
    catch (e) {
        catchError(results.diagnostics, e);
    }
}
function ensureDirs(copyTasks) {
    const mkDirs = [];
    copyTasks.forEach(copyTask => {
        addMkDir(mkDirs, path$1__default.dirname(copyTask.dest));
    });
    mkDirs.sort((a, b) => {
        const partsA = a.split('/').length;
        const partsB = b.split('/').length;
        if (partsA < partsB)
            return -1;
        if (partsA > partsB)
            return 1;
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    });
    return mkDirs;
}
function addMkDir(mkDirs, destDir) {
    destDir = normalizePath(destDir);
    if (destDir === ROOT_DIR || destDir + '/' === ROOT_DIR || destDir === '') {
        return;
    }
    if (!mkDirs.includes(destDir)) {
        mkDirs.push(destDir);
    }
}
const ROOT_DIR = normalizePath(path$1__default.resolve('/'));
function shouldIgnore(filePath) {
    filePath = filePath.trim().toLowerCase();
    return IGNORE.some(ignoreFile => filePath.endsWith(ignoreFile));
}
const IGNORE = ['.ds_store', '.gitignore', 'desktop.ini', 'thumbs.db'];
function asyncGlob(pattern, opts) {
    return new Promise((resolve, reject) => {
        glob_1(pattern, opts, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(files);
            }
        });
    });
}

var fn = new Intl.Collator(0, { numeric:1 }).compare;

function semiver (a, b, bool) {
	a = a.split('.');
	b = b.split('.');

	return fn(a[0], b[0]) || fn(a[1], b[1]) || (
		b[2] = b.slice(2).join('.'),
		bool = /[.-]/.test(a[2] = a.slice(2).join('.')),
		bool == /[.-]/.test(b[2]) ? fn(a[2], b[2]) : bool ? -1 : 1
	);
}

class NodeLazyRequire {
    constructor(nodeResolveModule, lazyDependencies) {
        this.nodeResolveModule = nodeResolveModule;
        this.lazyDependencies = lazyDependencies;
        this.moduleData = new Map();
    }
    async ensure(logger, fromDir, ensureModuleIds) {
        const depsToInstall = [];
        let isUpdate = false;
        const promises = ensureModuleIds.map(async (ensureModuleId) => {
            const existingModuleData = this.moduleData.get(ensureModuleId);
            if (existingModuleData && existingModuleData.fromDir && existingModuleData.modulePath) {
                return;
            }
            const [minVersion, maxVersion] = this.lazyDependencies[ensureModuleId];
            try {
                const resolvedPkgJsonPath = this.nodeResolveModule.resolveModule(fromDir, ensureModuleId);
                const installedPkgJson = await readPackageJson(resolvedPkgJsonPath);
                isUpdate = true;
                if (semiver(installedPkgJson.version, minVersion) >= 0) {
                    this.moduleData.set(ensureModuleId, {
                        fromDir: fromDir,
                        modulePath: path$1.dirname(resolvedPkgJsonPath),
                    });
                    return;
                }
            }
            catch (e) { }
            depsToInstall.push({
                moduleId: ensureModuleId,
                requiredVersionRange: maxVersion,
            });
        });
        await Promise.all(promises);
        if (depsToInstall.length === 0) {
            return Promise.resolve();
        }
        const msg = `Please wait while required dependencies are ${isUpdate ? `updated` : `installed`}. This may take a few moments and will only be required for the initial run.`;
        logger.info(logger.magenta(msg));
        const moduleIds = depsToInstall.map(dep => dep.moduleId);
        const timeSpan = logger.createTimeSpan(`installing dependenc${moduleIds.length > 1 ? 'ies' : 'y'}: ${moduleIds.join(', ')}`);
        try {
            const installModules = depsToInstall.map(dep => {
                let moduleId = dep.moduleId;
                if (dep.requiredVersionRange) {
                    moduleId += '@' + dep.requiredVersionRange;
                }
                return moduleId;
            });
            await npmInstall(logger, fromDir, installModules);
            depsToInstall.forEach(installedDep => {
                this.moduleData.set(installedDep.moduleId, {
                    fromDir: fromDir,
                    modulePath: null,
                });
            });
            timeSpan.finish(`installing dependencies finished`);
        }
        catch (e) {
            logger.error(`lazy require failed: ${e}`);
        }
    }
    require(moduleId) {
        const moduleData = this.moduleData.get(moduleId);
        if (!moduleData) {
            throw new Error(`lazy required module has not been ensured: ${moduleId}`);
        }
        if (!moduleData.modulePath) {
            const modulePkgJsonPath = this.nodeResolveModule.resolveModule(moduleData.fromDir, moduleId);
            moduleData.modulePath = path$1.dirname(modulePkgJsonPath);
            this.moduleData.set(moduleId, moduleData);
        }
        return require(moduleData.modulePath);
    }
    getModulePath(moduleId) {
        const moduleData = this.moduleData.get(moduleId);
        if (!moduleData) {
            throw new Error(`lazy required module has not been ensured: ${moduleId}`);
        }
        if (!moduleData.modulePath) {
            const modulePkgJsonPath = this.nodeResolveModule.resolveModule(moduleData.fromDir, moduleId);
            moduleData.modulePath = path$1.dirname(modulePkgJsonPath);
            this.moduleData.set(moduleId, moduleData);
        }
        return moduleData.modulePath;
    }
}
function npmInstall(logger, fromDir, moduleIds) {
    return new Promise((resolve, reject) => {
        const cmd = 'npm';
        const args = ['install', ...moduleIds, '--no-audit', '--save-exact', '--save-dev'];
        const opts = {
            shell: true,
            cwd: fromDir,
            env: Object.assign({}, process.env),
        };
        opts.env.NODE_ENV = 'development';
        if (logger.level === 'debug') {
            args.push('--verbose');
        }
        logger.debug(`${cmd} ${args.join(' ')}`);
        logger.debug(`${cmd}, cwd: ${fromDir}`);
        const childProcess = cp.spawn(cmd, args, opts);
        let output = '';
        if (childProcess.stdout) {
            childProcess.stdout.setEncoding('utf8');
            childProcess.stdout.on('data', data => {
                output += data;
            });
        }
        if (childProcess.stderr) {
            childProcess.stderr.setEncoding('utf8');
            childProcess.stderr.on('data', data => {
                output += data;
            });
        }
        childProcess.once('exit', exitCode => {
            if (logger.level === 'debug') {
                logger.debug(`${cmd}, exit ${exitCode}`);
            }
            if (exitCode === 0) {
                resolve();
            }
            else {
                reject(`failed to install: ${moduleIds.join(', ')}${output ? ', ' + output : ''}`);
            }
        });
    });
}
function readPackageJson(pkgJsonPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(pkgJsonPath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                try {
                    resolve(JSON.parse(data));
                }
                catch (e) {
                    reject(e);
                }
            }
        });
    });
}

class NodeResolveModule {
    constructor() {
        this.resolveModuleCache = new Map();
    }
    resolveModule(fromDir, moduleId, opts) {
        const cacheKey = `${fromDir}:${moduleId}`;
        const cachedPath = this.resolveModuleCache.get(cacheKey);
        if (cachedPath) {
            return cachedPath;
        }
        if (opts && opts.manuallyResolve) {
            return this.resolveModuleManually(fromDir, moduleId, cacheKey);
        }
        if (moduleId.startsWith('@types/')) {
            return this.resolveTypesModule(fromDir, moduleId, cacheKey);
        }
        const Module = require('module');
        fromDir = path$1__default.resolve(fromDir);
        const fromFile = path$1__default.join(fromDir, 'noop.js');
        let dir = normalizePath(Module._resolveFilename(moduleId, {
            id: fromFile,
            filename: fromFile,
            paths: Module._nodeModulePaths(fromDir),
        }));
        const root = normalizePath(path$1__default.parse(fromDir).root);
        let packageJsonFilePath;
        while (dir !== root) {
            dir = normalizePath(path$1__default.dirname(dir));
            packageJsonFilePath = path$1__default.join(dir, 'package.json');
            if (!fs__default.existsSync(packageJsonFilePath)) {
                continue;
            }
            this.resolveModuleCache.set(cacheKey, packageJsonFilePath);
            return packageJsonFilePath;
        }
        throw new Error(`error loading "${moduleId}" from "${fromDir}"`);
    }
    resolveTypesModule(fromDir, moduleId, cacheKey) {
        const moduleSplt = moduleId.split('/');
        const root = normalizePath(path$1__default.parse(fromDir).root);
        let dir = normalizePath(path$1__default.join(fromDir, 'noop.js'));
        let typesPackageJsonFilePath;
        while (dir !== root) {
            dir = normalizePath(path$1__default.dirname(dir));
            typesPackageJsonFilePath = path$1__default.join(dir, 'node_modules', moduleSplt[0], moduleSplt[1], 'package.json');
            if (!fs__default.existsSync(typesPackageJsonFilePath)) {
                continue;
            }
            this.resolveModuleCache.set(cacheKey, typesPackageJsonFilePath);
            return typesPackageJsonFilePath;
        }
        throw new Error(`error loading "${moduleId}" from "${fromDir}"`);
    }
    resolveModuleManually(fromDir, moduleId, cacheKey) {
        const root = normalizePath(path$1__default.parse(fromDir).root);
        let dir = normalizePath(path$1__default.join(fromDir, 'noop.js'));
        let packageJsonFilePath;
        while (dir !== root) {
            dir = normalizePath(path$1__default.dirname(dir));
            packageJsonFilePath = path$1__default.join(dir, 'node_modules', moduleId, 'package.json');
            if (!fs__default.existsSync(packageJsonFilePath)) {
                continue;
            }
            this.resolveModuleCache.set(cacheKey, packageJsonFilePath);
            return packageJsonFilePath;
        }
        throw new Error(`error loading "${moduleId}" from "${fromDir}"`);
    }
}

function createNodeSys(prcs) {
    const destroys = new Set();
    const sys = {
        access(p) {
            return new Promise(resolve => {
                fs__default.access(p, err => {
                    const hasAccess = !err;
                    resolve(hasAccess);
                });
            });
        },
        accessSync(p) {
            let hasAccess = false;
            try {
                fs__default.accessSync(p);
                hasAccess = true;
            }
            catch (e) { }
            return hasAccess;
        },
        addDestory(cb) {
            destroys.add(cb);
        },
        removeDestory(cb) {
            destroys.delete(cb);
        },
        copyFile(src, dst) {
            return new Promise(resolve => {
                fs__default.copyFile(src, dst, err => {
                    resolve(!err);
                });
            });
        },
        async destroy() {
            const waits = [];
            destroys.forEach(cb => {
                try {
                    const rtn = cb();
                    if (rtn && rtn.then) {
                        waits.push(rtn);
                    }
                }
                catch (e) {
                    console.error(`node sys destroy: ${e}`);
                }
            });
            await Promise.all(waits);
            destroys.clear();
        },
        encodeToBase64(str) {
            return Buffer.from(str).toString('base64');
        },
        getCurrentDirectory() {
            return normalizePath(prcs.cwd());
        },
        glob: asyncGlob,
        isSymbolicLink: (p) => new Promise(resolve => {
            try {
                fs__default.lstat(p, (err, stats) => {
                    if (err) {
                        resolve(false);
                    }
                    else {
                        resolve(stats.isSymbolicLink());
                    }
                });
            }
            catch (e) {
                resolve(false);
            }
        }),
        getCompilerExecutingPath: null,
        normalizePath,
        mkdir(p, opts) {
            return new Promise(resolve => {
                if (opts) {
                    fs__default.mkdir(p, opts, err => {
                        resolve({
                            basename: path$1__default.basename(p),
                            dirname: path$1__default.dirname(p),
                            path: p,
                            newDirs: [],
                            error: err,
                        });
                    });
                }
                else {
                    fs__default.mkdir(p, err => {
                        resolve({
                            basename: path$1__default.basename(p),
                            dirname: path$1__default.dirname(p),
                            path: p,
                            newDirs: [],
                            error: err,
                        });
                    });
                }
            });
        },
        mkdirSync(p, opts) {
            const results = {
                basename: path$1__default.basename(p),
                dirname: path$1__default.dirname(p),
                path: p,
                newDirs: [],
                error: null,
            };
            try {
                fs__default.mkdirSync(p, opts);
            }
            catch (e) {
                results.error = e;
            }
            return results;
        },
        readdir(p) {
            return new Promise(resolve => {
                fs__default.readdir(p, (err, files) => {
                    if (err) {
                        resolve([]);
                    }
                    else {
                        resolve(files.map(f => {
                            return normalizePath(path$1__default.join(p, f));
                        }));
                    }
                });
            });
        },
        readdirSync(p) {
            try {
                return fs__default.readdirSync(p).map(f => {
                    return normalizePath(path$1__default.join(p, f));
                });
            }
            catch (e) { }
            return [];
        },
        readFile(p) {
            return new Promise(resolve => {
                fs__default.readFile(p, 'utf8', (_, data) => {
                    resolve(data);
                });
            });
        },
        readFileSync(p) {
            try {
                return fs__default.readFileSync(p, 'utf8');
            }
            catch (e) { }
            return undefined;
        },
        realpath(p) {
            return new Promise(resolve => {
                fs__default.realpath(p, 'utf8', (_, data) => {
                    resolve(data);
                });
            });
        },
        realpathSync(p) {
            try {
                return fs__default.realpathSync(p, 'utf8');
            }
            catch (e) { }
            return undefined;
        },
        rename(oldPath, newPath) {
            return new Promise(resolve => {
                fs__default.rename(oldPath, newPath, error => {
                    resolve({ oldPath, newPath, error, oldDirs: [], oldFiles: [], newDirs: [], newFiles: [], renamed: [], isFile: false, isDirectory: false });
                });
            });
        },
        resolvePath(p) {
            return normalizePath(p);
        },
        rmdir(p, opts) {
            return new Promise(resolve => {
                const recursive = !!(opts && opts.recursive);
                if (recursive) {
                    fs__default.rmdir(p, { recursive: true }, err => {
                        resolve({ basename: path$1__default.basename(p), dirname: path$1__default.dirname(p), path: p, removedDirs: [], removedFiles: [], error: err });
                    });
                }
                else {
                    fs__default.rmdir(p, err => {
                        resolve({ basename: path$1__default.basename(p), dirname: path$1__default.dirname(p), path: p, removedDirs: [], removedFiles: [], error: err });
                    });
                }
            });
        },
        rmdirSync(p, opts) {
            try {
                const recursive = !!(opts && opts.recursive);
                if (recursive) {
                    fs__default.rmdirSync(p, { recursive: true });
                }
                else {
                    fs__default.rmdirSync(p);
                }
                return { basename: path$1__default.basename(p), dirname: path$1__default.dirname(p), path: p, removedDirs: [], removedFiles: [], error: null };
            }
            catch (e) {
                return { basename: path$1__default.basename(p), dirname: path$1__default.dirname(p), path: p, removedDirs: [], removedFiles: [], error: e };
            }
        },
        stat(p) {
            return new Promise(resolve => {
                fs__default.stat(p, (err, s) => {
                    if (err) {
                        resolve(undefined);
                    }
                    else {
                        resolve(s);
                    }
                });
            });
        },
        statSync(p) {
            try {
                return fs__default.statSync(p);
            }
            catch (e) { }
            return undefined;
        },
        unlink(p) {
            return new Promise(resolve => {
                fs__default.unlink(p, err => {
                    resolve({
                        basename: path$1__default.basename(p),
                        dirname: path$1__default.dirname(p),
                        path: p,
                        error: err,
                    });
                });
            });
        },
        unlinkSync(p) {
            const results = {
                basename: path$1__default.basename(p),
                dirname: path$1__default.dirname(p),
                path: p,
                error: null,
            };
            try {
                fs__default.unlinkSync(p);
            }
            catch (e) {
                results.error = e;
            }
            return results;
        },
        writeFile(p, content) {
            return new Promise(resolve => {
                fs__default.writeFile(p, content, err => {
                    resolve({ path: p, error: err });
                });
            });
        },
        writeFileSync(p, content) {
            const results = {
                path: p,
                error: null,
            };
            try {
                fs__default.writeFileSync(p, content);
            }
            catch (e) {
                results.error = e;
            }
            return results;
        },
        generateContentHash(content, length) {
            let hash = crypto.createHash('sha1').update(content).digest('hex').toLowerCase();
            if (typeof length === 'number') {
                hash = hash.substr(0, length);
            }
            return Promise.resolve(hash);
        },
        copy: nodeCopyTasks,
        details: getDetails(),
    };
    const nodeResolve = new NodeResolveModule();
    sys.lazyRequire = new NodeLazyRequire(nodeResolve, {
        '@types/jest': ['24.9.1', '24.9.1'],
        '@types/puppeteer': ['1.19.0', '2.0.1'],
        'jest': ['24.9.0', '26.0.1'],
        'jest-cli': ['24.9.0', '26.0.1'],
        'pixelmatch': ['4.0.2', '4.0.2'],
        'puppeteer': ['1.19.0', '2.1.1'],
        'puppeteer-core': ['1.19.0', '2.1.1'],
        'workbox-build': ['4.3.1', '4.3.1'],
    });
    return sys;
}
const getDetails = () => {
    const details = {
        cpuModel: '',
        cpus: -1,
        freemem() {
            return os.freemem();
        },
        platform: '',
        release: '',
        runtime: 'node',
        runtimeVersion: '',
        tmpDir: os.tmpdir(),
        totalmem: -1,
    };
    try {
        const sysCpus = os.cpus();
        details.cpuModel = sysCpus[0].model;
        details.cpus = sysCpus.length;
        details.platform = os.platform();
        details.release = os.release();
        details.runtimeVersion = process.version;
        details.totalmem = os.totalmem();
    }
    catch (e) { }
    return details;
};

function createNodeSysWithWatch(prcs) {
    const ts = require('typescript');
    const sys = createNodeSys(prcs);
    const tsWatchFile = ts.sys.watchFile;
    const tsWatchDirectory = ts.sys.watchDirectory;
    sys.watchTimeout = 80;
    sys.events = buildEvents();
    sys.watchDirectory = (p, callback, recursive) => {
        const tsFileWatcher = tsWatchDirectory(p, fileName => {
            fileName = normalizePath(fileName);
            callback(fileName, null);
        }, recursive);
        const close = () => {
            tsFileWatcher.close();
        };
        sys.addDestory(close);
        return {
            close() {
                sys.removeDestory(close);
                tsFileWatcher.close();
            },
        };
    };
    sys.watchFile = (p, callback) => {
        const tsFileWatcher = tsWatchFile(p, (fileName, tsEventKind) => {
            fileName = normalizePath(fileName);
            if (tsEventKind === ts.FileWatcherEventKind.Created) {
                callback(fileName, 'fileAdd');
                sys.events.emit('fileAdd', fileName);
            }
            else if (tsEventKind === ts.FileWatcherEventKind.Changed) {
                callback(fileName, 'fileUpdate');
                sys.events.emit('fileUpdate', fileName);
            }
            else if (tsEventKind === ts.FileWatcherEventKind.Deleted) {
                callback(fileName, 'fileDelete');
                sys.events.emit('fileDelete', fileName);
            }
        });
        const close = () => {
            tsFileWatcher.close();
        };
        sys.addDestory(close);
        return {
            close() {
                sys.removeDestory(close);
                tsFileWatcher.close();
            },
        };
    };
    return sys;
}

/*
 * exit
 * https://github.com/cowboy/node-exit
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

var exit = function exit(exitCode, streams) {
  if (!streams) { streams = [process.stdout, process.stderr]; }
  var drainCount = 0;
  // Actually exit if all streams are drained.
  function tryToExit() {
    if (drainCount === streams.length) {
      process.exit(exitCode);
    }
  }
  streams.forEach(function(stream) {
    // Count drained streams now, but monitor non-drained streams.
    if (stream.bufferSize === 0) {
      drainCount++;
    } else {
      stream.write('', 'utf-8', function() {
        drainCount++;
        tryToExit();
      });
    }
    // Prevent further writing.
    stream.write = function() {};
  });
  // If all streams were already drained, exit now.
  tryToExit();
  // In Windows, when run as a Node.js child process, a script utilizing
  // this library might just exit with a 0 exit code, regardless. This code,
  // despite the fact that it looks a bit crazy, appears to fix that.
  process.on('exit', function() {
    process.exit(exitCode);
  });
};

function parseFlags(args) {
    const flags = {
        task: null,
        args: [],
        knownArgs: [],
        unknownArgs: null,
    };
    // cmd line has more priority over npm scripts cmd
    flags.args = args.slice();
    if (flags.args.length > 0 && flags.args[0] && !flags.args[0].startsWith('-')) {
        flags.task = flags.args[0];
    }
    parseArgs(flags, flags.args, flags.knownArgs);
    const npmScriptCmdArgs = getNpmScriptArgs();
    parseArgs(flags, npmScriptCmdArgs, flags.knownArgs);
    npmScriptCmdArgs.forEach(npmArg => {
        if (!flags.args.includes(npmArg)) {
            flags.args.push(npmArg);
        }
    });
    if (flags.task != null) {
        const i = flags.args.indexOf(flags.task);
        if (i > -1) {
            flags.args.splice(i, 1);
        }
    }
    flags.unknownArgs = flags.args.filter((arg) => {
        return !flags.knownArgs.includes(arg);
    });
    return flags;
}
function parseArgs(flags, args, knownArgs) {
    ARG_OPTS.boolean.forEach(booleanName => {
        const alias = ARG_OPTS.alias[booleanName];
        const flagKey = configCase(booleanName);
        if (typeof flags[flagKey] !== 'boolean') {
            flags[flagKey] = null;
        }
        args.forEach(cmdArg => {
            if (cmdArg === `--${booleanName}`) {
                flags[flagKey] = true;
                knownArgs.push(cmdArg);
            }
            else if (cmdArg === `--${flagKey}`) {
                flags[flagKey] = true;
                knownArgs.push(cmdArg);
            }
            else if (cmdArg === `--no-${booleanName}`) {
                flags[flagKey] = false;
                knownArgs.push(cmdArg);
            }
            else if (cmdArg === `--no${dashToPascalCase(booleanName)}`) {
                flags[flagKey] = false;
                knownArgs.push(cmdArg);
            }
            else if (alias && cmdArg === `-${alias}`) {
                flags[flagKey] = true;
                knownArgs.push(cmdArg);
            }
        });
    });
    ARG_OPTS.string.forEach(stringName => {
        const alias = ARG_OPTS.alias[stringName];
        const flagKey = configCase(stringName);
        if (typeof flags[flagKey] !== 'string') {
            flags[flagKey] = null;
        }
        for (let i = 0; i < args.length; i++) {
            const cmdArg = args[i];
            if (cmdArg.startsWith(`--${stringName}=`)) {
                const values = cmdArg.split('=');
                values.shift();
                flags[flagKey] = values.join('=');
                knownArgs.push(cmdArg);
            }
            else if (cmdArg === `--${stringName}`) {
                flags[flagKey] = args[i + 1];
                knownArgs.push(cmdArg);
                knownArgs.push(args[i + 1]);
            }
            else if (cmdArg === `--${flagKey}`) {
                flags[flagKey] = args[i + 1];
                knownArgs.push(cmdArg);
                knownArgs.push(args[i + 1]);
            }
            else if (cmdArg.startsWith(`--${flagKey}=`)) {
                const values = cmdArg.split('=');
                values.shift();
                flags[flagKey] = values.join('=');
                knownArgs.push(cmdArg);
            }
            else if (alias) {
                if (cmdArg.startsWith(`-${alias}=`)) {
                    const values = cmdArg.split('=');
                    values.shift();
                    flags[flagKey] = values.join('=');
                    knownArgs.push(cmdArg);
                }
                else if (cmdArg === `-${alias}`) {
                    flags[flagKey] = args[i + 1];
                    knownArgs.push(args[i + 1]);
                }
            }
        }
    });
    ARG_OPTS.number.forEach(numberName => {
        const alias = ARG_OPTS.alias[numberName];
        const flagKey = configCase(numberName);
        if (typeof flags[flagKey] !== 'number') {
            flags[flagKey] = null;
        }
        for (let i = 0; i < args.length; i++) {
            const cmdArg = args[i];
            if (cmdArg.startsWith(`--${numberName}=`)) {
                const values = cmdArg.split('=');
                values.shift();
                flags[flagKey] = parseInt(values.join(''), 10);
                knownArgs.push(cmdArg);
            }
            else if (cmdArg === `--${numberName}`) {
                flags[flagKey] = parseInt(args[i + 1], 10);
                knownArgs.push(args[i + 1]);
            }
            else if (cmdArg.startsWith(`--${flagKey}=`)) {
                const values = cmdArg.split('=');
                values.shift();
                flags[flagKey] = parseInt(values.join(''), 10);
                knownArgs.push(cmdArg);
            }
            else if (cmdArg === `--${flagKey}`) {
                flags[flagKey] = parseInt(args[i + 1], 10);
                knownArgs.push(args[i + 1]);
            }
            else if (alias) {
                if (cmdArg.startsWith(`-${alias}=`)) {
                    const values = cmdArg.split('=');
                    values.shift();
                    flags[flagKey] = parseInt(values.join(''), 10);
                    knownArgs.push(cmdArg);
                }
                else if (cmdArg === `-${alias}`) {
                    flags[flagKey] = parseInt(args[i + 1], 10);
                    knownArgs.push(args[i + 1]);
                }
            }
        }
    });
}
const configCase = (prop) => {
    prop = dashToPascalCase(prop);
    return prop.charAt(0).toLowerCase() + prop.substr(1);
};
const ARG_OPTS = {
    boolean: [
        'build',
        'cache',
        'check-version',
        'ci',
        'compare',
        'debug',
        'dev',
        'devtools',
        'docs',
        'e2e',
        'es5',
        'esm',
        'headless',
        'help',
        'log',
        'open',
        'prerender',
        'prerender-external',
        'prod',
        'profile',
        'service-worker',
        'screenshot',
        'serve',
        'skip-node-check',
        'spec',
        'stats',
        'update-screenshot',
        'verbose',
        'version',
        'watch',
    ],
    number: ['max-workers', 'port'],
    string: ['address', 'config', 'docs-json', 'emulate', 'log-level', 'root', 'screenshot-connector'],
    alias: {
        config: 'c',
        help: 'h',
        port: 'p',
        version: 'v',
    },
};
function getNpmScriptArgs() {
    // process.env.npm_config_argv
    // {"remain":["4444"],"cooked":["run","serve","--port","4444"],"original":["run","serve","--port","4444"]}
    let args = [];
    try {
        if (typeof process !== 'undefined' && process.env) {
            const npmConfigArgs = process.env.npm_config_argv;
            if (npmConfigArgs) {
                args = JSON.parse(npmConfigArgs).original;
                if (args[0] === 'run') {
                    args = args.slice(2);
                }
            }
        }
    }
    catch (e) { }
    return args;
}

const REGISTRY_URL = `https://registry.npmjs.org/@stencil/core`;
const CHECK_INTERVAL = 1000 * 60 * 60 * 24 * 7;
async function taskVersion() {
    const { version } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/compiler/stencil'))); });
    console.log(version);
}
async function checkVersion(config, currentVersion) {
    if (config.devMode && !config.flags.ci) {
        try {
            const latestVersion = await getLatestCompilerVersion(config);
            if (latestVersion != null) {
                return () => {
                    if (semiver(currentVersion, latestVersion) < 0) {
                        printUpdateMessage(config.logger, currentVersion, latestVersion);
                    }
                    else {
                        console.debug(`${config.logger.cyan('@stencil/core')} version ${config.logger.green(currentVersion)} is the latest version`);
                    }
                };
            }
        }
        catch (e) {
            config.logger.debug(`unable to load latest compiler version: ${e}`);
        }
    }
    return noop;
}
async function getLatestCompilerVersion(config) {
    try {
        const lastCheck = await getLastCheck();
        if (lastCheck == null) {
            // we've never check before, so probably first install, so don't bother
            // save that we did just do a check though
            setLastCheck();
            return null;
        }
        if (!requiresCheck(Date.now(), lastCheck, CHECK_INTERVAL)) {
            // within the range that we did a check recently, so don't bother
            return null;
        }
        // remember we just did a check
        const setPromise = setLastCheck();
        const body = await requestUrl(REGISTRY_URL);
        const data = JSON.parse(body);
        await setPromise;
        return data['dist-tags'].latest;
    }
    catch (e) {
        // quietly catch, could have no network connection which is fine
        config.logger.debug(`getLatestCompilerVersion error: ${e}`);
    }
    return null;
}
async function requestUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, res => {
            if (res.statusCode > 299) {
                reject(`url: ${url}, staus: ${res.statusCode}`);
                return;
            }
            res.once('error', reject);
            const ret = [];
            res.once('end', () => {
                resolve(ret.join(''));
            });
            res.on('data', data => {
                ret.push(data);
            });
        });
        req.once('error', reject);
        req.end();
    });
}
function requiresCheck(now, lastCheck, checkInterval) {
    return lastCheck + checkInterval < now;
}
function getLastCheck() {
    return new Promise(resolve => {
        fs$1.readFile(getLastCheckStoragePath(), 'utf8', (err, data) => {
            if (err) {
                resolve(null);
            }
            else {
                try {
                    resolve(JSON.parse(data));
                }
                catch (e) {
                    resolve(null);
                }
            }
        });
    });
}
function setLastCheck() {
    return new Promise(resolve => {
        const now = JSON.stringify(Date.now());
        fs$1.writeFile(getLastCheckStoragePath(), now, () => {
            resolve();
        });
    });
}
function getLastCheckStoragePath() {
    return path$1__default.join(os__default.tmpdir(), 'stencil_last_version_check.json');
}
function printUpdateMessage(logger, currentVersion, latestVersion) {
    const msg = [`Update available: ${currentVersion} ${ARROW} ${latestVersion}`, `To get the latest, please run:`, NPM_INSTALL];
    const lineLength = msg[0].length;
    const o = [];
    let top = BOX_TOP_LEFT;
    while (top.length <= lineLength + PADDING * 2) {
        top += BOX_HORIZONTAL;
    }
    top += BOX_TOP_RIGHT;
    o.push(top);
    msg.forEach(m => {
        let line = BOX_VERTICAL;
        for (let i = 0; i < PADDING; i++) {
            line += ` `;
        }
        line += m;
        while (line.length <= lineLength + PADDING * 2) {
            line += ` `;
        }
        line += BOX_VERTICAL;
        o.push(line);
    });
    let bottom = BOX_BOTTOM_LEFT;
    while (bottom.length <= lineLength + PADDING * 2) {
        bottom += BOX_HORIZONTAL;
    }
    bottom += BOX_BOTTOM_RIGHT;
    o.push(bottom);
    let output = `\n${INDENT$1}${o.join(`\n${INDENT$1}`)}\n`;
    output = output.replace(currentVersion, logger.red(currentVersion));
    output = output.replace(latestVersion, logger.green(latestVersion));
    output = output.replace(NPM_INSTALL, logger.cyan(NPM_INSTALL));
    console.log(output);
}
const NPM_INSTALL = `npm install @stencil/core`;
const ARROW = `→`;
const BOX_TOP_LEFT = `╭`;
const BOX_TOP_RIGHT = `╮`;
const BOX_BOTTOM_LEFT = `╰`;
const BOX_BOTTOM_RIGHT = `╯`;
const BOX_VERTICAL = `│`;
const BOX_HORIZONTAL = `─`;
const PADDING = 2;
const INDENT$1 = `           `;

function crawlAnchorsForNextUrls(prerenderConfig, diagnostics, baseUrl, currentUrl, parsedAnchors) {
    if (!Array.isArray(parsedAnchors) || parsedAnchors.length === 0) {
        return [];
    }
    const basePathParts = baseUrl.pathname.split('/');
    // filterAnchor(): filter which anchors to actually crawl
    // normalizeUrl(): normalize href strings into URL objects
    // filterUrl(): filter which urls to actually crawl
    // normalizeHref(): normalize URL objects into href strings
    return parsedAnchors
        .filter(anchor => {
        // filter which anchors to actually crawl
        if (typeof prerenderConfig.filterAnchor === 'function') {
            // user filterAnchor()
            try {
                const userFilterAnchor = prerenderConfig.filterAnchor(anchor, currentUrl);
                if (userFilterAnchor === false) {
                    return false;
                }
            }
            catch (e) {
                // user filterAnchor() error
                catchError(diagnostics, e);
                return false;
            }
        }
        // standard filterAnchor()
        return standardFilterAnchor(diagnostics, anchor);
    })
        .map(anchor => {
        // normalize href strings into URL objects
        if (typeof prerenderConfig.normalizeUrl === 'function') {
            try {
                // user normalizeUrl()
                const userNormalizedUrl = prerenderConfig.normalizeUrl(anchor.href, currentUrl);
                // standard normalizeUrl(), after user normalized
                return standardNormalizeUrl(diagnostics, userNormalizedUrl.href, currentUrl);
            }
            catch (e) {
                // user normalizeUrl() error
                catchError(diagnostics, e);
            }
        }
        // standard normalizeUrl(), no user normalized
        return standardNormalizeUrl(diagnostics, anchor.href, currentUrl);
    })
        .filter(url => {
        // filter which urls to actually crawl
        if (typeof prerenderConfig.filterUrl === 'function') {
            // user filterUrl()
            try {
                const userFilterUrl = prerenderConfig.filterUrl(url, currentUrl);
                if (userFilterUrl === false) {
                    return false;
                }
            }
            catch (e) {
                // user filterUrl() error
                catchError(diagnostics, e);
                return false;
            }
        }
        // standard filterUrl()
        return standardFilterUrl(diagnostics, url, currentUrl, basePathParts);
    })
        .map(url => {
        // standard normalize href
        // normalize URL objects into href strings
        return standardNormalizeHref(prerenderConfig, diagnostics, url);
    })
        .reduce((hrefs, href) => {
        // remove any duplicate hrefs from the array
        if (!hrefs.includes(href)) {
            hrefs.push(href);
        }
        return hrefs;
    }, [])
        .sort((a, b) => {
        // sort the hrefs so the urls with the least amount
        // of directories are first, then by alphabetical
        const partsA = a.split('/').length;
        const partsB = b.split('/').length;
        if (partsA < partsB)
            return -1;
        if (partsA > partsB)
            return 1;
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    });
}
function standardFilterAnchor(diagnostics, attrs, _base) {
    try {
        let href = attrs.href;
        if (typeof attrs.download === 'string') {
            return false;
        }
        if (typeof href === 'string') {
            href = href.trim();
            if (href !== '' && !href.startsWith('#') && !href.startsWith('?')) {
                const target = attrs.target;
                if (typeof target === 'string' && attrs.target.trim().toLowerCase() !== '_self') {
                    return false;
                }
                return true;
            }
        }
    }
    catch (e) {
        catchError(diagnostics, e);
    }
    return false;
}
function standardNormalizeUrl(diagnostics, href, currentUrl) {
    if (typeof href === 'string') {
        try {
            const outputUrl = new URL(href, currentUrl.href);
            outputUrl.protocol = currentUrl.href;
            outputUrl.hash = '';
            outputUrl.search = '';
            const parts = outputUrl.pathname.split('/');
            const lastPart = parts[parts.length - 1];
            if (lastPart === 'index.html' || lastPart === 'index.htm') {
                parts.pop();
                outputUrl.pathname = parts.join('/');
            }
            return outputUrl;
        }
        catch (e) {
            catchError(diagnostics, e);
        }
    }
    return null;
}
function standardFilterUrl(diagnostics, url, currentUrl, basePathParts) {
    try {
        if (url.hostname != null && currentUrl.hostname != null && url.hostname !== currentUrl.hostname) {
            return false;
        }
        if (shouldSkipExtension(url.pathname)) {
            return false;
        }
        const inputPathParts = url.pathname.split('/');
        if (inputPathParts.length < basePathParts.length) {
            return false;
        }
        for (let i = 0; i < basePathParts.length; i++) {
            const basePathPart = basePathParts[i];
            const inputPathPart = inputPathParts[i];
            if (basePathParts.length - 1 === i && basePathPart === '') {
                break;
            }
            if (basePathPart !== inputPathPart) {
                return false;
            }
        }
        return true;
    }
    catch (e) {
        catchError(diagnostics, e);
    }
    return false;
}
function standardNormalizeHref(prerenderConfig, diagnostics, url) {
    try {
        if (url != null && typeof url.href === 'string') {
            let href = url.href.trim();
            if (prerenderConfig.trailingSlash) {
                // url should have a trailing slash
                if (!href.endsWith('/')) {
                    const parts = url.pathname.split('/');
                    const lastPart = parts[parts.length - 1];
                    if (!lastPart.includes('.')) {
                        // does not end with a slash and last part does not have a dot
                        href += '/';
                    }
                }
            }
            else {
                // url should NOT have a trailing slash
                if (href.endsWith('/') && url.pathname !== '/') {
                    // this has a trailing slash and it's not the root path
                    href = href.substr(0, href.length - 1);
                }
            }
            return href;
        }
    }
    catch (e) {
        catchError(diagnostics, e);
    }
    return null;
}
function shouldSkipExtension(filename) {
    return SKIP_EXT.has(extname(filename).toLowerCase());
}
function extname(str) {
    const parts = str.split('.');
    return parts[parts.length - 1].toLowerCase();
}
const SKIP_EXT = new Set(['zip', 'rar', 'tar', 'gz', 'bz2', 'png', 'jpeg', 'jpg', 'gif', 'pdf', 'tiff', 'psd']);

function getWriteFilePathFromUrlPath(manager, inputHref) {
    const baseUrl = new url.URL(manager.outputTarget.baseUrl, manager.devServerHostUrl);
    const basePathname = baseUrl.pathname.toLowerCase();
    const inputUrl = new url.URL(inputHref, manager.devServerHostUrl);
    const inputPathname = inputUrl.pathname.toLowerCase();
    const basePathParts = basePathname.split('/');
    const inputPathParts = inputPathname.split('/');
    const isPrerrenderRoot = basePathname === inputPathname;
    let fileName;
    if (isPrerrenderRoot) {
        fileName = path$1__default.basename(manager.outputTarget.indexHtml);
    }
    else {
        fileName = 'index.html';
    }
    const pathParts = [];
    for (let i = 0; i < inputPathParts.length; i++) {
        const basePathPart = basePathParts[i];
        const inputPathPart = inputPathParts[i];
        if (typeof basePathPart === 'string' && basePathPart === inputPathPart) {
            continue;
        }
        if (i === inputPathParts.length - 1) {
            const lastPart = inputPathParts[i].toLowerCase();
            if (lastPart.endsWith('.html') || lastPart.endsWith('.htm')) {
                fileName = inputPathParts[i];
                break;
            }
        }
        pathParts.push(inputPathPart);
    }
    pathParts.push(fileName);
    // figure out the directory where this file will be saved
    return path$1__default.join(manager.outputTarget.appDir, ...pathParts);
}

function initializePrerenderEntryUrls(manager, diagnostics) {
    const entryAnchors = [];
    if (Array.isArray(manager.prerenderConfig.entryUrls)) {
        for (const entryUrl of manager.prerenderConfig.entryUrls) {
            const entryAnchor = {
                href: entryUrl,
            };
            entryAnchors.push(entryAnchor);
        }
    }
    else {
        const entryAnchor = {
            href: manager.outputTarget.baseUrl,
        };
        entryAnchors.push(entryAnchor);
    }
    for (const entryAnchor of entryAnchors) {
        // ensure each entry url is valid
        // and has a domain
        try {
            new URL(entryAnchor.href, manager.outputTarget.baseUrl);
        }
        catch (e) {
            const diagnostic = buildError(diagnostics);
            diagnostic.header = `Invalid Prerender Entry Url: ${entryAnchor.href}`;
            diagnostic.messageText = `Entry Urls must include the protocol and domain of the site being prerendered.`;
            return;
        }
    }
    const base = new URL(manager.outputTarget.baseUrl);
    const hrefs = crawlAnchorsForNextUrls(manager.prerenderConfig, diagnostics, base, base, entryAnchors);
    for (const href of hrefs) {
        addUrlToPendingQueue(manager, href, '#entryUrl');
    }
}
function addUrlToPendingQueue(manager, queueUrl, fromUrl) {
    if (typeof queueUrl !== 'string' || queueUrl === '') {
        return;
    }
    if (manager.urlsPending.has(queueUrl)) {
        return;
    }
    if (manager.urlsProcessing.has(queueUrl)) {
        return;
    }
    if (manager.urlsCompleted.has(queueUrl)) {
        return;
    }
    manager.urlsPending.add(queueUrl);
    if (manager.isDebug) {
        const url = new URL(queueUrl, manager.outputTarget.baseUrl).pathname;
        const from = fromUrl.startsWith('#') ? fromUrl : new URL(fromUrl, manager.outputTarget.baseUrl).pathname;
        manager.config.logger.debug(`prerender queue: ${url} (from ${from})`);
    }
}
function drainPrerenderQueue(manager) {
    const nextUrl = manager.urlsPending.values().next();
    if (!nextUrl.done) {
        if (manager.urlsProcessing.size > manager.maxConcurrency) {
            // slow it down there buddy, too many at one time
            setTimeout(() => {
                drainPrerenderQueue(manager);
            });
        }
        else {
            const url = nextUrl.value;
            // looks like we're ready to prerender more
            // remove from pending
            manager.urlsPending.delete(url);
            // move to processing
            manager.urlsProcessing.add(url);
            // kick off async prerendering
            prerenderUrl(manager, url);
            // could be more ready for prerendering
            // let's check again after a tick
            manager.prcs.nextTick(() => {
                drainPrerenderQueue(manager);
            });
        }
    }
    if (manager.urlsProcessing.size === 0 && manager.urlsPending.size === 0) {
        if (typeof manager.resolve === 'function') {
            // we're not actively processing anything
            // and there aren't anymore urls in the queue to be prerendered
            // so looks like our job here is done, good work team
            manager.resolve();
            manager.resolve = null;
        }
    }
}
async function prerenderUrl(manager, url) {
    let previewUrl = url;
    try {
        previewUrl = new URL(url).pathname;
        let timespan;
        if (manager.isDebug) {
            timespan = manager.config.logger.createTimeSpan(`prerender start: ${previewUrl}`, true);
        }
        const prerenderRequest = {
            baseUrl: manager.outputTarget.baseUrl,
            componentGraphPath: manager.componentGraphPath,
            devServerHostUrl: manager.devServerHostUrl,
            hydrateAppFilePath: manager.hydrateAppFilePath,
            isDebug: manager.isDebug,
            prerenderConfigPath: manager.prerenderConfigPath,
            staticSite: manager.staticSite,
            templateId: manager.templateId,
            url: url,
            writeToFilePath: getWriteFilePathFromUrlPath(manager, url),
        };
        // prender this path and wait on the results
        const results = await manager.prerenderUrlWorker(prerenderRequest);
        if (manager.isDebug) {
            const filePath = path$1__default.relative(manager.config.rootDir, results.filePath);
            const hasError = results.diagnostics.some(d => d.level === 'error');
            if (hasError) {
                timespan.finish(`prerender failed: ${previewUrl}, ${filePath}`, 'red');
            }
            else {
                timespan.finish(`prerender finish: ${previewUrl}, ${filePath}`);
            }
        }
        manager.diagnostics.push(...results.diagnostics);
        if (Array.isArray(results.anchorUrls)) {
            for (const anchorUrl of results.anchorUrls) {
                addUrlToPendingQueue(manager, anchorUrl, url);
            }
        }
    }
    catch (e) {
        // darn, idk, bad news
        catchError(manager.diagnostics, e);
    }
    manager.urlsProcessing.delete(url);
    manager.urlsCompleted.add(url);
    const urlsCompletedSize = manager.urlsCompleted.size;
    if (manager.progressLogger && urlsCompletedSize > 1) {
        manager.progressLogger.update(`           prerendered ${urlsCompletedSize} urls: ${manager.config.logger.dim(previewUrl)}`);
    }
    // let's try to drain the queue again and let this
    // next call figure out if we're actually done or not
    manager.prcs.nextTick(() => {
        drainPrerenderQueue(manager);
    });
}

const writeFile = util$2.promisify(fs__default.writeFile);
async function generateSitemapXml(manager) {
    if (manager.prerenderConfig.sitemapXml === null) {
        // if it's set to null then let's not create a sitemap.xml file
        return null;
    }
    try {
        if (typeof manager.prerenderConfig.sitemapXml !== 'function') {
            // not set to null, but also no config.sitemapXml(), so let's make a default
            manager.prerenderConfig.sitemapXml = function sitemapXml(opts) {
                const content = [];
                content.push(`<?xml version="1.0" encoding="UTF-8"?>`);
                content.push(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);
                for (const url of opts.urls) {
                    content.push(` <url><loc>${url}</loc></url>`);
                }
                content.push(`</urlset>`);
                return content.join('\n');
            };
        }
        const opts = {
            urls: getSitemapUrls(manager),
            baseUrl: manager.outputTarget.baseUrl,
            dir: manager.outputTarget.appDir,
        };
        const userResults = manager.prerenderConfig.sitemapXml(opts);
        if (userResults == null) {
            return null;
        }
        const results = {
            content: null,
            filePath: null,
            url: null,
        };
        if (typeof userResults === 'string') {
            results.content = userResults;
        }
        else {
            results.content = userResults.content;
            results.filePath = userResults.filePath;
        }
        if (typeof results.content !== 'string') {
            return null;
        }
        if (typeof results.filePath !== 'string') {
            results.filePath = path$1__default.join(manager.outputTarget.appDir, `sitemap.xml`);
        }
        if (typeof results.url !== 'string') {
            const sitemapUrl = new url.URL(`sitemap.xml`, manager.outputTarget.baseUrl);
            results.url = sitemapUrl.href;
        }
        await writeFile(results.filePath, results.content);
        return results;
    }
    catch (e) {
        catchError(manager.diagnostics, e);
        return null;
    }
}
function getSitemapUrls(manager) {
    const urls = [];
    if (typeof manager.prerenderConfig.canonicalUrl === 'function') {
        // user provide a canonicalUrl() function
        // use that to normalize the urls for the sitemap.xml
        // if it returned null then don't add it to the sitemap
        for (const url$1 of manager.urlsCompleted) {
            const canonicalUrl = manager.prerenderConfig.canonicalUrl(new url.URL(url$1));
            if (typeof canonicalUrl === 'string' && canonicalUrl.trim() !== '') {
                urls.push(canonicalUrl);
            }
        }
    }
    else {
        for (const url of manager.urlsCompleted) {
            if (typeof url === 'string') {
                urls.push(url);
            }
        }
    }
    return urls.sort(sortUrls);
}
function sortUrls(a, b) {
    const partsA = a.split('/').length;
    const partsB = b.split('/').length;
    if (partsA < partsB)
        return -1;
    if (partsA > partsB)
        return 1;
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}

const writeFile$1 = util$2.promisify(fs__default.writeFile);
async function generateRobotsTxt(manager, sitemapResults) {
    if (manager.prerenderConfig.robotsTxt === null) {
        // if it's set to null then let's not create a robots.txt file
        return null;
    }
    try {
        if (typeof manager.prerenderConfig.robotsTxt !== 'function') {
            // not set to null, but also no config.robotsTxt(), so let's make a default
            manager.prerenderConfig.robotsTxt = function robotsTxt(opts) {
                const content = [`User-agent: *`, `Disallow:`];
                if (typeof opts.sitemapUrl === 'string') {
                    content.push(`Sitemap: ${opts.sitemapUrl}`);
                }
                return content.join('\n');
            };
        }
        const opts = {
            urls: getSitemapUrls(manager),
            baseUrl: manager.outputTarget.baseUrl,
            sitemapUrl: sitemapResults ? sitemapResults.url : null,
            dir: manager.outputTarget.dir,
        };
        const userResults = manager.prerenderConfig.robotsTxt(opts);
        if (userResults == null) {
            return null;
        }
        const results = {
            content: null,
            filePath: null,
            url: null,
        };
        if (typeof userResults === 'string') {
            results.content = userResults;
        }
        else {
            results.content = userResults.content;
            results.filePath = userResults.filePath;
        }
        if (typeof results.content !== 'string') {
            return null;
        }
        const lines = results.content.replace(/\r/g, '\n').split('\n');
        results.content = lines.map(l => l.trim()).join('\n');
        if (typeof results.filePath !== 'string') {
            results.filePath = path$1__default.join(manager.outputTarget.dir, `robots.txt`);
        }
        if (typeof results.url !== 'string') {
            const robotsTxtUrl = new url.URL(`/robots.txt`, manager.outputTarget.baseUrl);
            results.url = robotsTxtUrl.href;
        }
        await writeFile$1(results.filePath, results.content);
        return results;
    }
    catch (e) {
        catchError(manager.diagnostics, e);
        return null;
    }
}

const getAbsoluteBuildDir = (outputTarget) => {
    const relativeBuildDir = path$1.relative(outputTarget.dir, outputTarget.buildDir);
    return path$1.join('/', relativeBuildDir) + '/';
};

const readFile = util$2.promisify(fs$1.readFile);
async function inlineExternalStyleSheets(appDir, doc) {
    const documentLinks = Array.from(doc.querySelectorAll('link[rel=stylesheet]'));
    if (documentLinks.length === 0) {
        return;
    }
    const { optimizeCss } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/compiler/stencil'))); });
    await Promise.all(documentLinks.map(async (link) => {
        const href = link.getAttribute('href');
        if (!href.startsWith('/') || link.getAttribute('media') !== null) {
            return;
        }
        const fsPath = path$1__default.join(appDir, href);
        try {
            let styles = await readFile(fsPath, 'utf8');
            const optimizeResults = await optimizeCss({
                input: styles,
            });
            styles = optimizeResults.output;
            // insert inline <style>
            const inlinedStyles = doc.createElement('style');
            inlinedStyles.innerHTML = styles;
            link.parentNode.insertBefore(inlinedStyles, link);
            link.remove();
            // mark inlinedStyle as treeshakable
            inlinedStyles.setAttribute('data-styles', '');
            // since it's no longer a critical resource
            link.setAttribute('media', '(max-width: 0px)');
            link.setAttribute('importance', 'low');
            link.setAttribute('onload', `this.media=''`);
            // move <link rel="stylesheet"> to the end of <body>
            doc.body.appendChild(link);
        }
        catch (e) { }
    }));
}
async function minifyScriptElements(doc, addMinifiedAttr) {
    const scriptElms = Array.from(doc.querySelectorAll('script')).filter(scriptElm => {
        if (scriptElm.hasAttribute('src') || scriptElm.hasAttribute(dataMinifiedAttr)) {
            return false;
        }
        const scriptType = scriptElm.getAttribute('type');
        if (typeof scriptType === 'string' && scriptType !== 'module' && scriptType !== 'text/javascript') {
            return false;
        }
        return true;
    });
    if (scriptElms.length === 0) {
        return;
    }
    const { optimizeJs } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/compiler/stencil'))); });
    await Promise.all(scriptElms.map(async (scriptElm) => {
        const content = scriptElm.innerHTML.trim();
        if (content.length > 0) {
            const opts = {
                input: content,
                sourceMap: false,
                target: 'latest',
            };
            if (scriptElm.getAttribute('type') !== 'module') {
                opts.target = 'es5';
            }
            const optimizeResults = await optimizeJs(opts);
            if (optimizeResults.diagnostics.length === 0) {
                scriptElm.innerHTML = optimizeResults.output;
            }
            if (addMinifiedAttr) {
                scriptElm.setAttribute(dataMinifiedAttr, '');
            }
        }
    }));
}
async function minifyStyleElements(doc, addMinifiedAttr) {
    const styleElms = Array.from(doc.querySelectorAll('style')).filter(styleElm => {
        if (styleElm.hasAttribute(dataMinifiedAttr)) {
            return false;
        }
        return true;
    });
    if (styleElms.length === 0) {
        return;
    }
    const { optimizeCss } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/compiler/stencil'))); });
    await Promise.all(styleElms.map(async (styleElm) => {
        const content = styleElm.innerHTML.trim();
        if (content.length > 0) {
            const optimizeResults = await optimizeCss({
                input: content,
                minify: true,
            });
            if (optimizeResults.diagnostics.length === 0) {
                styleElm.innerHTML = optimizeResults.output;
            }
            if (addMinifiedAttr) {
                styleElm.setAttribute(dataMinifiedAttr, '');
            }
        }
    }));
}
const excludeComponentScript = `
(function(){
var s=document.querySelector('[data-stencil-namespace="__NAMESPACE__"]');
s&&((s['data-opts']=s['data-opts']||{}).exclude=__EXCLUDE__);
})();
`
    .replace(/\n/g, '')
    .trim();
function removeStencilScripts(doc) {
    const stencilScripts = doc.querySelectorAll('script[data-stencil]');
    for (let i = stencilScripts.length - 1; i >= 0; i--) {
        stencilScripts[i].remove();
    }
}
function hasStencilScript(doc) {
    return !!doc.querySelector('script[data-stencil]');
}
const dataMinifiedAttr = 'data-m';

const readFile$1 = util$2.promisify(fs$1.readFile);
async function generateTemplateHtml(prerenderConfig, diagnostics, isDebug, srcIndexHtmlPath, outputTarget, hydrateOpts) {
    try {
        const { createDocument, serializeNodeToHtml } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/mock-doc/index.js'))); });
        if (typeof srcIndexHtmlPath !== 'string') {
            srcIndexHtmlPath = outputTarget.indexHtml;
        }
        let templateHtml;
        if (typeof prerenderConfig.loadTemplate === 'function') {
            const loadTemplateResult = prerenderConfig.loadTemplate(srcIndexHtmlPath);
            if (isPromise(loadTemplateResult)) {
                templateHtml = await loadTemplateResult;
            }
            else {
                templateHtml = loadTemplateResult;
            }
        }
        else {
            templateHtml = await readFile$1(srcIndexHtmlPath, 'utf8');
        }
        let doc = createDocument(templateHtml);
        let staticSite = false;
        if (prerenderConfig.staticSite) {
            // purposely do not want any clientside JS
            // go through the document and remove only stencil's scripts
            removeStencilScripts(doc);
            staticSite = true;
        }
        else {
            // config didn't set if it's a staticSite only,
            // but the HTML may not have any stencil scripts at all,
            // so we'll need to know that so we don't add preload modules
            // if there isn't at least one stencil script then it's a static site
            staticSite = !hasStencilScript(doc);
        }
        doc.documentElement.classList.add('hydrated');
        if (hydrateOpts.inlineExternalStyleSheets && !isDebug) {
            try {
                await inlineExternalStyleSheets(outputTarget.appDir, doc);
            }
            catch (e) {
                catchError(diagnostics, e);
            }
        }
        if (hydrateOpts.minifyScriptElements && !isDebug) {
            try {
                await minifyScriptElements(doc, true);
            }
            catch (e) {
                catchError(diagnostics, e);
            }
        }
        if (hydrateOpts.minifyStyleElements && !isDebug) {
            try {
                await minifyStyleElements(doc, true);
            }
            catch (e) {
                catchError(diagnostics, e);
            }
        }
        if (typeof prerenderConfig.beforeSerializeTemplate === 'function') {
            const beforeSerializeResults = prerenderConfig.beforeSerializeTemplate(doc);
            if (isPromise(beforeSerializeResults)) {
                doc = await beforeSerializeResults;
            }
            else {
                doc = beforeSerializeResults;
            }
        }
        let html = serializeNodeToHtml(doc);
        if (typeof prerenderConfig.afterSerializeTemplate === 'function') {
            const afterSerializeResults = prerenderConfig.afterSerializeTemplate(html);
            if (isPromise(afterSerializeResults)) {
                html = await afterSerializeResults;
            }
            else {
                html = afterSerializeResults;
            }
        }
        return {
            html,
            staticSite,
        };
    }
    catch (e) {
        catchError(diagnostics, e);
    }
    return undefined;
}

function getPrerenderConfig(diagnostics, prerenderConfigPath) {
    const prerenderConfig = {};
    if (typeof prerenderConfigPath === 'string') {
        const userPrerenderConfig = requireTsConfigFile(diagnostics, prerenderConfigPath);
        if (userPrerenderConfig) {
            Object.assign(prerenderConfig, userPrerenderConfig);
        }
    }
    return prerenderConfig;
}
let cachedPrerenderConfig = null;
function requireTsConfigFile(diagnostics, prerenderConfigPath) {
    if (!cachedPrerenderConfig) {
        try {
            const ts = require('typescript');
            // ensure we cleared out node's internal require() cache for this file
            delete require.cache[path$1__default.resolve(prerenderConfigPath)];
            // let's override node's require for a second
            // don't worry, we'll revert this when we're done
            require.extensions['.ts'] = (module, fileName) => {
                let sourceText = fs$1.readFileSync(fileName, 'utf8');
                if (prerenderConfigPath.endsWith('.ts')) {
                    // looks like we've got a typed config file
                    // let's transpile it to .js quick
                    // const ts = require('typescript');
                    const tsResults = ts.transpileModule(sourceText, {
                        fileName,
                        compilerOptions: {
                            module: ts.ModuleKind.CommonJS,
                            moduleResolution: ts.ModuleResolutionKind.NodeJs,
                            esModuleInterop: true,
                            target: ts.ScriptTarget.ES2017,
                            allowJs: true,
                        },
                    });
                    sourceText = tsResults.outputText;
                    if (tsResults.diagnostics.length > 0) {
                        diagnostics.push(...loadTypeScriptDiagnostics(tsResults.diagnostics));
                    }
                }
                else {
                    // quick hack to turn a modern es module
                    // into and old school commonjs module
                    sourceText = sourceText.replace(/export\s+\w+\s+(\w+)/gm, 'exports.$1');
                }
                module._compile(sourceText, fileName);
            };
            // let's do this!
            const m = requireFunc(prerenderConfigPath);
            if (m != null && typeof m === 'object') {
                if (m.config != null && typeof m.config === 'object') {
                    cachedPrerenderConfig = m.config;
                }
                else {
                    cachedPrerenderConfig = m;
                }
            }
        }
        catch (e) {
            catchError(diagnostics, e);
        }
        // all set, let's go ahead and reset the require back to the default
        require.extensions['.ts'] = undefined;
    }
    return cachedPrerenderConfig;
}
function validatePrerenderConfigPath(diagnostics, prerenderConfigPath) {
    if (typeof prerenderConfigPath === 'string') {
        const hasAccess = fs$1.existsSync(prerenderConfigPath);
        if (!hasAccess) {
            const err = buildError(diagnostics);
            err.header = `Prerender Config Not Found`;
            err.messageText = `Unable to access: ${prerenderConfigPath}`;
        }
        else {
            try {
                requireTsConfigFile(diagnostics, prerenderConfigPath);
            }
            catch (e) {
                catchError(diagnostics, e);
            }
        }
    }
}
function getHydrateOptions(prerenderConfig, url, diagnostics) {
    const prerenderUrl = url.href;
    const opts = {
        url: prerenderUrl,
        addModulePreloads: true,
        approximateLineWidth: 100,
        inlineExternalStyleSheets: true,
        minifyScriptElements: true,
        minifyStyleElements: true,
        removeAttributeQuotes: true,
        removeBooleanAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeHtmlComments: true,
    };
    if (prerenderConfig.canonicalUrl === null || prerenderConfig.canonicalUrl === false) {
        opts.canonicalUrl = null;
    }
    else if (typeof prerenderConfig.canonicalUrl === 'function') {
        try {
            opts.canonicalUrl = prerenderConfig.canonicalUrl(url);
        }
        catch (e) {
            catchError(diagnostics, e);
        }
    }
    else {
        opts.canonicalUrl = prerenderUrl;
    }
    if (typeof prerenderConfig.hydrateOptions === 'function') {
        try {
            const userOpts = prerenderConfig.hydrateOptions(url);
            if (userOpts != null) {
                if (userOpts.prettyHtml && typeof userOpts.removeAttributeQuotes !== 'boolean') {
                    opts.removeAttributeQuotes = false;
                }
                Object.assign(opts, userOpts);
            }
        }
        catch (e) {
            catchError(diagnostics, e);
        }
    }
    return opts;
}

const isOutputTargetDocs = (o) => o.type === DOCS || o.type === DOCS_README || o.type === DOCS_JSON || o.type === DOCS_CUSTOM || o.type === DOCS_VSCODE;
const isOutputTargetWww = (o) => o.type === WWW;
const DOCS = `docs`;
const DOCS_CUSTOM = 'docs-custom';
const DOCS_JSON = `docs-json`;
const DOCS_README = `docs-readme`;
const DOCS_VSCODE = `docs-vscode`;
const WWW = `www`;

class NodeWorkerMain extends events.EventEmitter {
    constructor(workerDomain, id, forkModulePath) {
        super();
        this.workerDomain = workerDomain;
        this.id = id;
        this.tasks = new Map();
        this.exitCode = null;
        this.processQueue = true;
        this.sendQueue = [];
        this.stopped = false;
        this.successfulMessage = false;
        this.totalTasksAssigned = 0;
        this.fork(forkModulePath);
    }
    fork(forkModulePath) {
        const filteredArgs = process.execArgv.filter(v => !/^--(debug|inspect)/.test(v));
        const args = [this.workerDomain];
        const options = {
            execArgv: filteredArgs,
            env: process.env,
            cwd: process.cwd(),
            silent: true,
        };
        this.childProcess = cp.fork(forkModulePath, args, options);
        this.childProcess.stdout.setEncoding('utf8');
        this.childProcess.stdout.on('data', data => {
            console.log(data);
        });
        this.childProcess.stderr.setEncoding('utf8');
        this.childProcess.stderr.on('data', data => {
            console.log(data);
        });
        this.childProcess.on('message', this.receiveFromWorker.bind(this));
        this.childProcess.on('error', err => {
            this.emit('error', err);
        });
        this.childProcess.once('exit', code => {
            this.exitCode = code;
            this.emit('exit', code);
        });
    }
    run(task) {
        this.totalTasksAssigned++;
        this.tasks.set(task.stencilId, task);
        this.sendToWorker({
            stencilId: task.stencilId,
            args: task.inputArgs,
        });
    }
    sendToWorker(msg) {
        if (!this.processQueue) {
            this.sendQueue.push(msg);
            return;
        }
        const success = this.childProcess.send(msg, error => {
            if (error && error instanceof Error) {
                return;
            }
            this.processQueue = true;
            if (this.sendQueue.length > 0) {
                const queueCopy = this.sendQueue.slice();
                this.sendQueue = [];
                queueCopy.forEach(d => this.sendToWorker(d));
            }
        });
        if (!success || /^win/.test(process.platform)) {
            this.processQueue = false;
        }
    }
    receiveFromWorker(msgFromWorker) {
        this.successfulMessage = true;
        if (this.stopped) {
            return;
        }
        const task = this.tasks.get(msgFromWorker.stencilId);
        if (!task) {
            if (msgFromWorker.stencilRtnError != null) {
                this.emit('error', msgFromWorker.stencilRtnError);
            }
            return;
        }
        if (msgFromWorker.stencilRtnError != null) {
            task.reject(msgFromWorker.stencilRtnError);
        }
        else {
            task.resolve(msgFromWorker.stencilRtnValue);
        }
        this.tasks.delete(msgFromWorker.stencilId);
        this.emit('response', msgFromWorker);
    }
    stop() {
        this.stopped = true;
        this.tasks.forEach(t => t.reject(TASK_CANCELED_MSG));
        this.tasks.clear();
        if (this.successfulMessage) {
            // we know we've had a successful startup
            // so let's close it down all nice like
            this.childProcess.send({
                exit: true,
            });
            setTimeout(() => {
                if (this.exitCode === null) {
                    // fallback if we weren't able to gracefully exit
                    this.childProcess.kill('SIGKILL');
                }
            }, 100);
        }
        else {
            // never had a successful message
            // so something may be hosed up
            // let's just kill it now
            this.childProcess.kill('SIGKILL');
        }
    }
}

class NodeWorkerController extends events.EventEmitter {
    constructor(workerDomain, forkModulePath, maxConcurrentWorkers, logger) {
        super();
        this.workerDomain = workerDomain;
        this.forkModulePath = forkModulePath;
        this.logger = logger;
        this.workerIds = 0;
        this.stencilId = 0;
        this.isEnding = false;
        this.taskQueue = [];
        this.workers = [];
        const osCpus = os.cpus().length;
        this.useForkedWorkers = maxConcurrentWorkers > 0;
        this.totalWorkers = Math.max(Math.min(maxConcurrentWorkers, osCpus), 2) - 1;
        if (this.useForkedWorkers) {
            // start up the forked child processes
            this.startWorkers();
        }
        else {
            // run on the main thread by just requiring the module
            this.mainThreadRunner = require(forkModulePath);
        }
    }
    onError(err, workerId) {
        if (err.code === 'ERR_IPC_CHANNEL_CLOSED') {
            return this.stopWorker(workerId);
        }
        if (err.code !== 'EPIPE') {
            this.logger.error(err);
        }
    }
    onExit(workerId) {
        setTimeout(() => {
            let doQueue = false;
            const worker = this.workers.find(w => w.id === workerId);
            if (worker) {
                worker.tasks.forEach(t => {
                    t.retries++;
                    this.taskQueue.unshift(t);
                    doQueue = true;
                });
                worker.tasks.clear();
            }
            this.stopWorker(workerId);
            if (doQueue) {
                this.processTaskQueue();
            }
        }, 10);
    }
    startWorkers() {
        while (this.workers.length < this.totalWorkers) {
            this.startWorker();
        }
    }
    startWorker() {
        const workerId = this.workerIds++;
        const worker = new NodeWorkerMain(this.workerDomain, workerId, this.forkModulePath);
        worker.on('response', this.processTaskQueue.bind(this));
        worker.once('exit', () => {
            this.onExit(workerId);
        });
        worker.on('error', err => {
            this.onError(err, workerId);
        });
        this.workers.push(worker);
    }
    stopWorker(workerId) {
        const worker = this.workers.find(w => w.id === workerId);
        if (worker) {
            worker.stop();
            const index = this.workers.indexOf(worker);
            if (index > -1) {
                this.workers.splice(index, 1);
            }
        }
    }
    processTaskQueue() {
        if (this.isEnding) {
            return;
        }
        if (this.useForkedWorkers) {
            this.startWorkers();
        }
        while (this.taskQueue.length > 0) {
            const worker = getNextWorker(this.workers);
            if (!worker) {
                break;
            }
            worker.run(this.taskQueue.shift());
        }
    }
    send(...args) {
        if (this.isEnding) {
            return Promise.reject(TASK_CANCELED_MSG);
        }
        if (this.useForkedWorkers) {
            // queue to be sent to a forked child process
            return new Promise((resolve, reject) => {
                const task = {
                    stencilId: this.stencilId++,
                    inputArgs: args,
                    retries: 0,
                    resolve: resolve,
                    reject: reject,
                };
                this.taskQueue.push(task);
                this.processTaskQueue();
            });
        }
        // run on the main thread, no forked child processes
        return this.mainThreadRunner[args[0]].apply(null, args.slice(1));
    }
    handler(name) {
        return (...args) => {
            return this.send(name, ...args);
        };
    }
    cancelTasks() {
        for (const worker of this.workers) {
            worker.tasks.forEach(t => t.reject(TASK_CANCELED_MSG));
            worker.tasks.clear();
        }
        this.taskQueue.length = 0;
    }
    destroy() {
        if (!this.isEnding) {
            this.isEnding = true;
            for (const task of this.taskQueue) {
                task.reject(TASK_CANCELED_MSG);
            }
            this.taskQueue.length = 0;
            const workerIds = this.workers.map(w => w.id);
            for (const workerId of workerIds) {
                this.stopWorker(workerId);
            }
        }
    }
}
function getNextWorker(workers) {
    const availableWorkers = workers.filter(w => {
        if (w.stopped) {
            // nope, don't use this worker if it's exiting
            return false;
        }
        // this is an available worker up for the job, bring it!
        return true;
    });
    if (availableWorkers.length === 0) {
        // all workers are pretty tasked at the moment
        // Please come back again. Thank you for your business.
        return null;
    }
    const sorted = availableWorkers.sort((a, b) => {
        // worker with the fewest active tasks first
        if (a.tasks.size < b.tasks.size)
            return -1;
        if (a.tasks.size > b.tasks.size)
            return 1;
        // all workers have the same number of active tasks, so next sort
        // by worker with the fewest total tasks that have been assigned
        if (a.totalTasksAssigned < b.totalTasksAssigned)
            return -1;
        if (a.totalTasksAssigned > b.totalTasksAssigned)
            return 1;
        return 0;
    });
    return sorted[0];
}
function setupWorkerController(sys, logger, workerDomain) {
    sys.createWorkerController = function (compilerPath, maxConcurrentWorkers) {
        return new NodeWorkerController(workerDomain, compilerPath, maxConcurrentWorkers, logger);
    };
}

async function runPrerender(prcs, cliRootDir, config, devServer, hydrateAppFilePath, componentGraph, srcIndexHtmlPath) {
    const diagnostics = [];
    const outputTargets = config.outputTargets.filter(isOutputTargetWww).filter(o => typeof o.indexHtml === 'string');
    if (outputTargets.length === 0) {
        return diagnostics;
    }
    if (typeof hydrateAppFilePath !== 'string') {
        const diagnostic = buildError(diagnostics);
        diagnostic.header = `Prerender Error`;
        diagnostic.messageText = `Build results missing "hydrateAppFilePath"`;
    }
    else {
        const hydrateAppExists = fs$1.existsSync(hydrateAppFilePath);
        if (!hydrateAppExists) {
            const diagnostic = buildError(diagnostics);
            diagnostic.header = `Prerender Error`;
            diagnostic.messageText = `Unable to open "hydrateAppFilePath": ${hydrateAppFilePath}`;
        }
    }
    if (!hasError(diagnostics)) {
        let workerCtrl = null;
        try {
            const cliWorkerPath = path$1__default.join(cliRootDir, 'cli-worker.js');
            workerCtrl = new NodeWorkerController('stencil-cli-worker', cliWorkerPath, config.maxConcurrentWorkers, config.logger);
            await Promise.all(outputTargets.map(outputTarget => {
                return runPrerenderOutputTarget(prcs, workerCtrl, diagnostics, config, devServer, hydrateAppFilePath, componentGraph, srcIndexHtmlPath, outputTarget);
            }));
        }
        catch (e) {
            catchError(diagnostics, e);
        }
        if (workerCtrl) {
            workerCtrl.destroy();
        }
    }
    return diagnostics;
}
async function runPrerenderOutputTarget(prcs, workerCtrl, diagnostics, config, devServer, hydrateAppFilePath, componentGraph, srcIndexHtmlPath, outputTarget) {
    try {
        const timeSpan = config.logger.createTimeSpan(`prerendering started`);
        const prerenderDiagnostics = [];
        const devServerBaseUrl = new url.URL(devServer.browserUrl);
        const devServerHostUrl = devServerBaseUrl.origin;
        const prerenderConfig = getPrerenderConfig(prerenderDiagnostics, outputTarget.prerenderConfig);
        const hydrateOpts = getHydrateOptions(prerenderConfig, devServerBaseUrl, diagnostics);
        config.logger.debug(`prerender hydrate app: ${hydrateAppFilePath}`);
        config.logger.debug(`prerender dev server: ${devServerHostUrl}`);
        validatePrerenderConfigPath(diagnostics, outputTarget.prerenderConfig);
        if (hasError(diagnostics)) {
            return;
        }
        // get the prerender urls to queue up
        const manager = {
            prcs,
            prerenderUrlWorker(prerenderRequest) {
                return workerCtrl.send('prerenderWorker', prerenderRequest);
            },
            componentGraphPath: null,
            config: config,
            diagnostics: prerenderDiagnostics,
            devServerHostUrl: devServerHostUrl,
            hydrateAppFilePath: hydrateAppFilePath,
            isDebug: config.logLevel === 'debug',
            logCount: 0,
            maxConcurrency: Math.max(20, config.maxConcurrentWorkers * 10),
            outputTarget: outputTarget,
            prerenderConfig: prerenderConfig,
            prerenderConfigPath: outputTarget.prerenderConfig,
            staticSite: false,
            templateId: null,
            urlsCompleted: new Set(),
            urlsPending: new Set(),
            urlsProcessing: new Set(),
            resolve: null,
        };
        if (!config.flags.ci && !manager.isDebug) {
            manager.progressLogger = startProgressLogger(prcs);
        }
        initializePrerenderEntryUrls(manager, diagnostics);
        if (manager.urlsPending.size === 0) {
            const err = buildError(diagnostics);
            err.messageText = `prerendering failed: no urls found in the prerender config`;
            return;
        }
        const templateData = await generateTemplateHtml(prerenderConfig, diagnostics, manager.isDebug, srcIndexHtmlPath, outputTarget, hydrateOpts);
        if (diagnostics.length > 0 || !templateData || typeof templateData.html !== 'string') {
            return;
        }
        manager.templateId = createPrerenderTemplate(config, templateData.html);
        manager.staticSite = templateData.staticSite;
        manager.componentGraphPath = createComponentGraphPath(componentGraph, outputTarget);
        await new Promise(resolve => {
            manager.resolve = resolve;
            prcs.nextTick(() => {
                drainPrerenderQueue(manager);
            });
        });
        if (manager.isDebug) {
            const debugDiagnostics = prerenderDiagnostics.filter(d => d.level === 'debug');
            if (debugDiagnostics.length > 0) {
                config.logger.printDiagnostics(debugDiagnostics);
            }
        }
        const duration = timeSpan.duration();
        const sitemapResults = await generateSitemapXml(manager);
        await generateRobotsTxt(manager, sitemapResults);
        const prerenderBuildErrors = prerenderDiagnostics.filter(d => d.level === 'error');
        const prerenderRuntimeErrors = prerenderDiagnostics.filter(d => d.type === 'runtime');
        if (prerenderBuildErrors.length > 0) {
            // convert to just runtime errors so the other build files still write
            // but the CLI knows an error occurred and should have an exit code 1
            for (const diagnostic of prerenderBuildErrors) {
                diagnostic.type = 'runtime';
            }
            diagnostics.push(...prerenderBuildErrors);
        }
        diagnostics.push(...prerenderRuntimeErrors);
        // Clear progress logger
        if (manager.progressLogger) {
            await manager.progressLogger.stop();
        }
        const totalUrls = manager.urlsCompleted.size;
        if (totalUrls > 1) {
            const average = Math.round(duration / totalUrls);
            config.logger.info(`prerendered ${totalUrls} urls, averaging ${average} ms per url`);
        }
        const statusMessage = prerenderBuildErrors.length > 0 ? 'failed' : 'finished';
        const statusColor = prerenderBuildErrors.length > 0 ? 'red' : 'green';
        timeSpan.finish(`prerendering ${statusMessage}`, statusColor, true);
    }
    catch (e) {
        catchError(diagnostics, e);
    }
}
function createPrerenderTemplate(config, templateHtml) {
    const hash = generateContentHash(templateHtml);
    const templateFileName = `prerender-template-${hash}.html`;
    const templateId = path$1__default.join(os__default.tmpdir(), templateFileName);
    config.logger.debug(`prerender template: ${templateId}`);
    fs$1.writeFileSync(templateId, templateHtml);
    return templateId;
}
function createComponentGraphPath(componentGraph, outputTarget) {
    if (componentGraph) {
        const content = getComponentPathContent(componentGraph, outputTarget);
        const hash = generateContentHash(content);
        const fileName = `prerender-component-graph-${hash}.json`;
        const componentGraphPath = path$1__default.join(os__default.tmpdir(), fileName);
        fs$1.writeFileSync(componentGraphPath, content);
        return componentGraphPath;
    }
    return null;
}
function getComponentPathContent(componentGraph, outputTarget) {
    const buildDir = getAbsoluteBuildDir(outputTarget);
    const object = {};
    const entries = Object.entries(componentGraph);
    for (const [key, chunks] of entries) {
        object[key] = chunks.map(filename => path$1__default.join(buildDir, filename));
    }
    return JSON.stringify(object);
}
function startProgressLogger(prcs) {
    let promise = Promise.resolve();
    const update = (text) => {
        text = text.substr(0, prcs.stdout.columns - 5) + '\x1b[0m';
        return (promise = promise.then(() => {
            return new Promise(resolve => {
                readline.clearLine(prcs.stdout, 0);
                readline.cursorTo(prcs.stdout, 0, null);
                prcs.stdout.write(text, resolve);
            });
        }));
    };
    const stop = () => {
        return update('\x1B[?25h');
    };
    // hide cursor
    prcs.stdout.write('\x1B[?25l');
    return {
        update,
        stop,
    };
}
function generateContentHash(content) {
    return crypto__default.createHash('md5').update(content).digest('hex').toLowerCase().substr(0, 12);
}

const buildId = '20200511142749';
const vermoji = '🚂';
const version$1 = '1.13.0';

function startupLog(prcs, config) {
    if (config.suppressLogs === true) {
        return;
    }
    const logger = config.logger;
    const isDebug = logger.level === 'debug';
    const isPrerelease = version$1.includes('-');
    const isDevBuild = version$1.includes('-dev.');
    let startupMsg = logger.cyan(`@stencil/core`);
    if (isDevBuild) {
        startupMsg += ' ' + logger.yellow('[DEV]');
    }
    else {
        startupMsg += ' ' + logger.cyan(`v${version$1}`);
    }
    if (prcs.platform !== 'win32' && logger.colors) {
        startupMsg += ' ' + vermoji;
    }
    logger.info(startupMsg);
    if (isPrerelease && !isDevBuild) {
        logger.warn(logger.yellow(`This is a prerelease build, undocumented changes might happen at any time. Technical support is not available for prereleases, but any assistance testing is appreciated.`));
    }
    if (config.devMode && !isDebug) {
        if (config.buildEs5) {
            logger.warn(`Generating ES5 during development is a very task expensive, initial and incremental builds will be much slower. Drop the '--es5' flag and use a modern browser for development.`);
        }
        if (!config.enableCache) {
            logger.warn(`Disabling cache during development will slow down incremental builds.`);
        }
    }
    try {
        const cpus = os__default.cpus();
        const platformInfo = `${prcs.platform}, ${cpus[0].model}`;
        const statsInfo = `cpus: ${cpus.length}, freemem: ${Math.round(os__default.freemem() / 1000000)}MB, totalmem: ${Math.round(os__default.totalmem() / 1000000)}MB`;
        if (isDebug) {
            logger.debug(platformInfo);
            logger.debug(statsInfo);
        }
        else if (config.flags && config.flags.ci) {
            logger.info(platformInfo);
            logger.info(statsInfo);
        }
        logger.debug(`node ${prcs.version}`);
        logger.debug(`compiler: ${config.sys.getCompilerExecutingPath()}`);
        logger.debug(`build: ${buildId}`);
    }
    catch (e) {
        logger.warn(e);
    }
}

async function taskPrerender(prcs, config) {
    startupLog(prcs, config);
    let hydrateAppFilePath = config.flags.unknownArgs[0];
    if (typeof hydrateAppFilePath !== 'string') {
        config.logger.error(`Missing hydrate app script path`);
        exit(1);
    }
    if (!path$1__default.isAbsolute(hydrateAppFilePath)) {
        hydrateAppFilePath = path$1__default.join(config.cwd, hydrateAppFilePath);
    }
    const srcIndexHtmlPath = config.srcIndexHtml;
    const diagnostics = await runPrerenderTask(prcs, config, null, hydrateAppFilePath, null, srcIndexHtmlPath);
    config.logger.printDiagnostics(diagnostics);
    if (diagnostics.some(d => d.level === 'error')) {
        exit(1);
    }
}
async function runPrerenderTask(prcs, config, devServer, hydrateAppFilePath, componentGraph, srcIndexHtmlPath) {
    const devServerConfig = Object.assign({}, config.devServer);
    devServerConfig.openBrowser = false;
    devServerConfig.gzip = false;
    devServerConfig.logRequests = false;
    devServerConfig.reloadStrategy = null;
    let closeDevServer = false;
    if (!devServer) {
        const { startServer } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/dev-server/index.js'))); });
        devServer = await startServer(devServerConfig, config.logger);
        closeDevServer = true;
    }
    const diagnostics = [];
    try {
        const prerenderDiagnostics = await runPrerender(prcs, __dirname, config, devServer, hydrateAppFilePath, componentGraph, srcIndexHtmlPath);
        diagnostics.push(...prerenderDiagnostics);
    }
    catch (e) {
        catchError(diagnostics, e);
    }
    if (devServer && closeDevServer) {
        await devServer.close();
    }
    return diagnostics;
}

async function taskWatch(prcs, config) {
    startupLog(prcs, config);
    let devServer = null;
    let exitCode = 0;
    try {
        const { createCompiler, version } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/compiler/stencil'))); });
        const checkVersionPromise = checkVersion(config, version);
        const compiler = await createCompiler(config);
        const watcher = await compiler.createWatcher();
        if (config.flags.serve) {
            const { startServer } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/dev-server/index.js'))); });
            devServer = await startServer(config.devServer, config.logger, watcher);
        }
        prcs.once('SIGINT', () => {
            compiler.destroy();
        });
        const checkVersionResults = await checkVersionPromise;
        checkVersionResults();
        if (devServer) {
            const rmDevServerLog = watcher.on('buildFinish', () => {
                // log the dev server url one time
                config.logger.info(`${config.logger.cyan(devServer.browserUrl)}\n`);
                rmDevServerLog();
            });
        }
        if (config.flags.prerender) {
            watcher.on('buildFinish', async (results) => {
                if (!results.hasError) {
                    const prerenderDiagnostics = await runPrerenderTask(prcs, config, devServer, results.hydrateAppFilePath, results.componentGraph, null);
                    config.logger.printDiagnostics(prerenderDiagnostics);
                }
            });
        }
        const closeResults = await watcher.start();
        if (closeResults.exitCode > 0) {
            exitCode = closeResults.exitCode;
        }
    }
    catch (e) {
        exitCode = 1;
        config.logger.error(e);
    }
    if (devServer) {
        await devServer.close();
    }
    if (exitCode > 0) {
        exit(exitCode);
    }
}

async function taskBuild(prcs, config) {
    if (config.flags.watch) {
        // watch build
        await taskWatch(prcs, config);
        return;
    }
    // one-time build
    startupLog(prcs, config);
    let exitCode = 0;
    try {
        const { createCompiler, version } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/compiler/stencil'))); });
        const checkVersionPromise = checkVersion(config, version);
        const compiler = await createCompiler(config);
        const results = await compiler.build();
        await compiler.destroy();
        if (results.hasError) {
            exitCode = 1;
        }
        else if (config.flags.prerender) {
            const prerenderDiagnostics = await runPrerenderTask(prcs, config, null, results.hydrateAppFilePath, results.componentGraph, null);
            config.logger.printDiagnostics(prerenderDiagnostics);
            if (prerenderDiagnostics.some(d => d.level === 'error')) {
                exitCode = 1;
            }
        }
        const checkVersionResults = await checkVersionPromise;
        checkVersionResults();
    }
    catch (e) {
        exitCode = 1;
        config.logger.error(e);
    }
    if (exitCode > 0) {
        exit(exitCode);
    }
}

async function taskDocs(prcs, config) {
    config.devServer = null;
    config.outputTargets = config.outputTargets.filter(isOutputTargetDocs);
    config.devMode = true;
    startupLog(prcs, config);
    const { createCompiler } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/compiler/stencil'))); });
    const compiler = await createCompiler(config);
    await compiler.build();
    await compiler.destroy();
}

const { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;

const $ = {
	enabled: !NODE_DISABLE_COLORS && TERM !== 'dumb' && FORCE_COLOR !== '0',

	// modifiers
	reset: init(0, 0),
	bold: init(1, 22),
	dim: init(2, 22),
	italic: init(3, 23),
	underline: init(4, 24),
	inverse: init(7, 27),
	hidden: init(8, 28),
	strikethrough: init(9, 29),

	// colors
	black: init(30, 39),
	red: init(31, 39),
	green: init(32, 39),
	yellow: init(33, 39),
	blue: init(34, 39),
	magenta: init(35, 39),
	cyan: init(36, 39),
	white: init(37, 39),
	gray: init(90, 39),
	grey: init(90, 39),

	// background colors
	bgBlack: init(40, 49),
	bgRed: init(41, 49),
	bgGreen: init(42, 49),
	bgYellow: init(43, 49),
	bgBlue: init(44, 49),
	bgMagenta: init(45, 49),
	bgCyan: init(46, 49),
	bgWhite: init(47, 49)
};

function run(arr, str) {
	let i=0, tmp, beg='', end='';
	for (; i < arr.length; i++) {
		tmp = arr[i];
		beg += tmp.open;
		end += tmp.close;
		if (str.includes(tmp.close)) {
			str = str.replace(tmp.rgx, tmp.close + tmp.open);
		}
	}
	return beg + str + end;
}

function chain(has, keys) {
	let ctx = { has, keys };

	ctx.reset = $.reset.bind(ctx);
	ctx.bold = $.bold.bind(ctx);
	ctx.dim = $.dim.bind(ctx);
	ctx.italic = $.italic.bind(ctx);
	ctx.underline = $.underline.bind(ctx);
	ctx.inverse = $.inverse.bind(ctx);
	ctx.hidden = $.hidden.bind(ctx);
	ctx.strikethrough = $.strikethrough.bind(ctx);

	ctx.black = $.black.bind(ctx);
	ctx.red = $.red.bind(ctx);
	ctx.green = $.green.bind(ctx);
	ctx.yellow = $.yellow.bind(ctx);
	ctx.blue = $.blue.bind(ctx);
	ctx.magenta = $.magenta.bind(ctx);
	ctx.cyan = $.cyan.bind(ctx);
	ctx.white = $.white.bind(ctx);
	ctx.gray = $.gray.bind(ctx);
	ctx.grey = $.grey.bind(ctx);

	ctx.bgBlack = $.bgBlack.bind(ctx);
	ctx.bgRed = $.bgRed.bind(ctx);
	ctx.bgGreen = $.bgGreen.bind(ctx);
	ctx.bgYellow = $.bgYellow.bind(ctx);
	ctx.bgBlue = $.bgBlue.bind(ctx);
	ctx.bgMagenta = $.bgMagenta.bind(ctx);
	ctx.bgCyan = $.bgCyan.bind(ctx);
	ctx.bgWhite = $.bgWhite.bind(ctx);

	return ctx;
}

function init(open, close) {
	let blk = {
		open: `\x1b[${open}m`,
		close: `\x1b[${close}m`,
		rgx: new RegExp(`\\x1b\\[${close}m`, 'g')
	};
	return function (txt) {
		if (this !== void 0 && this.has !== void 0) {
			this.has.includes(open) || (this.has.push(open),this.keys.push(blk));
			return txt === void 0 ? this : $.enabled ? run(this.keys, txt+'') : txt+'';
		}
		return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt+'') : txt+'';
	};
}

var kleur = $;

var action = (key, isSelect) => {
  if (key.meta) return;

  if (key.ctrl) {
    if (key.name === 'a') return 'first';
    if (key.name === 'c') return 'abort';
    if (key.name === 'd') return 'abort';
    if (key.name === 'e') return 'last';
    if (key.name === 'g') return 'reset';
  }

  if (isSelect) {
    if (key.name === 'j') return 'down';
    if (key.name === 'k') return 'up';
  }

  if (key.name === 'return') return 'submit';
  if (key.name === 'enter') return 'submit'; // ctrl + J

  if (key.name === 'backspace') return 'delete';
  if (key.name === 'delete') return 'deleteForward';
  if (key.name === 'abort') return 'abort';
  if (key.name === 'escape') return 'abort';
  if (key.name === 'tab') return 'next';
  if (key.name === 'pagedown') return 'nextPage';
  if (key.name === 'pageup') return 'prevPage'; // TODO create home() in prompt types (e.g. TextPrompt)

  if (key.name === 'home') return 'home'; // TODO create end() in prompt types (e.g. TextPrompt)

  if (key.name === 'end') return 'end';
  if (key.name === 'up') return 'up';
  if (key.name === 'down') return 'down';
  if (key.name === 'right') return 'right';
  if (key.name === 'left') return 'left';
  return false;
};

var strip = str => {
  const pattern = ['[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)', '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'].join('|');
  const RGX = new RegExp(pattern, 'g');
  return typeof str === 'string' ? str.replace(RGX, '') : str;
};

const ESC = '\x1B';
const CSI = `${ESC}[`;
const beep = '\u0007';

const cursor = {
  to(x, y) {
    if (!y) return `${CSI}${x + 1}G`;
    return `${CSI}${y + 1};${x + 1}H`;
  },
  move(x, y) {
    let ret = '';

    if (x < 0) ret += `${CSI}${-x}D`;
    else if (x > 0) ret += `${CSI}${x}C`;

    if (y < 0) ret += `${CSI}${-y}A`;
    else if (y > 0) ret += `${CSI}${y}B`;

    return ret;
  },
  up: (count = 1) => `${CSI}${count}A`,
  down: (count = 1) => `${CSI}${count}B`,
  forward: (count = 1) => `${CSI}${count}C`,
  backward: (count = 1) => `${CSI}${count}D`,
  nextLine: (count = 1) => `${CSI}E`.repeat(count),
  prevLine: (count = 1) => `${CSI}F`.repeat(count),
  left: `${CSI}G`,
  hide: `${CSI}?25l`,
  show: `${CSI}?25h`,
  save: `${ESC}7`,
  restore: `${ESC}8`
};

const scroll = {
  up: (count = 1) => `${CSI}S`.repeat(count),
  down: (count = 1) => `${CSI}T`.repeat(count)
};

const erase = {
  screen: `${CSI}2J`,
  up: (count = 1) => `${CSI}1J`.repeat(count),
  down: (count = 1) => `${CSI}J`.repeat(count),
  line: `${CSI}2K`,
  lineEnd: `${CSI}K`,
  lineStart: `${CSI}1K`,
  lines(count) {
    let clear = '';
    for (let i = 0; i < count; i++)
      clear += this.line + (i < count - 1 ? cursor.up() : '');
    if (count)
      clear += cursor.left;
    return clear;
  }
};

var src = { cursor, scroll, erase, beep };

const erase$1 = src.erase,
      cursor$1 = src.cursor;

const width = str => [...strip(str)].length;

var clear = function (prompt, perLine = process.stdout.columns) {
  if (!perLine) return erase$1.line + cursor$1.to(0);
  let rows = 0;
  const lines = prompt.split(/\r?\n/);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      let line = _step.value;
      rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return erase$1.lines(rows);
};

const main = {
  arrowUp: '↑',
  arrowDown: '↓',
  arrowLeft: '←',
  arrowRight: '→',
  radioOn: '◉',
  radioOff: '◯',
  tick: '✔',
  cross: '✖',
  ellipsis: '…',
  pointerSmall: '›',
  line: '─',
  pointer: '❯'
};
const win = {
  arrowUp: main.arrowUp,
  arrowDown: main.arrowDown,
  arrowLeft: main.arrowLeft,
  arrowRight: main.arrowRight,
  radioOn: '(*)',
  radioOff: '( )',
  tick: '√',
  cross: '×',
  ellipsis: '...',
  pointerSmall: '»',
  line: '─',
  pointer: '>'
};
const figures = process.platform === 'win32' ? win : main;
var figures_1 = figures;

// rendering user input.


const styles = Object.freeze({
  password: {
    scale: 1,
    render: input => '*'.repeat(input.length)
  },
  emoji: {
    scale: 2,
    render: input => '😃'.repeat(input.length)
  },
  invisible: {
    scale: 0,
    render: input => ''
  },
  default: {
    scale: 1,
    render: input => `${input}`
  }
});

const render = type => styles[type] || styles.default; // icon to signalize a prompt.


const symbols$1 = Object.freeze({
  aborted: kleur.red(figures_1.cross),
  done: kleur.green(figures_1.tick),
  default: kleur.cyan('?')
});

const symbol = (done, aborted) => aborted ? symbols$1.aborted : done ? symbols$1.done : symbols$1.default; // between the question and the user's input.


const delimiter = completing => kleur.gray(completing ? figures_1.ellipsis : figures_1.pointerSmall);

const item = (expandable, expanded) => kleur.gray(expandable ? expanded ? figures_1.pointerSmall : '+' : figures_1.line);

var style = {
  styles,
  render,
  symbols: symbols$1,
  symbol,
  delimiter,
  item
};

var lines = function (msg, perLine = process.stdout.columns) {
  let lines = String(strip(msg) || '').split(/\r?\n/);
  if (!perLine) return lines.length;
  return lines.map(l => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
};

/**
 * @param {string} msg The message to wrap
 * @param {object} [opts]
 * @param {number|string} [opts.margin] Left margin
 * @param {number} [opts.width] Maximum characters per line including the margin
 */

var wrap = (msg, opts = {}) => {
  const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(' ').join('') : opts.margin || '';
  const width = opts.width || process.stdout.columns;
  return (msg || '').split(/\r?\n/g).map(line => line.split(/\s+/g).reduce((arr, w) => {
    if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width) arr[arr.length - 1] += ` ${w}`;else arr.push(`${tab}${w}`);
    return arr;
  }, [tab]).join('\n')).join('\n');
};

/**
 * Determine what entries should be displayed on the screen, based on the
 * currently selected index and the maximum visible. Used in list-based
 * prompts like `select` and `multiselect`.
 *
 * @param {number} cursor the currently selected entry
 * @param {number} total the total entries available to display
 * @param {number} [maxVisible] the number of entries that can be displayed
 */

var entriesToDisplay = (cursor, total, maxVisible) => {
  maxVisible = maxVisible || total;
  let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
  if (startIndex < 0) startIndex = 0;
  let endIndex = Math.min(startIndex + maxVisible, total);
  return {
    startIndex,
    endIndex
  };
};

var util = {
  action: action,
  clear: clear,
  style: style,
  strip: strip,
  figures: figures_1,
  lines: lines,
  wrap: wrap,
  entriesToDisplay: entriesToDisplay
};

const action$1 = util.action;



const beep$1 = src.beep,
      cursor$2 = src.cursor;


/**
 * Base prompt skeleton
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class Prompt extends events__default {
  constructor(opts = {}) {
    super();
    this.firstRender = true;
    this.in = opts.stdin || process.stdin;
    this.out = opts.stdout || process.stdout;

    this.onRender = (opts.onRender || (() => void 0)).bind(this);

    const rl = readline.createInterface(this.in);
    readline.emitKeypressEvents(this.in, rl);
    if (this.in.isTTY) this.in.setRawMode(true);
    const isSelect = ['SelectPrompt', 'MultiselectPrompt'].indexOf(this.constructor.name) > -1;

    const keypress = (str, key) => {
      let a = action$1(key, isSelect);

      if (a === false) {
        this._ && this._(str, key);
      } else if (typeof this[a] === 'function') {
        this[a](key);
      } else {
        this.bell();
      }
    };

    this.close = () => {
      this.out.write(cursor$2.show);
      this.in.removeListener('keypress', keypress);
      if (this.in.isTTY) this.in.setRawMode(false);
      rl.close();
      this.emit(this.aborted ? 'abort' : 'submit', this.value);
      this.closed = true;
    };

    this.in.on('keypress', keypress);
  }

  fire() {
    this.emit('state', {
      value: this.value,
      aborted: !!this.aborted
    });
  }

  bell() {
    this.out.write(beep$1);
  }

  render() {
    this.onRender(kleur);
    if (this.firstRender) this.firstRender = false;
  }

}

var prompt = Prompt;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





const erase$2 = src.erase,
      cursor$3 = src.cursor;

const style$1 = util.style,
      clear$1 = util.clear,
      lines$1 = util.lines,
      figures$1 = util.figures;
/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.initial] Default value
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */


class TextPrompt extends prompt {
  constructor(opts = {}) {
    super(opts);
    this.transform = style$1.render(opts.style);
    this.scale = this.transform.scale;
    this.msg = opts.message;
    this.initial = opts.initial || ``;

    this.validator = opts.validate || (() => true);

    this.value = ``;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.cursor = Number(!!this.initial);
    this.clear = clear$1(``);
    this.render();
  }

  set value(v) {
    if (!v && this.initial) {
      this.placeholder = true;
      this.rendered = kleur.gray(this.transform.render(this.initial));
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(v);
    }

    this._value = v;
    this.fire();
  }

  get value() {
    return this._value;
  }

  reset() {
    this.value = ``;
    this.cursor = Number(!!this.initial);
    this.fire();
    this.render();
  }

  abort() {
    this.value = this.value || this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.red = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  validate() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let valid = yield _this.validator(_this.value);

      if (typeof valid === `string`) {
        _this.errorMsg = valid;
        valid = false;
      }

      _this.error = !valid;
    })();
  }

  submit() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.value = _this2.value || _this2.initial;
      yield _this2.validate();

      if (_this2.error) {
        _this2.red = true;

        _this2.fire();

        _this2.render();

        return;
      }

      _this2.done = true;
      _this2.aborted = false;

      _this2.fire();

      _this2.render();

      _this2.out.write('\n');

      _this2.close();
    })();
  }

  next() {
    if (!this.placeholder) return this.bell();
    this.value = this.initial;
    this.cursor = this.rendered.length;
    this.fire();
    this.render();
  }

  moveCursor(n) {
    if (this.placeholder) return;
    this.cursor = this.cursor + n;
  }

  _(c, key) {
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${c}${s2}`;
    this.red = false;
    this.cursor = this.placeholder ? 0 : s1.length + 1;
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.value.slice(0, this.cursor - 1);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.moveCursor(-1);
    this.render();
  }

  deleteForward() {
    if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor + 1);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.render();
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length;
    this.render();
  }

  left() {
    if (this.cursor <= 0 || this.placeholder) return this.bell();
    this.moveCursor(-1);
    this.render();
  }

  right() {
    if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
    this.moveCursor(1);
    this.render();
  }

  render() {
    if (this.closed) return;

    if (!this.firstRender) {
      if (this.outputError) this.out.write(cursor$3.down(lines$1(this.outputError) - 1) + clear$1(this.outputError));
      this.out.write(clear$1(this.outputText));
    }

    super.render();
    this.outputError = '';
    this.outputText = [style$1.symbol(this.done, this.aborted), kleur.bold(this.msg), style$1.delimiter(this.done), this.red ? kleur.red(this.rendered) : this.rendered].join(` `);

    if (this.error) {
      this.outputError += this.errorMsg.split(`\n`).reduce((a, l, i) => a + `\n${i ? ' ' : figures$1.pointerSmall} ${kleur.red().italic(l)}`, ``);
    }

    this.out.write(erase$2.line + cursor$3.to(0) + this.outputText + cursor$3.save + this.outputError + cursor$3.restore);
  }

}

var text = TextPrompt;

const style$2 = util.style,
      clear$2 = util.clear,
      figures$2 = util.figures,
      wrap$1 = util.wrap,
      entriesToDisplay$1 = util.entriesToDisplay;

const cursor$4 = src.cursor;
/**
 * SelectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {Number} [opts.initial] Index of default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {Number} [opts.optionsPerPage=10] Max options to display at once
 */


class SelectPrompt extends prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
    this.warn = opts.warn || '- This option is disabled';
    this.cursor = opts.initial || 0;
    this.choices = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string') ch = {
        title: ch,
        value: idx
      };
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value === undefined ? idx : ch.value),
        description: ch && ch.description,
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.optionsPerPage = opts.optionsPerPage || 10;
    this.value = (this.choices[this.cursor] || {}).value;
    this.clear = clear$2('');
    this.render();
  }

  moveCursor(n) {
    this.cursor = n;
    this.value = this.choices[n].value;
    this.fire();
  }

  reset() {
    this.moveCursor(0);
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    if (!this.selection.disabled) {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    } else this.bell();
  }

  first() {
    this.moveCursor(0);
    this.render();
  }

  last() {
    this.moveCursor(this.choices.length - 1);
    this.render();
  }

  up() {
    if (this.cursor === 0) return this.bell();
    this.moveCursor(this.cursor - 1);
    this.render();
  }

  down() {
    if (this.cursor === this.choices.length - 1) return this.bell();
    this.moveCursor(this.cursor + 1);
    this.render();
  }

  next() {
    this.moveCursor((this.cursor + 1) % this.choices.length);
    this.render();
  }

  _(c, key) {
    if (c === ' ') return this.submit();
  }

  get selection() {
    return this.choices[this.cursor];
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$4.hide);else this.out.write(clear$2(this.outputText));
    super.render();

    let _entriesToDisplay = entriesToDisplay$1(this.cursor, this.choices.length, this.optionsPerPage),
        startIndex = _entriesToDisplay.startIndex,
        endIndex = _entriesToDisplay.endIndex; // Print prompt


    this.outputText = [style$2.symbol(this.done, this.aborted), kleur.bold(this.msg), style$2.delimiter(false), this.done ? this.selection.title : this.selection.disabled ? kleur.yellow(this.warn) : kleur.gray(this.hint)].join(' '); // Print choices

    if (!this.done) {
      this.outputText += '\n';

      for (let i = startIndex; i < endIndex; i++) {
        let title,
            prefix,
            desc = '',
            v = this.choices[i]; // Determine whether to display "more choices" indicators

        if (i === startIndex && startIndex > 0) {
          prefix = figures$2.arrowUp;
        } else if (i === endIndex - 1 && endIndex < this.choices.length) {
          prefix = figures$2.arrowDown;
        } else {
          prefix = ' ';
        }

        if (v.disabled) {
          title = this.cursor === i ? kleur.gray().underline(v.title) : kleur.strikethrough().gray(v.title);
          prefix = (this.cursor === i ? kleur.bold().gray(figures$2.pointer) + ' ' : '  ') + prefix;
        } else {
          title = this.cursor === i ? kleur.cyan().underline(v.title) : v.title;
          prefix = (this.cursor === i ? kleur.cyan(figures$2.pointer) + ' ' : '  ') + prefix;

          if (v.description && this.cursor === i) {
            desc = ` - ${v.description}`;

            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
              desc = '\n' + wrap$1(v.description, {
                margin: 3,
                width: this.out.columns
              });
            }
          }
        }

        this.outputText += `${prefix} ${title}${kleur.gray(desc)}\n`;
      }
    }

    this.out.write(this.outputText);
  }

}

var select = SelectPrompt;

const style$3 = util.style,
      clear$3 = util.clear;

const cursor$5 = src.cursor,
      erase$3 = src.erase;
/**
 * TogglePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial=false] Default value
 * @param {String} [opts.active='no'] Active label
 * @param {String} [opts.inactive='off'] Inactive label
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class TogglePrompt extends prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.value = !!opts.initial;
    this.active = opts.active || 'on';
    this.inactive = opts.inactive || 'off';
    this.initialValue = this.value;
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  deactivate() {
    if (this.value === false) return this.bell();
    this.value = false;
    this.render();
  }

  activate() {
    if (this.value === true) return this.bell();
    this.value = true;
    this.render();
  }

  delete() {
    this.deactivate();
  }

  left() {
    this.deactivate();
  }

  right() {
    this.activate();
  }

  down() {
    this.deactivate();
  }

  up() {
    this.activate();
  }

  next() {
    this.value = !this.value;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (c === ' ') {
      this.value = !this.value;
    } else if (c === '1') {
      this.value = true;
    } else if (c === '0') {
      this.value = false;
    } else return this.bell();

    this.render();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$5.hide);else this.out.write(clear$3(this.outputText));
    super.render();
    this.outputText = [style$3.symbol(this.done, this.aborted), kleur.bold(this.msg), style$3.delimiter(this.done), this.value ? this.inactive : kleur.cyan().underline(this.inactive), kleur.gray('/'), this.value ? kleur.cyan().underline(this.active) : this.active].join(' ');
    this.out.write(erase$3.line + cursor$5.to(0) + this.outputText);
  }

}

var toggle = TogglePrompt;

class DatePart {
  constructor({
    token,
    date,
    parts,
    locales
  }) {
    this.token = token;
    this.date = date || new Date();
    this.parts = parts || [this];
    this.locales = locales || {};
  }

  up() {}

  down() {}

  next() {
    const currentIdx = this.parts.indexOf(this);
    return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }

  setTo(val) {}

  prev() {
    let parts = [].concat(this.parts).reverse();
    const currentIdx = parts.indexOf(this);
    return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }

  toString() {
    return String(this.date);
  }

}

var datepart = DatePart;

class Meridiem extends datepart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setHours((this.date.getHours() + 12) % 24);
  }

  down() {
    this.up();
  }

  toString() {
    let meridiem = this.date.getHours() > 12 ? 'pm' : 'am';
    return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
  }

}

var meridiem = Meridiem;

const pos = n => {
  n = n % 10;
  return n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th';
};

class Day extends datepart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setDate(this.date.getDate() + 1);
  }

  down() {
    this.date.setDate(this.date.getDate() - 1);
  }

  setTo(val) {
    this.date.setDate(parseInt(val.substr(-2)));
  }

  toString() {
    let date = this.date.getDate();
    let day = this.date.getDay();
    return this.token === 'DD' ? String(date).padStart(2, '0') : this.token === 'Do' ? date + pos(date) : this.token === 'd' ? day + 1 : this.token === 'ddd' ? this.locales.weekdaysShort[day] : this.token === 'dddd' ? this.locales.weekdays[day] : date;
  }

}

var day = Day;

class Hours extends datepart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setHours(this.date.getHours() + 1);
  }

  down() {
    this.date.setHours(this.date.getHours() - 1);
  }

  setTo(val) {
    this.date.setHours(parseInt(val.substr(-2)));
  }

  toString() {
    let hours = this.date.getHours();
    if (/h/.test(this.token)) hours = hours % 12 || 12;
    return this.token.length > 1 ? String(hours).padStart(2, '0') : hours;
  }

}

var hours = Hours;

class Milliseconds extends datepart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setMilliseconds(this.date.getMilliseconds() + 1);
  }

  down() {
    this.date.setMilliseconds(this.date.getMilliseconds() - 1);
  }

  setTo(val) {
    this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
  }

  toString() {
    return String(this.date.getMilliseconds()).padStart(4, '0').substr(0, this.token.length);
  }

}

var milliseconds = Milliseconds;

class Minutes extends datepart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setMinutes(this.date.getMinutes() + 1);
  }

  down() {
    this.date.setMinutes(this.date.getMinutes() - 1);
  }

  setTo(val) {
    this.date.setMinutes(parseInt(val.substr(-2)));
  }

  toString() {
    let m = this.date.getMinutes();
    return this.token.length > 1 ? String(m).padStart(2, '0') : m;
  }

}

var minutes = Minutes;

class Month extends datepart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setMonth(this.date.getMonth() + 1);
  }

  down() {
    this.date.setMonth(this.date.getMonth() - 1);
  }

  setTo(val) {
    val = parseInt(val.substr(-2)) - 1;
    this.date.setMonth(val < 0 ? 0 : val);
  }

  toString() {
    let month = this.date.getMonth();
    let tl = this.token.length;
    return tl === 2 ? String(month + 1).padStart(2, '0') : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
  }

}

var month = Month;

class Seconds extends datepart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setSeconds(this.date.getSeconds() + 1);
  }

  down() {
    this.date.setSeconds(this.date.getSeconds() - 1);
  }

  setTo(val) {
    this.date.setSeconds(parseInt(val.substr(-2)));
  }

  toString() {
    let s = this.date.getSeconds();
    return this.token.length > 1 ? String(s).padStart(2, '0') : s;
  }

}

var seconds = Seconds;

class Year extends datepart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setFullYear(this.date.getFullYear() + 1);
  }

  down() {
    this.date.setFullYear(this.date.getFullYear() - 1);
  }

  setTo(val) {
    this.date.setFullYear(val.substr(-4));
  }

  toString() {
    let year = String(this.date.getFullYear()).padStart(4, '0');
    return this.token.length === 2 ? year.substr(-2) : year;
  }

}

var year = Year;

var dateparts = {
  DatePart: datepart,
  Meridiem: meridiem,
  Day: day,
  Hours: hours,
  Milliseconds: milliseconds,
  Minutes: minutes,
  Month: month,
  Seconds: seconds,
  Year: year
};

function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





const style$4 = util.style,
      clear$4 = util.clear,
      figures$3 = util.figures;

const erase$4 = src.erase,
      cursor$6 = src.cursor;

const DatePart$1 = dateparts.DatePart,
      Meridiem$1 = dateparts.Meridiem,
      Day$1 = dateparts.Day,
      Hours$1 = dateparts.Hours,
      Milliseconds$1 = dateparts.Milliseconds,
      Minutes$1 = dateparts.Minutes,
      Month$1 = dateparts.Month,
      Seconds$1 = dateparts.Seconds,
      Year$1 = dateparts.Year;

const regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
const regexGroups = {
  1: ({
    token
  }) => token.replace(/\\(.)/g, '$1'),
  2: opts => new Day$1(opts),
  // Day // TODO
  3: opts => new Month$1(opts),
  // Month
  4: opts => new Year$1(opts),
  // Year
  5: opts => new Meridiem$1(opts),
  // AM/PM // TODO (special)
  6: opts => new Hours$1(opts),
  // Hours
  7: opts => new Minutes$1(opts),
  // Minutes
  8: opts => new Seconds$1(opts),
  // Seconds
  9: opts => new Milliseconds$1(opts) // Fractional seconds

};
const dfltLocales = {
  months: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
  monthsShort: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
  weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
  weekdaysShort: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
};
/**
 * DatePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Number} [opts.initial] Index of default value
 * @param {String} [opts.mask] The format mask
 * @param {object} [opts.locales] The date locales
 * @param {String} [opts.error] The error message shown on invalid value
 * @param {Function} [opts.validate] Function to validate the submitted value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */

class DatePrompt extends prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = 0;
    this.typed = '';
    this.locales = Object.assign(dfltLocales, opts.locales);
    this._date = opts.initial || new Date();
    this.errorMsg = opts.error || 'Please Enter A Valid Value';

    this.validator = opts.validate || (() => true);

    this.mask = opts.mask || 'YYYY-MM-DD HH:mm:ss';
    this.clear = clear$4('');
    this.render();
  }

  get value() {
    return this.date;
  }

  get date() {
    return this._date;
  }

  set date(date) {
    if (date) this._date.setTime(date.getTime());
  }

  set mask(mask) {
    let result;
    this.parts = [];

    while (result = regex.exec(mask)) {
      let match = result.shift();
      let idx = result.findIndex(gr => gr != null);
      this.parts.push(idx in regexGroups ? regexGroups[idx]({
        token: result[idx] || match,
        date: this.date,
        parts: this.parts,
        locales: this.locales
      }) : result[idx] || match);
    }

    let parts = this.parts.reduce((arr, i) => {
      if (typeof i === 'string' && typeof arr[arr.length - 1] === 'string') arr[arr.length - 1] += i;else arr.push(i);
      return arr;
    }, []);
    this.parts.splice(0);
    this.parts.push(...parts);
    this.reset();
  }

  moveCursor(n) {
    this.typed = '';
    this.cursor = n;
    this.fire();
  }

  reset() {
    this.moveCursor(this.parts.findIndex(p => p instanceof DatePart$1));
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  validate() {
    var _this = this;

    return _asyncToGenerator$1(function* () {
      let valid = yield _this.validator(_this.value);

      if (typeof valid === 'string') {
        _this.errorMsg = valid;
        valid = false;
      }

      _this.error = !valid;
    })();
  }

  submit() {
    var _this2 = this;

    return _asyncToGenerator$1(function* () {
      yield _this2.validate();

      if (_this2.error) {
        _this2.color = 'red';

        _this2.fire();

        _this2.render();

        return;
      }

      _this2.done = true;
      _this2.aborted = false;

      _this2.fire();

      _this2.render();

      _this2.out.write('\n');

      _this2.close();
    })();
  }

  up() {
    this.typed = '';
    this.parts[this.cursor].up();
    this.render();
  }

  down() {
    this.typed = '';
    this.parts[this.cursor].down();
    this.render();
  }

  left() {
    let prev = this.parts[this.cursor].prev();
    if (prev == null) return this.bell();
    this.moveCursor(this.parts.indexOf(prev));
    this.render();
  }

  right() {
    let next = this.parts[this.cursor].next();
    if (next == null) return this.bell();
    this.moveCursor(this.parts.indexOf(next));
    this.render();
  }

  next() {
    let next = this.parts[this.cursor].next();
    this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex(part => part instanceof DatePart$1));
    this.render();
  }

  _(c) {
    if (/\d/.test(c)) {
      this.typed += c;
      this.parts[this.cursor].setTo(this.typed);
      this.render();
    }
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$6.hide);else this.out.write(clear$4(this.outputText));
    super.render(); // Print prompt

    this.outputText = [style$4.symbol(this.done, this.aborted), kleur.bold(this.msg), style$4.delimiter(false), this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? kleur.cyan().underline(p.toString()) : p), []).join('')].join(' '); // Print error

    if (this.error) {
      this.outputText += this.errorMsg.split('\n').reduce((a, l, i) => a + `\n${i ? ` ` : figures$3.pointerSmall} ${kleur.red().italic(l)}`, ``);
    }

    this.out.write(erase$4.line + cursor$6.to(0) + this.outputText);
  }

}

var date = DatePrompt;

function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$2(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





const cursor$7 = src.cursor,
      erase$5 = src.erase;

const style$5 = util.style,
      figures$4 = util.figures,
      clear$5 = util.clear,
      lines$2 = util.lines;

const isNumber = /[0-9]/;

const isDef = any => any !== undefined;

const round = (number, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};
/**
 * NumberPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {Number} [opts.initial] Default value
 * @param {Number} [opts.max=+Infinity] Max value
 * @param {Number} [opts.min=-Infinity] Min value
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */


class NumberPrompt extends prompt {
  constructor(opts = {}) {
    super(opts);
    this.transform = style$5.render(opts.style);
    this.msg = opts.message;
    this.initial = isDef(opts.initial) ? opts.initial : '';
    this.float = !!opts.float;
    this.round = opts.round || 2;
    this.inc = opts.increment || 1;
    this.min = isDef(opts.min) ? opts.min : -Infinity;
    this.max = isDef(opts.max) ? opts.max : Infinity;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;

    this.validator = opts.validate || (() => true);

    this.color = `cyan`;
    this.value = ``;
    this.typed = ``;
    this.lastHit = 0;
    this.render();
  }

  set value(v) {
    if (!v && v !== 0) {
      this.placeholder = true;
      this.rendered = kleur.gray(this.transform.render(`${this.initial}`));
      this._value = ``;
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(`${round(v, this.round)}`);
      this._value = round(v, this.round);
    }

    this.fire();
  }

  get value() {
    return this._value;
  }

  parse(x) {
    return this.float ? parseFloat(x) : parseInt(x);
  }

  valid(c) {
    return c === `-` || c === `.` && this.float || isNumber.test(c);
  }

  reset() {
    this.typed = ``;
    this.value = ``;
    this.fire();
    this.render();
  }

  abort() {
    let x = this.value;
    this.value = x !== `` ? x : this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`\n`);
    this.close();
  }

  validate() {
    var _this = this;

    return _asyncToGenerator$2(function* () {
      let valid = yield _this.validator(_this.value);

      if (typeof valid === `string`) {
        _this.errorMsg = valid;
        valid = false;
      }

      _this.error = !valid;
    })();
  }

  submit() {
    var _this2 = this;

    return _asyncToGenerator$2(function* () {
      yield _this2.validate();

      if (_this2.error) {
        _this2.color = `red`;

        _this2.fire();

        _this2.render();

        return;
      }

      let x = _this2.value;
      _this2.value = x !== `` ? x : _this2.initial;
      _this2.done = true;
      _this2.aborted = false;
      _this2.error = false;

      _this2.fire();

      _this2.render();

      _this2.out.write(`\n`);

      _this2.close();
    })();
  }

  up() {
    this.typed = ``;

    if (this.value === '') {
      this.value = this.min - this.inc;
    }

    if (this.value >= this.max) return this.bell();
    this.value += this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  down() {
    this.typed = ``;

    if (this.value === '') {
      this.value = this.min + this.inc;
    }

    if (this.value <= this.min) return this.bell();
    this.value -= this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  delete() {
    let val = this.value.toString();
    if (val.length === 0) return this.bell();
    this.value = this.parse(val = val.slice(0, -1)) || ``;

    if (this.value !== '' && this.value < this.min) {
      this.value = this.min;
    }

    this.color = `cyan`;
    this.fire();
    this.render();
  }

  next() {
    this.value = this.initial;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (!this.valid(c)) return this.bell();
    const now = Date.now();
    if (now - this.lastHit > 1000) this.typed = ``; // 1s elapsed

    this.typed += c;
    this.lastHit = now;
    this.color = `cyan`;
    if (c === `.`) return this.fire();
    this.value = Math.min(this.parse(this.typed), this.max);
    if (this.value > this.max) this.value = this.max;
    if (this.value < this.min) this.value = this.min;
    this.fire();
    this.render();
  }

  render() {
    if (this.closed) return;

    if (!this.firstRender) {
      if (this.outputError) this.out.write(cursor$7.down(lines$2(this.outputError) - 1) + clear$5(this.outputError));
      this.out.write(clear$5(this.outputText));
    }

    super.render();
    this.outputError = ''; // Print prompt

    this.outputText = [style$5.symbol(this.done, this.aborted), kleur.bold(this.msg), style$5.delimiter(this.done), !this.done || !this.done && !this.placeholder ? kleur[this.color]().underline(this.rendered) : this.rendered].join(` `); // Print error

    if (this.error) {
      this.outputError += this.errorMsg.split(`\n`).reduce((a, l, i) => a + `\n${i ? ` ` : figures$4.pointerSmall} ${kleur.red().italic(l)}`, ``);
    }

    this.out.write(erase$5.line + cursor$7.to(0) + this.outputText + cursor$7.save + this.outputError + cursor$7.restore);
  }

}

var number = NumberPrompt;

const cursor$8 = src.cursor;



const clear$6 = util.clear,
      figures$5 = util.figures,
      style$6 = util.style,
      wrap$2 = util.wrap,
      entriesToDisplay$2 = util.entriesToDisplay;
/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Number} [opts.optionsPerPage=10] Max options to display at once
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class MultiselectPrompt extends prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = opts.cursor || 0;
    this.scrollIndex = opts.cursor || 0;
    this.hint = opts.hint || '';
    this.warn = opts.warn || '- This option is disabled -';
    this.minSelected = opts.min;
    this.showMinError = false;
    this.maxChoices = opts.max;
    this.instructions = opts.instructions;
    this.optionsPerPage = opts.optionsPerPage || 10;
    this.value = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string') ch = {
        title: ch,
        value: idx
      };
      return {
        title: ch && (ch.title || ch.value || ch),
        description: ch && ch.description,
        value: ch && (ch.value === undefined ? idx : ch.value),
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.clear = clear$6('');

    if (!opts.overrideRender) {
      this.render();
    }
  }

  reset() {
    this.value.map(v => !v.selected);
    this.cursor = 0;
    this.fire();
    this.render();
  }

  selected() {
    return this.value.filter(v => v.selected);
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    const selected = this.value.filter(e => e.selected);

    if (this.minSelected && selected.length < this.minSelected) {
      this.showMinError = true;
      this.render();
    } else {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length - 1;
    this.render();
  }

  next() {
    this.cursor = (this.cursor + 1) % this.value.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.value.length - 1;
    } else {
      this.cursor--;
    }

    this.render();
  }

  down() {
    if (this.cursor === this.value.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }

    this.render();
  }

  left() {
    this.value[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.value[this.cursor].selected = true;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.value[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  toggleAll() {
    if (this.maxChoices !== undefined || this.value[this.cursor].disabled) {
      return this.bell();
    }

    const newSelected = !this.value[this.cursor].selected;
    this.value.filter(v => !v.disabled).forEach(v => v.selected = newSelected);
    this.render();
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else if (c === 'a') {
      this.toggleAll();
    } else {
      return this.bell();
    }
  }

  renderInstructions() {
    if (this.instructions === undefined || this.instructions) {
      if (typeof this.instructions === 'string') {
        return this.instructions;
      }

      return '\nInstructions:\n' + `    ${figures$5.arrowUp}/${figures$5.arrowDown}: Highlight option\n` + `    ${figures$5.arrowLeft}/${figures$5.arrowRight}/[space]: Toggle selection\n` + (this.maxChoices === undefined ? `    a: Toggle all\n` : '') + `    enter/return: Complete answer`;
    }

    return '';
  }

  renderOption(cursor, v, i, arrowIndicator) {
    const prefix = (v.selected ? kleur.green(figures$5.radioOn) : figures$5.radioOff) + ' ' + arrowIndicator + ' ';
    let title, desc;

    if (v.disabled) {
      title = cursor === i ? kleur.gray().underline(v.title) : kleur.strikethrough().gray(v.title);
    } else {
      title = cursor === i ? kleur.cyan().underline(v.title) : v.title;

      if (cursor === i && v.description) {
        desc = ` - ${v.description}`;

        if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
          desc = '\n' + wrap$2(v.description, {
            margin: prefix.length,
            width: this.out.columns
          });
        }
      }
    }

    return prefix + title + kleur.gray(desc || '');
  } // shared with autocompleteMultiselect


  paginateOptions(options) {
    if (options.length === 0) {
      return kleur.red('No matches for this query.');
    }

    let _entriesToDisplay = entriesToDisplay$2(this.cursor, options.length, this.optionsPerPage),
        startIndex = _entriesToDisplay.startIndex,
        endIndex = _entriesToDisplay.endIndex;

    let prefix,
        styledOptions = [];

    for (let i = startIndex; i < endIndex; i++) {
      if (i === startIndex && startIndex > 0) {
        prefix = figures$5.arrowUp;
      } else if (i === endIndex - 1 && endIndex < options.length) {
        prefix = figures$5.arrowDown;
      } else {
        prefix = ' ';
      }

      styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
    }

    return '\n' + styledOptions.join('\n');
  } // shared with autocomleteMultiselect


  renderOptions(options) {
    if (!this.done) {
      return this.paginateOptions(options);
    }

    return '';
  }

  renderDoneOrInstructions() {
    if (this.done) {
      return this.value.filter(e => e.selected).map(v => v.title).join(', ');
    }

    const output = [kleur.gray(this.hint), this.renderInstructions()];

    if (this.value[this.cursor].disabled) {
      output.push(kleur.yellow(this.warn));
    }

    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$8.hide);
    super.render(); // print prompt

    let prompt = [style$6.symbol(this.done, this.aborted), kleur.bold(this.msg), style$6.delimiter(false), this.renderDoneOrInstructions()].join(' ');

    if (this.showMinError) {
      prompt += kleur.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }

    prompt += this.renderOptions(this.value);
    this.out.write(this.clear + prompt);
    this.clear = clear$6(prompt);
  }

}

var multiselect = MultiselectPrompt;

function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$3(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





const erase$6 = src.erase,
      cursor$9 = src.cursor;

const style$7 = util.style,
      clear$7 = util.clear,
      figures$6 = util.figures,
      wrap$3 = util.wrap,
      entriesToDisplay$3 = util.entriesToDisplay;

const getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);

const getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);

const getIndex = (arr, valOrTitle) => {
  const index = arr.findIndex(el => el.value === valOrTitle || el.title === valOrTitle);
  return index > -1 ? index : undefined;
};
/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of auto-complete choices objects
 * @param {Function} [opts.suggest] Filter function. Defaults to sort by title
 * @param {Number} [opts.limit=10] Max number of results to show
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.fallback] Fallback message - initial to default value
 * @param {String} [opts.initial] Index of the default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.noMatches] The no matches found label
 */


class AutocompletePrompt extends prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.suggest = opts.suggest;
    this.choices = opts.choices;
    this.initial = typeof opts.initial === 'number' ? opts.initial : getIndex(opts.choices, opts.initial);
    this.select = this.initial || opts.cursor || 0;
    this.i18n = {
      noMatches: opts.noMatches || 'no matches found'
    };
    this.fallback = opts.fallback || this.initial;
    this.suggestions = [];
    this.input = '';
    this.limit = opts.limit || 10;
    this.cursor = 0;
    this.transform = style$7.render(opts.style);
    this.scale = this.transform.scale;
    this.render = this.render.bind(this);
    this.complete = this.complete.bind(this);
    this.clear = clear$7('');
    this.complete(this.render);
    this.render();
  }

  set fallback(fb) {
    this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
  }

  get fallback() {
    let choice;
    if (typeof this._fb === 'number') choice = this.choices[this._fb];else if (typeof this._fb === 'string') choice = {
      title: this._fb
    };
    return choice || this._fb || {
      title: this.i18n.noMatches
    };
  }

  moveSelect(i) {
    this.select = i;
    if (this.suggestions.length > 0) this.value = getVal(this.suggestions, i);else this.value = this.fallback.value;
    this.fire();
  }

  complete(cb) {
    var _this = this;

    return _asyncToGenerator$3(function* () {
      const p = _this.completing = _this.suggest(_this.input, _this.choices);

      const suggestions = yield p;
      if (_this.completing !== p) return;
      _this.suggestions = suggestions.map((s, i, arr) => ({
        title: getTitle(arr, i),
        value: getVal(arr, i),
        description: s.description
      }));
      _this.completing = false;
      const l = Math.max(suggestions.length - 1, 0);

      _this.moveSelect(Math.min(l, _this.select));

      cb && cb();
    })();
  }

  reset() {
    this.input = '';
    this.complete(() => {
      this.moveSelect(this.initial !== void 0 ? this.initial : 0);
      this.render();
    });
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) {
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${c}${s2}`;
    this.cursor = s1.length + 1;
    this.complete(this.render);
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.input.slice(0, this.cursor - 1);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.cursor = this.cursor - 1;
    this.render();
  }

  deleteForward() {
    if (this.cursor * this.scale >= this.rendered.length) return this.bell();
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor + 1);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.render();
  }

  first() {
    this.moveSelect(0);
    this.render();
  }

  last() {
    this.moveSelect(this.suggestions.length - 1);
    this.render();
  }

  up() {
    if (this.select <= 0) return this.bell();
    this.moveSelect(this.select - 1);
    this.render();
  }

  down() {
    if (this.select >= this.suggestions.length - 1) return this.bell();
    this.moveSelect(this.select + 1);
    this.render();
  }

  next() {
    if (this.select === this.suggestions.length - 1) {
      this.moveSelect(0);
    } else this.moveSelect(this.select + 1);

    this.render();
  }

  nextPage() {
    this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
    this.render();
  }

  prevPage() {
    this.moveSelect(Math.max(this.select - this.limit, 0));
    this.render();
  }

  left() {
    if (this.cursor <= 0) return this.bell();
    this.cursor = this.cursor - 1;
    this.render();
  }

  right() {
    if (this.cursor * this.scale >= this.rendered.length) return this.bell();
    this.cursor = this.cursor + 1;
    this.render();
  }

  renderOption(v, hovered, isStart, isEnd) {
    let desc;
    let prefix = isStart ? figures$6.arrowUp : isEnd ? figures$6.arrowDown : ' ';
    let title = hovered ? kleur.cyan().underline(v.title) : v.title;
    prefix = (hovered ? kleur.cyan(figures$6.pointer) + ' ' : '  ') + prefix;

    if (v.description) {
      desc = ` - ${v.description}`;

      if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
        desc = '\n' + wrap$3(v.description, {
          margin: 3,
          width: this.out.columns
        });
      }
    }

    return prefix + ' ' + title + kleur.gray(desc || '');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$9.hide);else this.out.write(clear$7(this.outputText));
    super.render();

    let _entriesToDisplay = entriesToDisplay$3(this.select, this.choices.length, this.limit),
        startIndex = _entriesToDisplay.startIndex,
        endIndex = _entriesToDisplay.endIndex;

    this.outputText = [style$7.symbol(this.done, this.aborted), kleur.bold(this.msg), style$7.delimiter(this.completing), this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)].join(' ');

    if (!this.done) {
      const suggestions = this.suggestions.slice(startIndex, endIndex).map((item, i) => this.renderOption(item, this.select === i + startIndex, i === 0 && startIndex > 0, i + startIndex === endIndex - 1 && endIndex < this.choices.length)).join('\n');
      this.outputText += `\n` + (suggestions || kleur.gray(this.fallback.title));
    }

    this.out.write(erase$6.line + cursor$9.to(0) + this.outputText);
  }

}

var autocomplete = AutocompletePrompt;

const cursor$a = src.cursor;



const clear$8 = util.clear,
      style$8 = util.style,
      figures$7 = util.figures;
/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class AutocompleteMultiselectPrompt extends multiselect {
  constructor(opts = {}) {
    opts.overrideRender = true;
    super(opts);
    this.inputValue = '';
    this.clear = clear$8('');
    this.filteredOptions = this.value;
    this.render();
  }

  last() {
    this.cursor = this.filteredOptions.length - 1;
    this.render();
  }

  next() {
    this.cursor = (this.cursor + 1) % this.filteredOptions.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.filteredOptions.length - 1;
    } else {
      this.cursor--;
    }

    this.render();
  }

  down() {
    if (this.cursor === this.filteredOptions.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }

    this.render();
  }

  left() {
    this.filteredOptions[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.filteredOptions[this.cursor].selected = true;
    this.render();
  }

  delete() {
    if (this.inputValue.length) {
      this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
      this.updateFilteredOptions();
    }
  }

  updateFilteredOptions() {
    const currentHighlight = this.filteredOptions[this.cursor];
    this.filteredOptions = this.value.filter(v => {
      if (this.inputValue) {
        if (typeof v.title === 'string') {
          if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
            return true;
          }
        }

        if (typeof v.value === 'string') {
          if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
            return true;
          }
        }

        return false;
      }

      return true;
    });
    const newHighlightIndex = this.filteredOptions.findIndex(v => v === currentHighlight);
    this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.filteredOptions[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  handleInputChange(c) {
    this.inputValue = this.inputValue + c;
    this.updateFilteredOptions();
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else {
      this.handleInputChange(c);
    }
  }

  renderInstructions() {
    if (this.instructions === undefined || this.instructions) {
      if (typeof this.instructions === 'string') {
        return this.instructions;
      }

      return `
Instructions:
    ${figures$7.arrowUp}/${figures$7.arrowDown}: Highlight option
    ${figures$7.arrowLeft}/${figures$7.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
    }

    return '';
  }

  renderCurrentInput() {
    return `
Filtered results for: ${this.inputValue ? this.inputValue : kleur.gray('Enter something to filter')}\n`;
  }

  renderOption(cursor, v, i) {
    let title;
    if (v.disabled) title = cursor === i ? kleur.gray().underline(v.title) : kleur.strikethrough().gray(v.title);else title = cursor === i ? kleur.cyan().underline(v.title) : v.title;
    return (v.selected ? kleur.green(figures$7.radioOn) : figures$7.radioOff) + '  ' + title;
  }

  renderDoneOrInstructions() {
    if (this.done) {
      return this.value.filter(e => e.selected).map(v => v.title).join(', ');
    }

    const output = [kleur.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];

    if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
      output.push(kleur.yellow(this.warn));
    }

    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$a.hide);
    super.render(); // print prompt

    let prompt = [style$8.symbol(this.done, this.aborted), kleur.bold(this.msg), style$8.delimiter(false), this.renderDoneOrInstructions()].join(' ');

    if (this.showMinError) {
      prompt += kleur.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }

    prompt += this.renderOptions(this.filteredOptions);
    this.out.write(this.clear + prompt);
    this.clear = clear$8(prompt);
  }

}

var autocompleteMultiselect = AutocompleteMultiselectPrompt;

const style$9 = util.style,
      clear$9 = util.clear;

const erase$7 = src.erase,
      cursor$b = src.cursor;
/**
 * ConfirmPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial] Default value (true/false)
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.yes] The "Yes" label
 * @param {String} [opts.yesOption] The "Yes" option when choosing between yes/no
 * @param {String} [opts.no] The "No" label
 * @param {String} [opts.noOption] The "No" option when choosing between yes/no
 */


class ConfirmPrompt extends prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.value = opts.initial;
    this.initialValue = !!opts.initial;
    this.yesMsg = opts.yes || 'yes';
    this.yesOption = opts.yesOption || '(Y/n)';
    this.noMsg = opts.no || 'no';
    this.noOption = opts.noOption || '(y/N)';
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.value = this.value || false;
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) {
    if (c.toLowerCase() === 'y') {
      this.value = true;
      return this.submit();
    }

    if (c.toLowerCase() === 'n') {
      this.value = false;
      return this.submit();
    }

    return this.bell();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$b.hide);else this.out.write(clear$9(this.outputText));
    super.render();
    this.outputText = [style$9.symbol(this.done, this.aborted), kleur.bold(this.msg), style$9.delimiter(this.done), this.done ? this.value ? this.yesMsg : this.noMsg : kleur.gray(this.initialValue ? this.yesOption : this.noOption)].join(' ');
    this.out.write(erase$7.line + cursor$b.to(0) + this.outputText);
  }

}

var confirm = ConfirmPrompt;

var elements = {
  TextPrompt: text,
  SelectPrompt: select,
  TogglePrompt: toggle,
  DatePrompt: date,
  NumberPrompt: number,
  MultiselectPrompt: multiselect,
  AutocompletePrompt: autocomplete,
  AutocompleteMultiselectPrompt: autocompleteMultiselect,
  ConfirmPrompt: confirm
};

var prompts = createCommonjsModule(function (module, exports) {

const $ = exports;



const noop = v => v;

function toPrompt(type, args, opts = {}) {
  return new Promise((res, rej) => {
    const p = new elements[type](args);
    const onAbort = opts.onAbort || noop;
    const onSubmit = opts.onSubmit || noop;
    p.on('state', args.onState || noop);
    p.on('submit', x => res(onSubmit(x)));
    p.on('abort', x => rej(onAbort(x)));
  });
}
/**
 * Text prompt
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.text = args => toPrompt('TextPrompt', args);
/**
 * Password prompt with masked input
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.password = args => {
  args.style = 'password';
  return $.text(args);
};
/**
 * Prompt where input is invisible, like sudo
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.invisible = args => {
  args.style = 'invisible';
  return $.text(args);
};
/**
 * Number prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.number = args => toPrompt('NumberPrompt', args);
/**
 * Date prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.date = args => toPrompt('DatePrompt', args);
/**
 * Classic yes/no prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.confirm = args => toPrompt('ConfirmPrompt', args);
/**
 * List prompt, split intput string by `seperator`
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {string} [args.separator] String separator
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input, in form of an `Array`
 */


$.list = args => {
  const sep = args.separator || ',';
  return toPrompt('TextPrompt', args, {
    onSubmit: str => str.split(sep).map(s => s.trim())
  });
};
/**
 * Toggle/switch prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {string} [args.active="on"] Text for `active` state
 * @param {string} [args.inactive="off"] Text for `inactive` state
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.toggle = args => toPrompt('TogglePrompt', args);
/**
 * Interactive select prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value }, ...]`
 * @param {number} [args.initial] Index of default value
 * @param {String} [args.hint] Hint to display
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.select = args => toPrompt('SelectPrompt', args);
/**
 * Interactive multi-select / autocompleteMultiselect prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value, [selected] }, ...]`
 * @param {number} [args.max] Max select
 * @param {string} [args.hint] Hint to display user
 * @param {Number} [args.cursor=0] Cursor start position
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.multiselect = args => {
  args.choices = [].concat(args.choices || []);

  const toSelected = items => items.filter(item => item.selected).map(item => item.value);

  return toPrompt('MultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

$.autocompleteMultiselect = args => {
  args.choices = [].concat(args.choices || []);

  const toSelected = items => items.filter(item => item.selected).map(item => item.value);

  return toPrompt('AutocompleteMultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

const byTitle = (input, choices) => Promise.resolve(choices.filter(item => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase()));
/**
 * Interactive auto-complete prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of auto-complete choices objects `[{ title, value }, ...]`
 * @param {Function} [args.suggest] Function to filter results based on user input. Defaults to sort by `title`
 * @param {number} [args.limit=10] Max number of results to show
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {String} [args.initial] Index of the default value
 * @param {String} [args.fallback] Fallback message - defaults to initial value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.autocomplete = args => {
  args.suggest = args.suggest || byTitle;
  args.choices = [].concat(args.choices || []);
  return toPrompt('AutocompletePrompt', args);
};
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator$4(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



const passOn = ['suggest', 'format', 'onState', 'validate', 'onRender', 'type'];

const noop$1 = () => {};
/**
 * Prompt for a series of questions
 * @param {Array|Object} questions Single question object or Array of question objects
 * @param {Function} [onSubmit] Callback function called on prompt submit
 * @param {Function} [onCancel] Callback function called on cancel/abort
 * @returns {Object} Object with values from user input
 */


function prompt$1() {
  return _prompt.apply(this, arguments);
}

function _prompt() {
  _prompt = _asyncToGenerator$4(function* (questions = [], {
    onSubmit = noop$1,
    onCancel = noop$1
  } = {}) {
    const answers = {};
    const override = prompt$1._override || {};
    questions = [].concat(questions);
    let answer, question, quit, name, type, lastPrompt;

    const getFormattedAnswer = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator$4(function* (question, answer, skipValidation = false) {
        if (!skipValidation && question.validate && question.validate(answer) !== true) {
          return;
        }

        return question.format ? yield question.format(answer, answers) : answer;
      });

      return function getFormattedAnswer(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = questions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        question = _step.value;
        var _question = question;
        name = _question.name;
        type = _question.type;

        // evaluate type first and skip if type is a falsy value
        if (typeof type === 'function') {
          type = yield type(answer, _objectSpread({}, answers), question);
          question['type'] = type;
        }

        if (!type) continue; // if property is a function, invoke it unless it's a special function

        for (let key in question) {
          if (passOn.includes(key)) continue;
          let value = question[key];
          question[key] = typeof value === 'function' ? yield value(answer, _objectSpread({}, answers), lastPrompt) : value;
        }

        lastPrompt = question;

        if (typeof question.message !== 'string') {
          throw new Error('prompt message is required');
        } // update vars in case they changed


        var _question2 = question;
        name = _question2.name;
        type = _question2.type;

        if (prompts[type] === void 0) {
          throw new Error(`prompt type (${type}) is not defined`);
        }

        if (override[question.name] !== undefined) {
          answer = yield getFormattedAnswer(question, override[question.name]);

          if (answer !== undefined) {
            answers[name] = answer;
            continue;
          }
        }

        try {
          // Get the injected answer if there is one or prompt the user
          answer = prompt$1._injected ? getInjectedAnswer(prompt$1._injected) : yield prompts[type](question);
          answers[name] = answer = yield getFormattedAnswer(question, answer, true);
          quit = yield onSubmit(question, answer, answers);
        } catch (err) {
          quit = !(yield onCancel(question, answers));
        }

        if (quit) return answers;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return answers;
  });
  return _prompt.apply(this, arguments);
}

function getInjectedAnswer(injected) {
  const answer = injected.shift();

  if (answer instanceof Error) {
    throw answer;
  }

  return answer;
}

function inject(answers) {
  prompt$1._injected = (prompt$1._injected || []).concat(answers);
}

function override(answers) {
  prompt$1._override = Object.assign({}, answers);
}

var dist = Object.assign(prompt$1, {
  prompt: prompt$1,
  prompts,
  inject,
  override
});

var action$2 = (key, isSelect) => {
  if (key.meta) return;
  
  if (key.ctrl) {
    if (key.name === 'a') return 'first';
    if (key.name === 'c') return 'abort';
    if (key.name === 'd') return 'abort';
    if (key.name === 'e') return 'last';
    if (key.name === 'g') return 'reset';
  }
  
  if (isSelect) {
    if (key.name === 'j') return 'down';
    if (key.name === 'k') return 'up';
  }

  if (key.name === 'return') return 'submit';
  if (key.name === 'enter') return 'submit'; // ctrl + J
  if (key.name === 'backspace') return 'delete';
  if (key.name === 'delete') return 'deleteForward';
  if (key.name === 'abort') return 'abort';
  if (key.name === 'escape') return 'abort';
  if (key.name === 'tab') return 'next';
  if (key.name === 'pagedown') return 'nextPage';
  if (key.name === 'pageup') return 'prevPage';
  // TODO create home() in prompt types (e.g. TextPrompt)
  if (key.name === 'home') return 'home';
  // TODO create end() in prompt types (e.g. TextPrompt)
  if (key.name === 'end') return 'end';

  if (key.name === 'up') return 'up';
  if (key.name === 'down') return 'down';
  if (key.name === 'right') return 'right';
  if (key.name === 'left') return 'left';

  return false;
};

var strip$1 = str => {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
  ].join('|');

  const RGX = new RegExp(pattern, 'g');
  return typeof str === 'string' ? str.replace(RGX, '') : str;
};

const { erase: erase$8, cursor: cursor$c } = src;

const width$1 = str => [...strip$1(str)].length;

var clear$a = function(prompt, perLine = process.stdout.columns) {
  if (!perLine) return erase$8.line + cursor$c.to(0);

  let rows = 0;
  const lines = prompt.split(/\r?\n/);
  for (let line of lines) {
    rows += 1 + Math.floor(Math.max(width$1(line) - 1, 0) / perLine);
  }

  return erase$8.lines(rows);
};

const main$1 = {
  arrowUp: '↑',
  arrowDown: '↓',
  arrowLeft: '←',
  arrowRight: '→',
  radioOn: '◉',
  radioOff: '◯',
  tick: '✔',	
  cross: '✖',	
  ellipsis: '…',	
  pointerSmall: '›',	
  line: '─',	
  pointer: '❯'	
};	
const win$1 = {
  arrowUp: main$1.arrowUp,
  arrowDown: main$1.arrowDown,
  arrowLeft: main$1.arrowLeft,
  arrowRight: main$1.arrowRight,
  radioOn: '(*)',
  radioOff: '( )',	
  tick: '√',	
  cross: '×',	
  ellipsis: '...',	
  pointerSmall: '»',	
  line: '─',	
  pointer: '>'	
};	
const figures$8 = process.platform === 'win32' ? win$1 : main$1;	

 var figures_1$1 = figures$8;

// rendering user input.
const styles$1 = Object.freeze({
  password: { scale: 1, render: input => '*'.repeat(input.length) },
  emoji: { scale: 2, render: input => '😃'.repeat(input.length) },
  invisible: { scale: 0, render: input => '' },
  default: { scale: 1, render: input => `${input}` }
});
const render$1 = type => styles$1[type] || styles$1.default;

// icon to signalize a prompt.
const symbols$2 = Object.freeze({
  aborted: kleur.red(figures_1$1.cross),
  done: kleur.green(figures_1$1.tick),
  default: kleur.cyan('?')
});

const symbol$1 = (done, aborted) =>
  aborted ? symbols$2.aborted : done ? symbols$2.done : symbols$2.default;

// between the question and the user's input.
const delimiter$1 = completing =>
  kleur.gray(completing ? figures_1$1.ellipsis : figures_1$1.pointerSmall);

const item$1 = (expandable, expanded) =>
  kleur.gray(expandable ? (expanded ? figures_1$1.pointerSmall : '+') : figures_1$1.line);

var style$a = {
  styles: styles$1,
  render: render$1,
  symbols: symbols$2,
  symbol: symbol$1,
  delimiter: delimiter$1,
  item: item$1
};

var lines$3 = function (msg, perLine = process.stdout.columns) {
  let lines = String(strip$1(msg) || '').split(/\r?\n/);

  if (!perLine) return lines.length;
  return lines.map(l => Math.ceil(l.length / perLine))
      .reduce((a, b) => a + b);
};

/**
 * @param {string} msg The message to wrap
 * @param {object} [opts]
 * @param {number|string} [opts.margin] Left margin
 * @param {number} [opts.width] Maximum characters per line including the margin
 */
var wrap$4 = (msg, opts = {}) => {
  const tab = Number.isSafeInteger(parseInt(opts.margin))
    ? new Array(parseInt(opts.margin)).fill(' ').join('')
    : (opts.margin || '');

  const width = opts.width || process.stdout.columns;

  return (msg || '').split(/\r?\n/g)
    .map(line => line
      .split(/\s+/g)
      .reduce((arr, w) => {
        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
          arr[arr.length - 1] += ` ${w}`;
        else arr.push(`${tab}${w}`);
        return arr;
      }, [ tab ])
      .join('\n'))
    .join('\n');
};

/**
 * Determine what entries should be displayed on the screen, based on the
 * currently selected index and the maximum visible. Used in list-based
 * prompts like `select` and `multiselect`.
 *
 * @param {number} cursor the currently selected entry
 * @param {number} total the total entries available to display
 * @param {number} [maxVisible] the number of entries that can be displayed
 */
var entriesToDisplay$4 = (cursor, total, maxVisible)  => {
  maxVisible = maxVisible || total;

  let startIndex = Math.min(total- maxVisible, cursor - Math.floor(maxVisible / 2));
  if (startIndex < 0) startIndex = 0;

  let endIndex = Math.min(startIndex + maxVisible, total);

  return { startIndex, endIndex };
};

var util$1 = {
  action: action$2,
  clear: clear$a,
  style: style$a,
  strip: strip$1,
  figures: figures_1$1,
  lines: lines$3,
  wrap: wrap$4,
  entriesToDisplay: entriesToDisplay$4
};

const { action: action$3 } = util$1;

const { beep: beep$2, cursor: cursor$d } = src;


/**
 * Base prompt skeleton
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class Prompt$1 extends events__default {
  constructor(opts={}) {
    super();

    this.firstRender = true;
    this.in = opts.stdin || process.stdin;
    this.out = opts.stdout || process.stdout;
    this.onRender = (opts.onRender || (() => void 0)).bind(this);
    const rl = readline.createInterface(this.in);
    readline.emitKeypressEvents(this.in, rl);

    if (this.in.isTTY) this.in.setRawMode(true);
    const isSelect = [ 'SelectPrompt', 'MultiselectPrompt' ].indexOf(this.constructor.name) > -1;
    const keypress = (str, key) => {
      let a = action$3(key, isSelect);
      if (a === false) {
        this._ && this._(str, key);
      } else if (typeof this[a] === 'function') {
        this[a](key);
      } else {
        this.bell();
      }
    };

    this.close = () => {
      this.out.write(cursor$d.show);
      this.in.removeListener('keypress', keypress);
      if (this.in.isTTY) this.in.setRawMode(false);
      rl.close();
      this.emit(this.aborted ? 'abort' : 'submit', this.value);
      this.closed = true;
    };

    this.in.on('keypress', keypress);
  }

  fire() {
    this.emit('state', {
      value: this.value,
      aborted: !!this.aborted
    });
  }

  bell() {
    this.out.write(beep$2);
  }

  render() {
    this.onRender(kleur);
    if (this.firstRender) this.firstRender = false;
  }
}

var prompt$2 = Prompt$1;

const { erase: erase$9, cursor: cursor$e } = src;
const { style: style$b, clear: clear$b, lines: lines$4, figures: figures$9 } = util$1;

/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.initial] Default value
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */
class TextPrompt$1 extends prompt$2 {
  constructor(opts={}) {
    super(opts);
    this.transform = style$b.render(opts.style);
    this.scale = this.transform.scale;
    this.msg = opts.message;
    this.initial = opts.initial || ``;
    this.validator = opts.validate || (() => true);
    this.value = ``;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.cursor = Number(!!this.initial);
    this.clear = clear$b(``);
    this.render();
  }

  set value(v) {
    if (!v && this.initial) {
      this.placeholder = true;
      this.rendered = kleur.gray(this.transform.render(this.initial));
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(v);
    }
    this._value = v;
    this.fire();
  }

  get value() {
    return this._value;
  }

  reset() {
    this.value = ``;
    this.cursor = Number(!!this.initial);
    this.fire();
    this.render();
  }

  abort() {
    this.value = this.value || this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.red = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === `string`) {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }

  async submit() {
    this.value = this.value || this.initial;
    await this.validate();
    if (this.error) {
      this.red = true;
      this.fire();
      this.render();
      return;
    }
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  next() {
    if (!this.placeholder) return this.bell();
    this.value = this.initial;
    this.cursor = this.rendered.length;
    this.fire();
    this.render();
  }

  moveCursor(n) {
    if (this.placeholder) return;
    this.cursor = this.cursor+n;
  }

  _(c, key) {
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${c}${s2}`;
    this.red = false;
    this.cursor = this.placeholder ? 0 : s1.length+1;
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.value.slice(0, this.cursor-1);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.moveCursor(-1);
    this.render();
  }

  deleteForward() {
    if(this.cursor*this.scale >= this.rendered.length || this.placeholder) return this.bell();
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor+1);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.render();
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length;
    this.render();
  }

  left() {
    if (this.cursor <= 0 || this.placeholder) return this.bell();
    this.moveCursor(-1);
    this.render();
  }

  right() {
    if (this.cursor*this.scale >= this.rendered.length || this.placeholder) return this.bell();
    this.moveCursor(1);
    this.render();
  }

  render() {
    if (this.closed) return;
    if (!this.firstRender) {
      if (this.outputError)
        this.out.write(cursor$e.down(lines$4(this.outputError) - 1) + clear$b(this.outputError));
      this.out.write(clear$b(this.outputText));
    }
    super.render();
    this.outputError = '';

    this.outputText = [
      style$b.symbol(this.done, this.aborted),
      kleur.bold(this.msg),
      style$b.delimiter(this.done),
      this.red ? kleur.red(this.rendered) : this.rendered
    ].join(` `);

    if (this.error) {
      this.outputError += this.errorMsg.split(`\n`)
          .reduce((a, l, i) => a + `\n${i ? ' ' : figures$9.pointerSmall} ${kleur.red().italic(l)}`, ``);
    }

    this.out.write(erase$9.line + cursor$e.to(0) + this.outputText + cursor$e.save + this.outputError + cursor$e.restore);
  }
}

var text$1 = TextPrompt$1;

const { style: style$c, clear: clear$c, figures: figures$a, wrap: wrap$5, entriesToDisplay: entriesToDisplay$5 } = util$1;
const { cursor: cursor$f } = src;

/**
 * SelectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {Number} [opts.initial] Index of default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {Number} [opts.optionsPerPage=10] Max options to display at once
 */
class SelectPrompt$1 extends prompt$2 {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
    this.warn = opts.warn || '- This option is disabled';
    this.cursor = opts.initial || 0;
    this.choices = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string')
        ch = {title: ch, value: idx};
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value === undefined ? idx : ch.value),
        description: ch && ch.description,
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.optionsPerPage = opts.optionsPerPage || 10;
    this.value = (this.choices[this.cursor] || {}).value;
    this.clear = clear$c('');
    this.render();
  }

  moveCursor(n) {
    this.cursor = n;
    this.value = this.choices[n].value;
    this.fire();
  }

  reset() {
    this.moveCursor(0);
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    if (!this.selection.disabled) {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    } else
      this.bell();
  }

  first() {
    this.moveCursor(0);
    this.render();
  }

  last() {
    this.moveCursor(this.choices.length - 1);
    this.render();
  }

  up() {
    if (this.cursor === 0) return this.bell();
    this.moveCursor(this.cursor - 1);
    this.render();
  }

  down() {
    if (this.cursor === this.choices.length - 1) return this.bell();
    this.moveCursor(this.cursor + 1);
    this.render();
  }

  next() {
    this.moveCursor((this.cursor + 1) % this.choices.length);
    this.render();
  }

  _(c, key) {
    if (c === ' ') return this.submit();
  }

  get selection() {
    return this.choices[this.cursor];
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$f.hide);
    else this.out.write(clear$c(this.outputText));
    super.render();

    let { startIndex, endIndex } = entriesToDisplay$5(this.cursor, this.choices.length, this.optionsPerPage);

    // Print prompt
    this.outputText = [
      style$c.symbol(this.done, this.aborted),
      kleur.bold(this.msg),
      style$c.delimiter(false),
      this.done ? this.selection.title : this.selection.disabled
          ? kleur.yellow(this.warn) : kleur.gray(this.hint)
    ].join(' ');

    // Print choices
    if (!this.done) {
      this.outputText += '\n';
      for (let i = startIndex; i < endIndex; i++) {
        let title, prefix, desc = '', v = this.choices[i];

        // Determine whether to display "more choices" indicators
        if (i === startIndex && startIndex > 0) {
          prefix = figures$a.arrowUp;
        } else if (i === endIndex - 1 && endIndex < this.choices.length) {
          prefix = figures$a.arrowDown;
        } else {
          prefix = ' ';
        }

        if (v.disabled) {
          title = this.cursor === i ? kleur.gray().underline(v.title) : kleur.strikethrough().gray(v.title);
          prefix = (this.cursor === i ? kleur.bold().gray(figures$a.pointer) + ' ' : '  ') + prefix;
        } else {
          title = this.cursor === i ? kleur.cyan().underline(v.title) : v.title;
          prefix = (this.cursor === i ? kleur.cyan(figures$a.pointer) + ' ' : '  ') + prefix;
          if (v.description && this.cursor === i) {
            desc = ` - ${v.description}`;
            if (prefix.length + title.length + desc.length >= this.out.columns
                || v.description.split(/\r?\n/).length > 1) {
              desc = '\n' + wrap$5(v.description, { margin: 3, width: this.out.columns });
            }
          }
        }

        this.outputText += `${prefix} ${title}${kleur.gray(desc)}\n`;
      }
    }

    this.out.write(this.outputText);
  }
}

var select$1 = SelectPrompt$1;

const { style: style$d, clear: clear$d } = util$1;
const { cursor: cursor$g, erase: erase$a } = src;

/**
 * TogglePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial=false] Default value
 * @param {String} [opts.active='no'] Active label
 * @param {String} [opts.inactive='off'] Inactive label
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class TogglePrompt$1 extends prompt$2 {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.value = !!opts.initial;
    this.active = opts.active || 'on';
    this.inactive = opts.inactive || 'off';
    this.initialValue = this.value;
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  deactivate() {
    if (this.value === false) return this.bell();
    this.value = false;
    this.render();
  }

  activate() {
    if (this.value === true) return this.bell();
    this.value = true;
    this.render();
  }

  delete() {
    this.deactivate();
  }
  left() {
    this.deactivate();
  }
  right() {
    this.activate();
  }
  down() {
    this.deactivate();
  }
  up() {
    this.activate();
  }

  next() {
    this.value = !this.value;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (c === ' ') {
      this.value = !this.value;
    } else if (c === '1') {
      this.value = true;
    } else if (c === '0') {
      this.value = false;
    } else return this.bell();
    this.render();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$g.hide);
    else this.out.write(clear$d(this.outputText));
    super.render();

    this.outputText = [
      style$d.symbol(this.done, this.aborted),
      kleur.bold(this.msg),
      style$d.delimiter(this.done),
      this.value ? this.inactive : kleur.cyan().underline(this.inactive),
      kleur.gray('/'),
      this.value ? kleur.cyan().underline(this.active) : this.active
    ].join(' ');

    this.out.write(erase$a.line + cursor$g.to(0) + this.outputText);
  }
}

var toggle$1 = TogglePrompt$1;

class DatePart$2 {
  constructor({token, date, parts, locales}) {
    this.token = token;
    this.date = date || new Date();
    this.parts = parts || [this];
    this.locales = locales || {};
  }

  up() {}

  down() {}

  next() {
    const currentIdx = this.parts.indexOf(this);
    return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart$2);
  }

  setTo(val) {}

  prev() {
    let parts = [].concat(this.parts).reverse();
    const currentIdx = parts.indexOf(this);
    return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart$2);
  }

  toString() {
    return String(this.date);
  }
}

var datepart$1 = DatePart$2;

class Meridiem$2 extends datepart$1 {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setHours((this.date.getHours() + 12) % 24);
  }

  down() {
    this.up();
  }

  toString() {
    let meridiem = this.date.getHours() > 12 ? 'pm' : 'am';
    return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
  }
}

var meridiem$1 = Meridiem$2;

const pos$1 = n => {
  n = n % 10;
  return n === 1 ? 'st'
       : n === 2 ? 'nd'
       : n === 3 ? 'rd'
       : 'th';
};

class Day$2 extends datepart$1 {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setDate(this.date.getDate() + 1);
  }

  down() {
    this.date.setDate(this.date.getDate() - 1);
  }

  setTo(val) {
    this.date.setDate(parseInt(val.substr(-2)));
  }

  toString() {
    let date = this.date.getDate();
    let day = this.date.getDay();
    return this.token === 'DD' ? String(date).padStart(2, '0')
         : this.token === 'Do' ? date + pos$1(date)
         : this.token === 'd' ? day + 1
         : this.token === 'ddd' ? this.locales.weekdaysShort[day]
         : this.token === 'dddd' ? this.locales.weekdays[day]
         : date;
  }
}

var day$1 = Day$2;

class Hours$2 extends datepart$1 {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setHours(this.date.getHours() + 1);
  }

  down() {
    this.date.setHours(this.date.getHours() - 1);
  }

  setTo(val) {
    this.date.setHours(parseInt(val.substr(-2)));
  }

  toString() {
    let hours = this.date.getHours();
    if (/h/.test(this.token))
      hours = (hours % 12) || 12;
    return this.token.length > 1 ? String(hours).padStart(2, '0') : hours;
  }
}

var hours$1 = Hours$2;

class Milliseconds$2 extends datepart$1 {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setMilliseconds(this.date.getMilliseconds() + 1);
  }

  down() {
    this.date.setMilliseconds(this.date.getMilliseconds() - 1);
  }

  setTo(val) {
    this.date.setMilliseconds(parseInt(val.substr(-(this.token.length))));
  }

  toString() {
    return String(this.date.getMilliseconds()).padStart(4, '0')
                                              .substr(0, this.token.length);
  }
}

var milliseconds$1 = Milliseconds$2;

class Minutes$2 extends datepart$1 {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setMinutes(this.date.getMinutes() + 1);
  }

  down() {
    this.date.setMinutes(this.date.getMinutes() - 1);
  }

  setTo(val) {
    this.date.setMinutes(parseInt(val.substr(-2)));
  }

  toString() {
    let m = this.date.getMinutes();
    return this.token.length > 1 ? String(m).padStart(2, '0') : m;
  }
}

var minutes$1 = Minutes$2;

class Month$2 extends datepart$1 {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setMonth(this.date.getMonth() + 1);
  }

  down() {
    this.date.setMonth(this.date.getMonth() - 1);
  }

  setTo(val) {
    val = parseInt(val.substr(-2)) - 1;
    this.date.setMonth(val < 0 ? 0 : val);
  }

  toString() {
    let month = this.date.getMonth();
    let tl = this.token.length;
    return tl === 2 ? String(month + 1).padStart(2, '0')
           : tl === 3 ? this.locales.monthsShort[month]
             : tl === 4 ? this.locales.months[month]
               : String(month + 1);
  }
}

var month$1 = Month$2;

class Seconds$2 extends datepart$1 {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setSeconds(this.date.getSeconds() + 1);
  }

  down() {
    this.date.setSeconds(this.date.getSeconds() - 1);
  }

  setTo(val) {
    this.date.setSeconds(parseInt(val.substr(-2)));
  }

  toString() {
    let s = this.date.getSeconds();
    return this.token.length > 1 ? String(s).padStart(2, '0') : s;
  }
}

var seconds$1 = Seconds$2;

class Year$2 extends datepart$1 {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setFullYear(this.date.getFullYear() + 1);
  }

  down() {
    this.date.setFullYear(this.date.getFullYear() - 1);
  }

  setTo(val) {
    this.date.setFullYear(val.substr(-4));
  }

  toString() {
    let year = String(this.date.getFullYear()).padStart(4, '0');
    return this.token.length === 2 ? year.substr(-2) : year;
  }
}

var year$1 = Year$2;

var dateparts$1 = {
  DatePart: datepart$1,
  Meridiem: meridiem$1,
  Day: day$1,
  Hours: hours$1,
  Milliseconds: milliseconds$1,
  Minutes: minutes$1,
  Month: month$1,
  Seconds: seconds$1,
  Year: year$1,
};

const { style: style$e, clear: clear$e, figures: figures$b } = util$1;
const { erase: erase$b, cursor: cursor$h } = src;
const { DatePart: DatePart$3, Meridiem: Meridiem$3, Day: Day$3, Hours: Hours$3, Milliseconds: Milliseconds$3, Minutes: Minutes$3, Month: Month$3, Seconds: Seconds$3, Year: Year$3 } = dateparts$1;

const regex$1 = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
const regexGroups$1 = {
  1: ({token}) => token.replace(/\\(.)/g, '$1'),
  2: (opts) => new Day$3(opts), // Day // TODO
  3: (opts) => new Month$3(opts), // Month
  4: (opts) => new Year$3(opts), // Year
  5: (opts) => new Meridiem$3(opts), // AM/PM // TODO (special)
  6: (opts) => new Hours$3(opts), // Hours
  7: (opts) => new Minutes$3(opts), // Minutes
  8: (opts) => new Seconds$3(opts), // Seconds
  9: (opts) => new Milliseconds$3(opts), // Fractional seconds
};

const dfltLocales$1 = {
  months: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
  monthsShort: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
  weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
  weekdaysShort: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
};


/**
 * DatePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Number} [opts.initial] Index of default value
 * @param {String} [opts.mask] The format mask
 * @param {object} [opts.locales] The date locales
 * @param {String} [opts.error] The error message shown on invalid value
 * @param {Function} [opts.validate] Function to validate the submitted value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class DatePrompt$1 extends prompt$2 {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = 0;
    this.typed = '';
    this.locales = Object.assign(dfltLocales$1, opts.locales);
    this._date = opts.initial || new Date();
    this.errorMsg = opts.error || 'Please Enter A Valid Value';
    this.validator = opts.validate || (() => true);
    this.mask = opts.mask || 'YYYY-MM-DD HH:mm:ss';
    this.clear = clear$e('');
    this.render();
  }

  get value() {
    return this.date
  }

  get date() {
    return this._date;
  }

  set date(date) {
    if (date) this._date.setTime(date.getTime());
  }

  set mask(mask) {
    let result;
    this.parts = [];
    while(result = regex$1.exec(mask)) {
      let match = result.shift();
      let idx = result.findIndex(gr => gr != null);
      this.parts.push(idx in regexGroups$1
        ? regexGroups$1[idx]({ token: result[idx] || match, date: this.date, parts: this.parts, locales: this.locales })
        : result[idx] || match);
    }

    let parts = this.parts.reduce((arr, i) => {
      if (typeof i === 'string' && typeof arr[arr.length - 1] === 'string')
        arr[arr.length - 1] += i;
      else arr.push(i);
      return arr;
    }, []);

    this.parts.splice(0);
    this.parts.push(...parts);
    this.reset();
  }

  moveCursor(n) {
    this.typed = '';
    this.cursor = n;
    this.fire();
  }

  reset() {
    this.moveCursor(this.parts.findIndex(p => p instanceof DatePart$3));
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === 'string') {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }

  async submit() {
    await this.validate();
    if (this.error) {
      this.color = 'red';
      this.fire();
      this.render();
      return;
    }
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  up() {
    this.typed = '';
    this.parts[this.cursor].up();
    this.render();
  }

  down() {
    this.typed = '';
    this.parts[this.cursor].down();
    this.render();
  }

  left() {
    let prev = this.parts[this.cursor].prev();
    if (prev == null) return this.bell();
    this.moveCursor(this.parts.indexOf(prev));
    this.render();
  }

  right() {
    let next = this.parts[this.cursor].next();
    if (next == null) return this.bell();
    this.moveCursor(this.parts.indexOf(next));
    this.render();
  }

  next() {
    let next = this.parts[this.cursor].next();
    this.moveCursor(next
      ? this.parts.indexOf(next)
      : this.parts.findIndex((part) => part instanceof DatePart$3));
    this.render();
  }

  _(c) {
    if (/\d/.test(c)) {
      this.typed += c;
      this.parts[this.cursor].setTo(this.typed);
      this.render();
    }
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$h.hide);
    else this.out.write(clear$e(this.outputText));
    super.render();

    // Print prompt
    this.outputText = [
      style$e.symbol(this.done, this.aborted),
      kleur.bold(this.msg),
      style$e.delimiter(false),
      this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? kleur.cyan().underline(p.toString()) : p), [])
          .join('')
    ].join(' ');

    // Print error
    if (this.error) {
      this.outputText += this.errorMsg.split('\n').reduce(
          (a, l, i) => a + `\n${i ? ` ` : figures$b.pointerSmall} ${kleur.red().italic(l)}`, ``);
    }

    this.out.write(erase$b.line + cursor$h.to(0) + this.outputText);
  }
}

var date$1 = DatePrompt$1;

const { cursor: cursor$i, erase: erase$c } = src;
const { style: style$f, figures: figures$c, clear: clear$f, lines: lines$5 } = util$1;

const isNumber$1 = /[0-9]/;
const isDef$1 = any => any !== undefined;
const round$1 = (number, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

/**
 * NumberPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {Number} [opts.initial] Default value
 * @param {Number} [opts.max=+Infinity] Max value
 * @param {Number} [opts.min=-Infinity] Min value
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */
class NumberPrompt$1 extends prompt$2 {
  constructor(opts={}) {
    super(opts);
    this.transform = style$f.render(opts.style);
    this.msg = opts.message;
    this.initial = isDef$1(opts.initial) ? opts.initial : '';
    this.float = !!opts.float;
    this.round = opts.round || 2;
    this.inc = opts.increment || 1;
    this.min = isDef$1(opts.min) ? opts.min : -Infinity;
    this.max = isDef$1(opts.max) ? opts.max : Infinity;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.validator = opts.validate || (() => true);
    this.color = `cyan`;
    this.value = ``;
    this.typed = ``;
    this.lastHit = 0;
    this.render();
  }

  set value(v) {
    if (!v && v !== 0) {
      this.placeholder = true;
      this.rendered = kleur.gray(this.transform.render(`${this.initial}`));
      this._value = ``;
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(`${round$1(v, this.round)}`);
      this._value = round$1(v, this.round);
    }
    this.fire();
  }

  get value() {
    return this._value;
  }

  parse(x) {
    return this.float ? parseFloat(x) : parseInt(x);
  }

  valid(c) {
    return c === `-` || c === `.` && this.float || isNumber$1.test(c)
  }

  reset() {
    this.typed = ``;
    this.value = ``;
    this.fire();
    this.render();
  }

  abort() {
    let x = this.value;
    this.value = x !== `` ? x : this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`\n`);
    this.close();
  }

  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === `string`) {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }

  async submit() {
    await this.validate();
    if (this.error) {
      this.color = `red`;
      this.fire();
      this.render();
      return;
    }
    let x = this.value;
    this.value = x !== `` ? x : this.initial;
    this.done = true;
    this.aborted = false;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`\n`);
    this.close();
  }

  up() {
    this.typed = ``;
    if(this.value === '') {
      this.value = this.min - this.inc;
    }
    if (this.value >= this.max) return this.bell();
    this.value += this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  down() {
    this.typed = ``;
    if(this.value === '') {
      this.value = this.min + this.inc;
    }
    if (this.value <= this.min) return this.bell();
    this.value -= this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  delete() {
    let val = this.value.toString();
    if (val.length === 0) return this.bell();
    this.value = this.parse((val = val.slice(0, -1))) || ``;
    if (this.value !== '' && this.value < this.min) {
      this.value = this.min;
    }
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  next() {
    this.value = this.initial;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (!this.valid(c)) return this.bell();

    const now = Date.now();
    if (now - this.lastHit > 1000) this.typed = ``; // 1s elapsed
    this.typed += c;
    this.lastHit = now;
    this.color = `cyan`;

    if (c === `.`) return this.fire();

    this.value = Math.min(this.parse(this.typed), this.max);
    if (this.value > this.max) this.value = this.max;
    if (this.value < this.min) this.value = this.min;
    this.fire();
    this.render();
  }

  render() {
    if (this.closed) return;
    if (!this.firstRender) {
      if (this.outputError)
        this.out.write(cursor$i.down(lines$5(this.outputError) - 1) + clear$f(this.outputError));
      this.out.write(clear$f(this.outputText));
    }
    super.render();
    this.outputError = '';

    // Print prompt
    this.outputText = [
      style$f.symbol(this.done, this.aborted),
      kleur.bold(this.msg),
      style$f.delimiter(this.done),
      !this.done || (!this.done && !this.placeholder)
          ? kleur[this.color]().underline(this.rendered) : this.rendered
    ].join(` `);

    // Print error
    if (this.error) {
      this.outputError += this.errorMsg.split(`\n`)
          .reduce((a, l, i) => a + `\n${i ? ` ` : figures$c.pointerSmall} ${kleur.red().italic(l)}`, ``);
    }

    this.out.write(erase$c.line + cursor$i.to(0) + this.outputText + cursor$i.save + this.outputError + cursor$i.restore);
  }
}

var number$1 = NumberPrompt$1;

const { cursor: cursor$j } = src;

const { clear: clear$g, figures: figures$d, style: style$g, wrap: wrap$6, entriesToDisplay: entriesToDisplay$6 } = util$1;

/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Number} [opts.optionsPerPage=10] Max options to display at once
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class MultiselectPrompt$1 extends prompt$2 {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = opts.cursor || 0;
    this.scrollIndex = opts.cursor || 0;
    this.hint = opts.hint || '';
    this.warn = opts.warn || '- This option is disabled -';
    this.minSelected = opts.min;
    this.showMinError = false;
    this.maxChoices = opts.max;
    this.instructions = opts.instructions;
    this.optionsPerPage = opts.optionsPerPage || 10;
    this.value = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string')
        ch = {title: ch, value: idx};
      return {
        title: ch && (ch.title || ch.value || ch),
        description: ch && ch.description,
        value: ch && (ch.value === undefined ? idx : ch.value),
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.clear = clear$g('');
    if (!opts.overrideRender) {
      this.render();
    }
  }

  reset() {
    this.value.map(v => !v.selected);
    this.cursor = 0;
    this.fire();
    this.render();
  }

  selected() {
    return this.value.filter(v => v.selected);
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    const selected = this.value
      .filter(e => e.selected);
    if (this.minSelected && selected.length < this.minSelected) {
      this.showMinError = true;
      this.render();
    } else {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length - 1;
    this.render();
  }
  next() {
    this.cursor = (this.cursor + 1) % this.value.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.value.length - 1;
    } else {
      this.cursor--;
    }
    this.render();
  }

  down() {
    if (this.cursor === this.value.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }
    this.render();
  }

  left() {
    this.value[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.value[this.cursor].selected = true;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.value[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  toggleAll() {
    if (this.maxChoices !== undefined || this.value[this.cursor].disabled) {
      return this.bell();
    }

    const newSelected = !this.value[this.cursor].selected;
    this.value.filter(v => !v.disabled).forEach(v => v.selected = newSelected);
    this.render();
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else if (c === 'a') {
      this.toggleAll();
    } else {
      return this.bell();
    }
  }

  renderInstructions() {
    if (this.instructions === undefined || this.instructions) {
      if (typeof this.instructions === 'string') {
        return this.instructions;
      }
      return '\nInstructions:\n'
        + `    ${figures$d.arrowUp}/${figures$d.arrowDown}: Highlight option\n`
        + `    ${figures$d.arrowLeft}/${figures$d.arrowRight}/[space]: Toggle selection\n`
        + (this.maxChoices === undefined ? `    a: Toggle all\n` : '')
        + `    enter/return: Complete answer`;
    }
    return '';
  }

  renderOption(cursor, v, i, arrowIndicator) {
    const prefix = (v.selected ? kleur.green(figures$d.radioOn) : figures$d.radioOff) + ' ' + arrowIndicator + ' ';
    let title, desc;

    if (v.disabled) {
      title = cursor === i ? kleur.gray().underline(v.title) : kleur.strikethrough().gray(v.title);
    } else {
      title = cursor === i ? kleur.cyan().underline(v.title) : v.title;
      if (cursor === i && v.description) {
        desc = ` - ${v.description}`;
        if (prefix.length + title.length + desc.length >= this.out.columns
          || v.description.split(/\r?\n/).length > 1) {
          desc = '\n' + wrap$6(v.description, { margin: prefix.length, width: this.out.columns });
        }
      }
    }

    return prefix + title + kleur.gray(desc || '');
  }

  // shared with autocompleteMultiselect
  paginateOptions(options) {
    if (options.length === 0) {
      return kleur.red('No matches for this query.');
    }

    let { startIndex, endIndex } = entriesToDisplay$6(this.cursor, options.length, this.optionsPerPage);
    let prefix, styledOptions = [];

    for (let i = startIndex; i < endIndex; i++) {
      if (i === startIndex && startIndex > 0) {
        prefix = figures$d.arrowUp;
      } else if (i === endIndex - 1 && endIndex < options.length) {
        prefix = figures$d.arrowDown;
      } else {
        prefix = ' ';
      }
      styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
    }

    return '\n' + styledOptions.join('\n');
  }

  // shared with autocomleteMultiselect
  renderOptions(options) {
    if (!this.done) {
      return this.paginateOptions(options);
    }
    return '';
  }

  renderDoneOrInstructions() {
    if (this.done) {
      return this.value
        .filter(e => e.selected)
        .map(v => v.title)
        .join(', ');
    }

    const output = [kleur.gray(this.hint), this.renderInstructions()];

    if (this.value[this.cursor].disabled) {
      output.push(kleur.yellow(this.warn));
    }
    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$j.hide);
    super.render();

    // print prompt
    let prompt = [
      style$g.symbol(this.done, this.aborted),
      kleur.bold(this.msg),
      style$g.delimiter(false),
      this.renderDoneOrInstructions()
    ].join(' ');
    if (this.showMinError) {
      prompt += kleur.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }
    prompt += this.renderOptions(this.value);

    this.out.write(this.clear + prompt);
    this.clear = clear$g(prompt);
  }
}

var multiselect$1 = MultiselectPrompt$1;

const { erase: erase$d, cursor: cursor$k } = src;
const { style: style$h, clear: clear$h, figures: figures$e, wrap: wrap$7, entriesToDisplay: entriesToDisplay$7 } = util$1;

const getVal$1 = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
const getTitle$1 = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
const getIndex$1 = (arr, valOrTitle) => {
  const index = arr.findIndex(el => el.value === valOrTitle || el.title === valOrTitle);
  return index > -1 ? index : undefined;
};

/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of auto-complete choices objects
 * @param {Function} [opts.suggest] Filter function. Defaults to sort by title
 * @param {Number} [opts.limit=10] Max number of results to show
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.fallback] Fallback message - initial to default value
 * @param {String} [opts.initial] Index of the default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.noMatches] The no matches found label
 */
class AutocompletePrompt$1 extends prompt$2 {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.suggest = opts.suggest;
    this.choices = opts.choices;
    this.initial = typeof opts.initial === 'number'
      ? opts.initial
      : getIndex$1(opts.choices, opts.initial);
    this.select = this.initial || opts.cursor || 0;
    this.i18n = { noMatches: opts.noMatches || 'no matches found' };
    this.fallback = opts.fallback || this.initial;
    this.suggestions = [];
    this.input = '';
    this.limit = opts.limit || 10;
    this.cursor = 0;
    this.transform = style$h.render(opts.style);
    this.scale = this.transform.scale;
    this.render = this.render.bind(this);
    this.complete = this.complete.bind(this);
    this.clear = clear$h('');
    this.complete(this.render);
    this.render();
  }

  set fallback(fb) {
    this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
  }

  get fallback() {
    let choice;
    if (typeof this._fb === 'number')
      choice = this.choices[this._fb];
    else if (typeof this._fb === 'string')
      choice = { title: this._fb };
    return choice || this._fb || { title: this.i18n.noMatches };
  }

  moveSelect(i) {
    this.select = i;
    if (this.suggestions.length > 0)
      this.value = getVal$1(this.suggestions, i);
    else this.value = this.fallback.value;
    this.fire();
  }

  async complete(cb) {
    const p = (this.completing = this.suggest(this.input, this.choices));
    const suggestions = await p;

    if (this.completing !== p) return;
    this.suggestions = suggestions
      .map((s, i, arr) => ({ title: getTitle$1(arr, i), value: getVal$1(arr, i), description: s.description }));
    this.completing = false;
    const l = Math.max(suggestions.length - 1, 0);
    this.moveSelect(Math.min(l, this.select));

    cb && cb();
  }

  reset() {
    this.input = '';
    this.complete(() => {
      this.moveSelect(this.initial !== void 0 ? this.initial : 0);
      this.render();
    });
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) {
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${c}${s2}`;
    this.cursor = s1.length+1;
    this.complete(this.render);
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.input.slice(0, this.cursor-1);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.cursor = this.cursor-1;
    this.render();
  }

  deleteForward() {
    if(this.cursor*this.scale >= this.rendered.length) return this.bell();
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor+1);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.render();
  }

  first() {
    this.moveSelect(0);
    this.render();
  }

  last() {
    this.moveSelect(this.suggestions.length - 1);
    this.render();
  }

  up() {
    if (this.select <= 0) return this.bell();
    this.moveSelect(this.select - 1);
    this.render();
  }

  down() {
    if (this.select >= this.suggestions.length - 1) return this.bell();
    this.moveSelect(this.select + 1);
    this.render();
  }

  next() {
    if (this.select === this.suggestions.length - 1) {
      this.moveSelect(0);
    } else this.moveSelect(this.select + 1);
    this.render();
  }

  nextPage() {
    this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
    this.render();
  }

  prevPage() {
    this.moveSelect(Math.max(this.select - this.limit, 0));
    this.render();
  }

  left() {
    if (this.cursor <= 0) return this.bell();
    this.cursor = this.cursor-1;
    this.render();
  }

  right() {
    if (this.cursor*this.scale >= this.rendered.length) return this.bell();
    this.cursor = this.cursor+1;
    this.render();
  }

  renderOption(v, hovered, isStart, isEnd) {
    let desc;
    let prefix = isStart ? figures$e.arrowUp : isEnd ? figures$e.arrowDown : ' ';
    let title = hovered ? kleur.cyan().underline(v.title) : v.title;
    prefix = (hovered ? kleur.cyan(figures$e.pointer) + ' ' : '  ') + prefix;
    if (v.description) {
      desc = ` - ${v.description}`;
      if (prefix.length + title.length + desc.length >= this.out.columns
        || v.description.split(/\r?\n/).length > 1) {
        desc = '\n' + wrap$7(v.description, { margin: 3, width: this.out.columns });
      }
    }
    return prefix + ' ' + title + kleur.gray(desc || '');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$k.hide);
    else this.out.write(clear$h(this.outputText));
    super.render();

    let { startIndex, endIndex } = entriesToDisplay$7(this.select, this.choices.length, this.limit);

    this.outputText = [
      style$h.symbol(this.done, this.aborted),
      kleur.bold(this.msg),
      style$h.delimiter(this.completing),
      this.done && this.suggestions[this.select]
        ? this.suggestions[this.select].title
        : this.rendered = this.transform.render(this.input)
    ].join(' ');

    if (!this.done) {
      const suggestions = this.suggestions
        .slice(startIndex, endIndex)
        .map((item, i) =>  this.renderOption(item,
          this.select === i + startIndex,
          i === 0 && startIndex > 0,
          i + startIndex === endIndex - 1 && endIndex < this.choices.length))
        .join('\n');
      this.outputText += `\n` + (suggestions || kleur.gray(this.fallback.title));
    }

    this.out.write(erase$d.line + cursor$k.to(0) + this.outputText);
  }
}

var autocomplete$1 = AutocompletePrompt$1;

const { cursor: cursor$l } = src;

const { clear: clear$i, style: style$i, figures: figures$f } = util$1;
/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class AutocompleteMultiselectPrompt$1 extends multiselect$1 {
  constructor(opts={}) {
    opts.overrideRender = true;
    super(opts);
    this.inputValue = '';
    this.clear = clear$i('');
    this.filteredOptions = this.value;
    this.render();
  }

  last() {
    this.cursor = this.filteredOptions.length - 1;
    this.render();
  }
  next() {
    this.cursor = (this.cursor + 1) % this.filteredOptions.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.filteredOptions.length - 1;
    } else {
      this.cursor--;
    }
    this.render();
  }

  down() {
    if (this.cursor === this.filteredOptions.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }
    this.render();
  }

  left() {
    this.filteredOptions[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.filteredOptions[this.cursor].selected = true;
    this.render();
  }

  delete() {
    if (this.inputValue.length) {
      this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
      this.updateFilteredOptions();
    }
  }

  updateFilteredOptions() {
    const currentHighlight = this.filteredOptions[this.cursor];
    this.filteredOptions = this.value
      .filter(v => {
        if (this.inputValue) {
          if (typeof v.title === 'string') {
            if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          if (typeof v.value === 'string') {
            if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          return false;
        }
        return true;
      });
    const newHighlightIndex = this.filteredOptions.findIndex(v => v === currentHighlight);
    this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.filteredOptions[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  handleInputChange(c) {
    this.inputValue = this.inputValue + c;
    this.updateFilteredOptions();
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else {
      this.handleInputChange(c);
    }
  }

  renderInstructions() {
    if (this.instructions === undefined || this.instructions) {
      if (typeof this.instructions === 'string') {
        return this.instructions;
      }
      return `
Instructions:
    ${figures$f.arrowUp}/${figures$f.arrowDown}: Highlight option
    ${figures$f.arrowLeft}/${figures$f.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
    }
    return '';
  }

  renderCurrentInput() {
    return `
Filtered results for: ${this.inputValue ? this.inputValue : kleur.gray('Enter something to filter')}\n`;
  }

  renderOption(cursor, v, i) {
    let title;
    if (v.disabled) title = cursor === i ? kleur.gray().underline(v.title) : kleur.strikethrough().gray(v.title);
    else title = cursor === i ? kleur.cyan().underline(v.title) : v.title;
    return (v.selected ? kleur.green(figures$f.radioOn) : figures$f.radioOff) + '  ' + title
  }

  renderDoneOrInstructions() {
    if (this.done) {
      return this.value
        .filter(e => e.selected)
        .map(v => v.title)
        .join(', ');
    }

    const output = [kleur.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];

    if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
      output.push(kleur.yellow(this.warn));
    }
    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$l.hide);
    super.render();

    // print prompt

    let prompt = [
      style$i.symbol(this.done, this.aborted),
      kleur.bold(this.msg),
      style$i.delimiter(false),
      this.renderDoneOrInstructions()
    ].join(' ');

    if (this.showMinError) {
      prompt += kleur.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }
    prompt += this.renderOptions(this.filteredOptions);

    this.out.write(this.clear + prompt);
    this.clear = clear$i(prompt);
  }
}

var autocompleteMultiselect$1 = AutocompleteMultiselectPrompt$1;

const { style: style$j, clear: clear$j } = util$1;
const { erase: erase$e, cursor: cursor$m } = src;

/**
 * ConfirmPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial] Default value (true/false)
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.yes] The "Yes" label
 * @param {String} [opts.yesOption] The "Yes" option when choosing between yes/no
 * @param {String} [opts.no] The "No" label
 * @param {String} [opts.noOption] The "No" option when choosing between yes/no
 */
class ConfirmPrompt$1 extends prompt$2 {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.value = opts.initial;
    this.initialValue = !!opts.initial;
    this.yesMsg = opts.yes || 'yes';
    this.yesOption = opts.yesOption || '(Y/n)';
    this.noMsg = opts.no || 'no';
    this.noOption = opts.noOption || '(y/N)';
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.value = this.value || false;
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) {
    if (c.toLowerCase() === 'y') {
      this.value = true;
      return this.submit();
    }
    if (c.toLowerCase() === 'n') {
      this.value = false;
      return this.submit();
    }
    return this.bell();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$m.hide);
    else this.out.write(clear$j(this.outputText));
    super.render();

    this.outputText = [
      style$j.symbol(this.done, this.aborted),
      kleur.bold(this.msg),
      style$j.delimiter(this.done),
      this.done ? (this.value ? this.yesMsg : this.noMsg)
          : kleur.gray(this.initialValue ? this.yesOption : this.noOption)
    ].join(' ');

    this.out.write(erase$e.line + cursor$m.to(0) + this.outputText);
  }
}

var confirm$1 = ConfirmPrompt$1;

var elements$1 = {
  TextPrompt: text$1,
  SelectPrompt: select$1,
  TogglePrompt: toggle$1,
  DatePrompt: date$1,
  NumberPrompt: number$1,
  MultiselectPrompt: multiselect$1,
  AutocompletePrompt: autocomplete$1,
  AutocompleteMultiselectPrompt: autocompleteMultiselect$1,
  ConfirmPrompt: confirm$1
};

var prompts$1 = createCommonjsModule(function (module, exports) {
const $ = exports;

const noop = v => v;

function toPrompt(type, args, opts={}) {
  return new Promise((res, rej) => {
    const p = new elements$1[type](args);
    const onAbort = opts.onAbort || noop;
    const onSubmit = opts.onSubmit || noop;
    p.on('state', args.onState || noop);
    p.on('submit', x => res(onSubmit(x)));
    p.on('abort', x => rej(onAbort(x)));
  });
}

/**
 * Text prompt
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.text = args => toPrompt('TextPrompt', args);

/**
 * Password prompt with masked input
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.password = args => {
  args.style = 'password';
  return $.text(args);
};

/**
 * Prompt where input is invisible, like sudo
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.invisible = args => {
  args.style = 'invisible';
  return $.text(args);
};

/**
 * Number prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.number = args => toPrompt('NumberPrompt', args);

/**
 * Date prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.date = args => toPrompt('DatePrompt', args);

/**
 * Classic yes/no prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.confirm = args => toPrompt('ConfirmPrompt', args);

/**
 * List prompt, split intput string by `seperator`
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {string} [args.separator] String separator
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input, in form of an `Array`
 */
$.list = args => {
  const sep = args.separator || ',';
  return toPrompt('TextPrompt', args, {
    onSubmit: str => str.split(sep).map(s => s.trim())
  });
};

/**
 * Toggle/switch prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {string} [args.active="on"] Text for `active` state
 * @param {string} [args.inactive="off"] Text for `inactive` state
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.toggle = args => toPrompt('TogglePrompt', args);

/**
 * Interactive select prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value }, ...]`
 * @param {number} [args.initial] Index of default value
 * @param {String} [args.hint] Hint to display
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.select = args => toPrompt('SelectPrompt', args);

/**
 * Interactive multi-select / autocompleteMultiselect prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value, [selected] }, ...]`
 * @param {number} [args.max] Max select
 * @param {string} [args.hint] Hint to display user
 * @param {Number} [args.cursor=0] Cursor start position
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.multiselect = args => {
  args.choices = [].concat(args.choices || []);
  const toSelected = items => items.filter(item => item.selected).map(item => item.value);
  return toPrompt('MultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

$.autocompleteMultiselect = args => {
  args.choices = [].concat(args.choices || []);
  const toSelected = items => items.filter(item => item.selected).map(item => item.value);
  return toPrompt('AutocompleteMultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

const byTitle = (input, choices) => Promise.resolve(
  choices.filter(item => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase())
);

/**
 * Interactive auto-complete prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of auto-complete choices objects `[{ title, value }, ...]`
 * @param {Function} [args.suggest] Function to filter results based on user input. Defaults to sort by `title`
 * @param {number} [args.limit=10] Max number of results to show
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {String} [args.initial] Index of the default value
 * @param {String} [args.fallback] Fallback message - defaults to initial value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.autocomplete = args => {
  args.suggest = args.suggest || byTitle;
  args.choices = [].concat(args.choices || []);
  return toPrompt('AutocompletePrompt', args);
};
});

const passOn$1 = ['suggest', 'format', 'onState', 'validate', 'onRender', 'type'];
const noop$2 = () => {};

/**
 * Prompt for a series of questions
 * @param {Array|Object} questions Single question object or Array of question objects
 * @param {Function} [onSubmit] Callback function called on prompt submit
 * @param {Function} [onCancel] Callback function called on cancel/abort
 * @returns {Object} Object with values from user input
 */
async function prompt$3(questions=[], { onSubmit=noop$2, onCancel=noop$2 }={}) {
  const answers = {};
  const override = prompt$3._override || {};
  questions = [].concat(questions);
  let answer, question, quit, name, type, lastPrompt;

  const getFormattedAnswer = async (question, answer, skipValidation = false) => {
    if (!skipValidation && question.validate && question.validate(answer) !== true) {
      return;
    }
    return question.format ? await question.format(answer, answers) : answer
  };

  for (question of questions) {
    ({ name, type } = question);

    // evaluate type first and skip if type is a falsy value
    if (typeof type === 'function') {
      type = await type(answer, { ...answers }, question);
      question['type'] = type;
    }
    if (!type) continue;

    // if property is a function, invoke it unless it's a special function
    for (let key in question) {
      if (passOn$1.includes(key)) continue;
      let value = question[key];
      question[key] = typeof value === 'function' ? await value(answer, { ...answers }, lastPrompt) : value;
    }

    lastPrompt = question;

    if (typeof question.message !== 'string') {
      throw new Error('prompt message is required');
    }

    // update vars in case they changed
    ({ name, type } = question);

    if (prompts$1[type] === void 0) {
      throw new Error(`prompt type (${type}) is not defined`);
    }

    if (override[question.name] !== undefined) {
      answer = await getFormattedAnswer(question, override[question.name]);
      if (answer !== undefined) {
        answers[name] = answer;
        continue;
      }
    }

    try {
      // Get the injected answer if there is one or prompt the user
      answer = prompt$3._injected ? getInjectedAnswer$1(prompt$3._injected) : await prompts$1[type](question);
      answers[name] = answer = await getFormattedAnswer(question, answer, true);
      quit = await onSubmit(question, answer, answers);
    } catch (err) {
      quit = !(await onCancel(question, answers));
    }

    if (quit) return answers;
  }

  return answers;
}

function getInjectedAnswer$1(injected) {
  const answer = injected.shift();
    if (answer instanceof Error) {
      throw answer;
    }

    return answer;
}

function inject$1(answers) {
  prompt$3._injected = (prompt$3._injected || []).concat(answers);
}

function override$1(answers) {
  prompt$3._override = Object.assign({}, answers);
}

var lib = Object.assign(prompt$3, { prompt: prompt$3, prompts: prompts$1, inject: inject$1, override: override$1 });

function isNodeLT(tar) {
  tar = (Array.isArray(tar) ? tar : tar.split('.')).map(Number);
  let i=0, src=process.versions.node.split('.').map(Number);
  for (; i < tar.length; i++) {
    if (src[i] > tar[i]) return false;
    if (tar[i] > src[i]) return true;
  }
  return false;
}

var prompts$2 =
  isNodeLT('8.6.0')
    ? dist
    : lib;

const writeFile$2 = util$2.promisify(fs__default.writeFile);
const mkdir$1 = util$2.promisify(fs__default.mkdir);
/**
 * Task to generate component boilerplate.
 */
async function taskGenerate(config) {
    if (!config.configPath) {
        config.logger.error('Please run this command in your root directory (i. e. the one containing stencil.config.ts).');
        exit(1);
    }
    const absoluteSrcDir = config.srcDir;
    if (!absoluteSrcDir) {
        config.logger.error(`Stencil's srcDir was not specified.`);
        return exit(1);
    }
    const input = config.flags.unknownArgs.find(arg => !arg.startsWith('-')) || (await prompts$2({ name: 'tagName', type: 'text', message: 'Component tag name (dash-case):' })).tagName;
    const { dir, base: componentName } = path$1.parse(input);
    const tagError = validateComponentTag(componentName);
    if (tagError) {
        config.logger.error(tagError);
        return exit(1);
    }
    const extensionsToGenerate = ['tsx', ...(await chooseFilesToGenerate())];
    const testFolder = extensionsToGenerate.some(isTest)
        ? 'test'
        : '';
    const outDir = path$1.join(absoluteSrcDir, 'components', dir, componentName);
    await mkdir$1(path$1.join(outDir, testFolder), { recursive: true });
    const writtenFiles = await Promise.all(extensionsToGenerate.map(extension => writeFileByExtension(outDir, componentName, extension, extensionsToGenerate.includes('scss')))).catch(error => config.logger.error(error));
    if (!writtenFiles) {
        return exit(1);
    }
    console.log();
    console.log(`${config.logger.gray('$')} stencil generate ${input}`);
    console.log();
    console.log(config.logger.bold('The following files have been generated:'));
    const absoluteRootDir = config.rootDir;
    writtenFiles.map(file => console.log(`  - ${path$1.relative(absoluteRootDir, file)}`));
}
/**
 * Show a checkbox prompt to select the files to be generated.
 */
const chooseFilesToGenerate = async () => (await prompts$2({
    name: 'filesToGenerate',
    type: 'multiselect',
    message: 'Which additional files do you want to generate?',
    choices: [
        { value: 'scss', title: 'Stylesheet (.scss)', selected: true },
        { value: 'stories.js', title: 'Story (.stories.js)', selected: false },
        { value: 'spec.tsx', title: 'Spec Test  (.spec.tsx)', selected: false },
        { value: 'e2e.ts', title: 'E2E Test (.e2e.ts)', selected: false },
    ],
})).filesToGenerate;
/**
 * Get a file's boilerplate by its extension and write it to disk.
 */
const writeFileByExtension = async (path, name, extension, withCss) => {
    if (isTest(extension)) {
        path = path$1.join(path, 'test');
    }
    const outFile = path$1.join(path, `${name}.${extension}`);
    const boilerplate = getBoilerplateByExtension(name, extension, withCss);
    await writeFile$2(outFile, boilerplate, { flag: 'wx' });
    return outFile;
};
const isTest = (extension) => {
    return extension === 'e2e.ts' || extension === 'spec.tsx';
};
/**
 * Get the boilerplate for a file by its extension.
 */
const getBoilerplateByExtension = (tagName, extension, withCss) => {
    switch (extension) {
        case 'tsx':
            return getComponentBoilerplate(tagName, withCss);
        case 'stories.js':
          return getComponentStory(tagName);
        case 'scss':
            return getStyleUrlBoilerplate();
        case 'spec.tsx':
            return getSpecTestBoilerplate(tagName);
        case 'e2e.ts':
            return getE2eTestBoilerplate(tagName);
        default:
            throw new Error(`Unkown extension "${extension}".`);
    }
};
/**
 * Get the boilerplate for a component.
 */
const getComponentBoilerplate = (tagName, hasStyle) => {
    const decorator = [`{`];
    decorator.push(`  tag: 'we-${tagName}',`);
    if (hasStyle) {
        decorator.push(`  styleUrl: '${tagName}.scss',`);
    }
    decorator.push(`  shadow: true,`);
    decorator.push(`}`);
    return `import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component(${decorator.join('\n')})
export class ${toPascalCase(tagName)} implements ComponentInterface {

  render() {
    return (
      <Host>
        <h1>we-${tagName} is ready!</h1>
      </Host>
    );
  }

}
`;
};
/**
 * Get the boilerplate for a component.
 */
const getComponentStory = (tagName) => `
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|${toPascalCase(tagName)}',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-${tagName}', color, text);

  return html\`
    <we-${tagName}></we-${tagName}>
    <style>
      html {
        \${cssVariables}
      }
    </style>
  \`;
};
`;
/**
 * Get the boilerplate for style.
 */
const getStyleUrlBoilerplate = () => `:host {
  display: block;
}
`;
/**
 * Get the boilerplate for a spec test.
 */
const getSpecTestBoilerplate = (tagName) => `import { newSpecPage } from '@stencil/core/testing';
import { ${toPascalCase(tagName)} } from './${tagName}';

describe('${tagName}', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [${toPascalCase(tagName)}],
      html: \`<${tagName}></${tagName}>\`,
    });
    expect(page.root).toEqualHtml(\`
      <${tagName}>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </${tagName}>
    \`);
  });
});
`;
/**
 * Get the boilerplate for an E2E test.
 */
const getE2eTestBoilerplate = (name) => `import { newE2EPage } from '@stencil/core/testing';

describe('${name}', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<${name}></${name}>');

    const element = await page.find('${name}');
    expect(element).toHaveClass('hydrated');
  });
});
`;
/**
 * Convert a dash case string to pascal case.
 */
const toPascalCase = (str) => str.split('-').reduce((res, part) => res + part[0].toUpperCase() + part.substr(1), '');

function taskHelp(prcs, config) {
    const logger = config.logger;
    const p = logger.dim(prcs.platform === 'win32' ? '>' : '$');
    console.log(`
  ${logger.bold('Build:')} ${logger.dim('Build components for development or production.')}

    ${p} ${logger.green('stencil build [--dev] [--watch] [--prerender] [--debug]')}

      ${logger.cyan('--dev')} ${logger.dim('.............')} Development build
      ${logger.cyan('--watch')} ${logger.dim('...........')} Rebuild when files update
      ${logger.cyan('--serve')} ${logger.dim('...........')} Start the dev-server
      ${logger.cyan('--prerender')} ${logger.dim('.......')} Prerender the application
      ${logger.cyan('--docs')} ${logger.dim('............')} Generate component readme.md docs
      ${logger.cyan('--config')} ${logger.dim('..........')} Set stencil config file
      ${logger.cyan('--stats')} ${logger.dim('...........')} Write stencil-stats.json file
      ${logger.cyan('--log')} ${logger.dim('.............')} Write stencil-build.log file
      ${logger.cyan('--debug')} ${logger.dim('...........')} Set the log level to debug


  ${logger.bold('Test:')} ${logger.dim('Run unit and end-to-end tests.')}

    ${p} ${logger.green('stencil test [--spec] [--e2e]')}

      ${logger.cyan('--spec')} ${logger.dim('............')} Run unit tests with Jest
      ${logger.cyan('--e2e')} ${logger.dim('.............')} Run e2e tests with Puppeteer


  ${logger.bold('Examples:')}

    ${p} ${logger.green('stencil build --dev --watch --serve')}
    ${p} ${logger.green('stencil build --prerender')}
    ${p} ${logger.green('stencil test --spec --e2e')}

`);
}

async function taskServe(process, config) {
    config.suppressLogs = true;
    config.flags.serve = true;
    config.devServer.openBrowser = config.flags.open;
    config.devServer.reloadStrategy = null;
    config.devServer.initialLoadUrl = '/';
    config.devServer.websocket = false;
    config.maxConcurrentWorkers = 1;
    config.devServer.root = process.cwd();
    if (typeof config.flags.root === 'string') {
        if (!path$1__default.isAbsolute(config.flags.root)) {
            config.devServer.root = path$1__default.relative(process.cwd(), config.flags.root);
        }
    }
    config.devServer.root = normalizePath(config.devServer.root);
    const absRoot = path$1__default.join(process.cwd(), config.devServer.root);
    const { startServer } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/dev-server/index.js'))); });
    const devServer = await startServer(config.devServer, config.logger);
    console.log(`${config.logger.cyan('     Root:')} ${absRoot}`);
    console.log(`${config.logger.cyan('  Address:')} ${devServer.address}`);
    console.log(`${config.logger.cyan('     Port:')} ${devServer.port}`);
    console.log(`${config.logger.cyan('   Server:')} ${devServer.browserUrl}`);
    console.log(``);
    process.once('SIGINT', () => {
        devServer && devServer.close();
    });
}

async function taskTest(prcs, config) {
    startupLog(prcs, config);
    try {
        const testingRunOpts = {
            e2e: !!config.flags.e2e,
            screenshot: !!config.flags.screenshot,
            spec: !!config.flags.spec,
            updateScreenshot: !!config.flags.updateScreenshot,
        };
        // always ensure we have jest modules installed
        const ensureModuleIds = ['@types/jest', 'jest', 'jest-cli'];
        if (testingRunOpts.e2e) {
            // if it's an e2e test, also make sure we're got
            // puppeteer modules installed and if browserExecutablePath is provided don't download Chromium use only puppeteer-core instead
            const puppeteer = config.testing.browserExecutablePath ? 'puppeteer-core' : 'puppeteer';
            ensureModuleIds.push('@types/puppeteer', puppeteer);
            if (testingRunOpts.screenshot) {
                // ensure we've got pixelmatch for screenshots
                config.logger.warn(config.logger.yellow(`EXPERIMENTAL: screenshot visual diff testing is currently under heavy development and has not reached a stable status. However, any assistance testing would be appreciated.`));
            }
        }
        // ensure we've got the required modules installed
        // jest and puppeteer are quite large, so this
        // is an experiment to lazy install these
        // modules only when you need them
        await config.sys.lazyRequire.ensure(config.logger, config.rootDir, ensureModuleIds);
        // let's test!
        const { createTesting } = require('@stencil/core/testing/index.js');
        const testing = await createTesting(config);
        const passed = await testing.run(testingRunOpts);
        await testing.destroy();
        if (!passed) {
            exit(1);
        }
    }
    catch (e) {
        config.logger.error(e);
        exit(1);
    }
}

async function runTask(prcs, config, task) {
    switch (task) {
        case 'build':
            await taskBuild(prcs, config);
            break;
        case 'docs':
            await taskDocs(prcs, config);
            break;
        case 'generate':
        case 'g':
            await taskGenerate(config);
            break;
        case 'help':
            taskHelp(prcs, config);
            break;
        case 'prerender':
            await taskPrerender(prcs, config);
            break;
        case 'serve':
            await taskServe(prcs, config);
            break;
        case 'test':
            await taskTest(prcs, config);
            break;
        case 'version':
            await taskVersion();
            break;
        default:
            config.logger.error(`${prcs.platform !== 'win32' ? '❌ ' : ''} Invalid stencil command, please see the options below:`);
            taskHelp(prcs, config);
            exit(1);
    }
}

async function run$1(init) {
    if (!init) {
        throw new Error('cli missing run init');
    }
    const prcs = init.process;
    if (!prcs) {
        throw new Error('cli run missing "process"');
    }
    const logger = init.logger;
    if (!logger) {
        throw new Error('cli run missing "logger"');
    }
    const sys = init.sys;
    if (!sys) {
        throw new Error('cli run missing "sys"');
    }
    try {
        const flags = parseFlags(prcs.argv.slice(2));
        if (flags.ci) {
            logger.colors = false;
        }
        setupNodeProcess(prcs, logger);
        if (sys.getCompilerExecutingPath == null) {
            sys.getCompilerExecutingPath = getCompilerExecutingPath;
        }
        const { loadConfig } = await new Promise(function (resolve) { resolve(_interopNamespace(require('@stencil/core/compiler/stencil'))); });
        const validated = await loadConfig({
            config: {
                flags,
            },
            configPath: flags.config,
            logger,
            sys,
        });
        if (validated.diagnostics.length > 0) {
            logger.printDiagnostics(validated.diagnostics);
            if (hasError(validated.diagnostics)) {
                exit(1);
            }
        }
        setupWorkerController(sys, logger, 'stencil-compiler-worker');
        prcs.title = `Stencil: ${validated.config.namespace}`;
        await runTask(prcs, validated.config, validated.config.flags.task);
    }
    catch (e) {
        if (!shouldIgnoreError(e)) {
            logger.error(`uncaught cli error: ${e}${logger.level === 'debug' ? e.stack : ''}`);
            exit(1);
        }
    }
}
function getCompilerExecutingPath() {
    return path$1.join(__dirname, '..', 'compiler', 'stencil.js');
}
function setupNodeProcess(prcs, logger) {
    try {
        const v = prcs.version.substring(1).split('.');
        const major = parseInt(v[0], 10);
        const minor = parseInt(v[1], 10);
        if (major < 8 || (major === 8 && minor < 9)) {
            logger.error('\nYour current version of Node is ' + prcs.version + " but Stencil needs at least v8.9. It's recommended to install latest Node (https://github.com/nodejs/Release).\n");
            exit(1);
        }
        if (major < 10 || (major === 10 && minor < 13)) {
            logger.warn('\nYour current version of Node is ' +
                prcs.version +
                ', however the recommendation is a minimum of Node LTS (https://github.com/nodejs/Release). Note that future versions of Stencil will eventually remove support for non-LTS Node versions.\n');
        }
    }
    catch (e) { }
    prcs.on(`unhandledRejection`, (e) => {
        if (!shouldIgnoreError(e)) {
            let msg = 'unhandledRejection';
            if (e != null) {
                if (isString(e)) {
                    msg += ': ' + e;
                }
                else if (e.stack) {
                    msg += ': ' + e.stack;
                }
                else if (e.message) {
                    msg += ': ' + e.message;
                }
            }
            logger.error(msg);
        }
    });
}

exports.createNodeLogger = createNodeLogger;
exports.createNodeSystem = createNodeSysWithWatch;
exports.parseFlags = parseFlags;
exports.run = run$1;
exports.runTask = runTask;
