export declare class MyConst {
    static LISTEN_PORT: string | number;
    static MODE_DEV: number;
    static MODE_PRODUCTION: number;
    static DB_MODE_ORACLE: boolean;
    static PW_SALT_NROUND: number;
    static JWT_SECRET: string;
    static JWT_AT_EXPIREIN: string;
    static JWT_RT_EXPIREIN: string;
    static COOKIE_ALLOWED_DOMAIN: string;
    static checkMode: () => number;
    static mode: number;
    static COOKIE_REFRESH_TOKEN: string;
    static DB_FIELD_MEM_UNIQUE: string;
    static DB_FIELD_MEM_ID: string;
}
