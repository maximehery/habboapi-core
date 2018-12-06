import { Injectable } from '@nestjs/common';

import { sign, verify } from 'jsonwebtoken';

import { ConfigService } from '@habboapi/common';

import { ISession } from '../interfaces';

@Injectable()
export class SessionService
{
    constructor(private readonly configService: ConfigService) {}
    
    createToken(payload: ISession): string
    {
        try
        {
            if(!payload) return null;

            const token = sign(payload, this.configService.config.session.secret, {
                expiresIn: '1d',
                issuer: this.configService.config.public.name
            });

            return token;
        }

        catch(err)
        {
            return null;
        }
    }

    validateToken(token: string): ISession
    {
        try
        {
            if(!token) return null;

            const payload = <ISession>verify(token, this.configService.config.session.secret, {
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