"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTPayload = void 0;
const jwt_1 = require("@nestjs/jwt");
const class_transformer_1 = require("class-transformer");
const MyConst_1 = require("../../const/MyConst");
class JWTPayload {
    constructor(id, name, rank, memID, level, role, iat, exp) {
        this.iat = 0;
        this.exp = 0;
        this.role = null;
        this.id = id;
        this.username = name;
        this.rank = rank;
        this.memID = memID;
        this.level = level;
        if (role)
            this.role = role;
        if (iat)
            this.iat = iat;
        if (exp)
            this.exp = exp;
    }
    static fromObj(obj) {
        if (obj.iat && obj.exp)
            return new JWTPayload(obj.id, obj.name, obj.rank, obj.memID, obj.level, obj.role, obj.iat, obj.exp);
        else
            return new JWTPayload(obj.id, obj.name, obj.rank, obj.memID, obj.level, obj.role || "");
    }
    static async fromJWT(jwt) {
        return JWTPayload.fromObj(await new jwt_1.JwtService().verifyAsync(jwt, {
            secret: MyConst_1.MyConst.JWT_SECRET
        }));
    }
    async toJWTAT() { return await this.toJWT(true); }
    async toJWTRT() { return await this.toJWT(false); }
    async toJWT(isAT) {
        return await new jwt_1.JwtService().signAsync(this.toJSON(isAT), { secret: MyConst_1.MyConst.JWT_SECRET, });
    }
    toJSON(isAT) {
        const json = (0, class_transformer_1.classToPlain)(this);
        let expStr = null;
        const iat = Math.floor(new Date().getTime() / 1000);
        if (isAT)
            expStr = MyConst_1.MyConst.JWT_AT_EXPIREIN;
        else
            expStr = MyConst_1.MyConst.JWT_RT_EXPIREIN;
        if (!expStr.match(/^[0-9]+[smhdMy]$/))
            expStr = "1d";
        let timeConst = 1;
        switch (expStr.match(/[smhdMy]/)[0]) {
            case 's':
                timeConst = 1;
                break;
            case 'm':
                timeConst = 60;
                break;
            case 'h':
                timeConst = 60 * 60;
                break;
            case 'd':
                timeConst = 24 * 60 * 60;
                break;
            case 'M':
                timeConst = 30 * 24 * 60 * 60;
                break;
            case 'y':
                timeConst = 365 * 24 * 60 * 60;
                break;
        }
        const exp = iat + parseInt(expStr) * timeConst;
        if (isAT)
            return { ...json, iat, exp };
        else
            return { type: "refresh_token", iat, exp, memID: this.memID };
    }
}
exports.JWTPayload = JWTPayload;
//# sourceMappingURL=payload.jwt.js.map