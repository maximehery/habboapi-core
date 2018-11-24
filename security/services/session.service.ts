import { Injectable } from '@nestjs/common';

import * as JWT from 'jsonwebtoken';

import { ConfigService } from '@habboapi/common';

import { ISession } from '../interfaces';

@Injectable()
export class SessionService
{
    constructor(private readonly configService: ConfigService) {}
    
    createToken(payload: ISession): string
    {
        if(!payload) return null;

        const token = JWT.sign(payload, this.configService.config.session.secret, {
            expiresIn: '1d',
            issuer: this.configService.config.public.name
        });

        return token;
    }

    validateToken(token: string): ISession
    {
        try
        {
            const payload = <ISession>JWT.verify(token, this.configService.config.session.secret, {
                issuer: [ this.configService.config.public.name ]
            });

            return payload;
        }

        catch(err)
        {
            return null;
        }
    }
}