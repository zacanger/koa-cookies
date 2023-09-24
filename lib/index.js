"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = exports.clearCookie = exports.setCookie = void 0;
var defaultNext = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, Promise.resolve()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var getFutureDate = function () {
    var d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
};
var getDefaultSetConfig = function (ctx) { return ({
    domain: ctx.host,
    maxAge: 604800,
    expires: getFutureDate()
}); };
var setCookie = function (s, value, config) {
    if (config === void 0) { config = {}; }
    return function (ctx, next) {
        if (next === void 0) { next = defaultNext; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.cookies.set(encodeURIComponent(s), encodeURIComponent(value), Object.assign({}, getDefaultSetConfig(ctx), config));
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
};
exports.setCookie = setCookie;
var getDefaultClearConfig = function (ctx) { return ({
    domain: ctx.host,
    maxAge: 1,
    expires: new Date(1)
}); };
var clearCookie = function (s, config) {
    if (config === void 0) { config = {}; }
    return function (ctx, next) {
        if (next === void 0) { next = defaultNext; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.cookies.set(encodeURIComponent(s), 'removed', Object.assign({}, getDefaultClearConfig(ctx), config));
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
};
exports.clearCookie = clearCookie;
// TODO: in here, we could add more functionality,
// like express's cookie-parser
var getCookies = function (cookieStr) {
    if (cookieStr === void 0) { cookieStr = ''; }
    return cookieStr.split(';')
        .reduce(function (prev, curr) {
        var _a = __read(curr.split('='), 2), k = _a[0], v = _a[1];
        if (k != null && v != null) {
            prev[k] = v;
        }
        return prev;
    }, {});
};
var parseCookie = function (s) {
    return function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
        var allCookies;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    allCookies = getCookies((_b = (_a = ctx.headers) === null || _a === void 0 ? void 0 : _a.cookie) !== null && _b !== void 0 ? _b : '');
                    ctx.cookie = __assign(__assign({}, ctx.cookie), allCookies);
                    if (!((next != null) && typeof next === 'function')) return [3 /*break*/, 2];
                    return [4 /*yield*/, next()];
                case 1:
                    _c.sent();
                    _c.label = 2;
                case 2:
                    if (s != null) {
                        return [2 /*return*/, allCookies[s]];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
};
exports.parseCookie = parseCookie;
