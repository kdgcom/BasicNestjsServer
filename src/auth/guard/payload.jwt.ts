import { JwtService } from "@nestjs/jwt";
import { classToPlain } from "class-transformer";
import { MyConst } from "src/const/MyConst";
import _l from "src/util/logger/log.util";
import { isatty } from "tty";

export class JWTPayload
{
    public id: string;
    public username: string;
    public rank: string;
    public memID: number;
    public iat: number;
    public exp: number;
    public level: number;
    public role: string;

    constructor( id, name, rank, memID, level, role?, iat?: number, exp?: number)
    {
        this.id = id;
        this.username = name;
        this.rank = rank;
        this.memID = memID;
        this.level = level;
        if ( role ) this.role = role;
        if ( iat ) this.iat = iat;
        if ( exp ) this.exp = exp;
    }

    static fromObj( obj )
    {
        if ( obj.iat && obj.exp )
            return new JWTPayload( 
                obj.id, obj.name, obj.rank, obj.memID, obj.level, obj.role, obj.iat, obj.exp 
            );
        else
            return new JWTPayload( obj.id, obj.name, obj.rank, obj.memID, obj.level, obj.role || "" );
    }
    static async fromJWT(jwt)
    {
        return JWTPayload.fromObj(
            await new JwtService().verifyAsync(
            jwt,
            {
              secret: MyConst.JWT_SECRET
            }
          ));
    }

    // access_token으로 JWT를 뽑아 낼 때
    async toJWTAT() { return await this.toJWT(true); }
    async toJWTRT() { return await this.toJWT(false); }

    // access_token으로 JWT를 뽑아 낼 때
    async toJWT(isAT)
    {
        return await new JwtService().signAsync(
            this.toJSON(isAT), { secret: MyConst.JWT_SECRET, }
        );
    }

    /**
     * JSON 변경시 iat, exp를 기본으로 설정하여 외부로 제공한다.
     * MyConst에 적용된 JWT expire 정책에 따라 exp를 적용한다.
     * @param isAT access_token에 대한 JWT인가?
     * @returns 
     */
    toJSON(isAT: boolean)
    {
        const json = classToPlain(this);
        let expStr = null;
        const iat = Math.floor(new Date().getTime()/1000); // issue at. 단위 - 초
        if ( isAT )
            expStr = MyConst.JWT_AT_EXPIREIN;
        else
            expStr = MyConst.JWT_RT_EXPIREIN;
        if ( !expStr.match(/^[0-9]+[smhdMy]$/) )
            expStr = "1d";
        // 시간을 초단위로 환산
        let timeConst = 1;
        switch(expStr.match(/[smhdMy]/)[0])
        {
            case 's':
                timeConst = 1;
                break;
            case 'm':
                timeConst = 60;
                break;
            case 'h':
                timeConst = 60*60;
                break;
            case 'd':
                timeConst = 24*60*60;
                break;
            case 'M':
                timeConst = 30*24*60*60;
                break;
            case 'y':
                timeConst = 365*24*60*60;
                break;
        }
        const exp = iat + parseInt(expStr)*timeConst;

        if ( isAT )
            return {...json, iat, exp}
        else    // refresh_token일 경우 사용자의 자료를 가지고 있으면 안됨
            return { type:"refresh_token", iat, exp, memID: this.memID }
    }
}