"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tape_1 = __importDefault(require("tape"));
var http = __importStar(require("http"));
var koa_1 = __importDefault(require("koa"));
var supertest_1 = __importDefault(require("supertest"));
var cookies = __importStar(require("."));
/* eslint-disable n/handle-callback-err,@typescript-eslint/no-misused-promises */
tape_1.default.test('set cookie', function (t) {
    var app = new koa_1.default();
    app.use(cookies.setCookie('foo', 'bar'));
    (0, supertest_1.default)(http.createServer(app.callback()))
        .get('/')
        .expect(200, function (_, res) {
        t.true(res.headers['set-cookie'][0].includes('foo=bar; path=/;'));
        t.end();
    });
});
tape_1.default.test('clear cookie', function (t) {
    var app = new koa_1.default();
    app.use(cookies.clearCookie('foo'));
    (0, supertest_1.default)(http.createServer(app.callback()))
        .get('/')
        .expect(200, function (_, res) {
        t.true(res.headers['set-cookie'][0].includes('foo=removed;'));
        t.end();
    });
});
tape_1.default.test('config', function (t) {
    var app = new koa_1.default();
    var config = {
        domain: 'example.com'
    };
    app.use(cookies.setCookie('foo', 'bar', config));
    (0, supertest_1.default)(http.createServer(app.callback()))
        .get('/')
        .expect(200, function (_, res) {
        t.true(res.headers['set-cookie'][0].includes('domain=example.com;'));
        t.end();
    });
});
tape_1.default.test('unicode', function (t) {
    var app = new koa_1.default();
    app.use(cookies.setCookie('λ', 'bar'));
    (0, supertest_1.default)(http.createServer(app.callback()))
        .get('/')
        .expect(200, function (_, res) {
        var sc = res.headers['set-cookie'][0];
        t.true(sc.includes('%CE%BB=b'));
        t.true(decodeURIComponent(sc).includes('λ'));
        t.end();
    });
});
