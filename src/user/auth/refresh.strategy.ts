import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';

export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-strategy"){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'Thisismyrefreshtokenkey',
        })
    }

    async validate(req:Request,payload){
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken
        };
    }
}