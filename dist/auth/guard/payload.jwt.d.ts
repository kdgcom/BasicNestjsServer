export declare class JWTPayload {
    id: string;
    username: string;
    rank: string;
    memID: number;
    iat: number;
    exp: number;
    level: number;
    role: string | null;
    constructor(id: string, name: string, rank: string, memID: number, level: number, role?: string, iat?: number, exp?: number);
    static fromObj(obj: any): JWTPayload;
    static fromJWT(jwt: string): Promise<JWTPayload>;
    toJWTAT(): Promise<string>;
    toJWTRT(): Promise<string>;
    toJWT(isAT: boolean): Promise<string>;
    toJSON(isAT: boolean): {
        iat: number;
        exp: number;
        type?: undefined;
        memID?: undefined;
    } | {
        type: string;
        iat: number;
        exp: number;
        memID: number;
    };
}
