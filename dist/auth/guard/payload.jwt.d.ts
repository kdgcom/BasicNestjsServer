export declare class JWTPayload {
    id: string;
    username: string;
    rank: string;
    memID: number;
    iat: number;
    exp: number;
    constructor(id: any, name: any, rank: any, memID: any, iat?: number, exp?: number);
    static fromObj(obj: any): JWTPayload;
    static fromJWT(jwt: any): Promise<JWTPayload>;
    toJWTAT(): Promise<string>;
    toJWTRT(): Promise<string>;
    toJWT(isAT: any): Promise<string>;
    toJSON(isAT: boolean): {
        iat: number;
        exp: number;
        type?: undefined;
    } | {
        type: string;
        iat: number;
        exp: number;
    };
}
