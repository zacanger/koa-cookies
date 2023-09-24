import * as Koa from 'koa';
declare const defaultNext: () => Promise<void>;
export declare const setCookie: (s: string, value: any, config?: {}) => (ctx: Koa.Context, next?: () => Promise<void>) => Promise<void>;
export declare const clearCookie: (s: string, config?: {}) => (ctx: Koa.Context, next?: () => Promise<void>) => Promise<void>;
export declare const parseCookie: (s?: string) => (ctx: Koa.Context, next?: typeof defaultNext) => Promise<string | undefined>;
export {};
