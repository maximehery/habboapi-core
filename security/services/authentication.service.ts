import { Injectable } from '@nestjs/common';

import { PasswordHelper } from '@habboapi/common';

import { UserService } from '@habboapi/habbo';
import { SessionService } from './session.service';

@Injectable()
export class AuthenticationService
{
    constructor(
        private readonly userService: UserService,
        private readonly sessionService: SessionService) {}
    
    async login(username: string, password: string): Promise<string>
    {
        if(!username || !password) return Promise.reject('invalidParameters');

        const result = await this.userService.login(username);

        if(!result) return Promise.reject('invalidLogin');

        if(!PasswordHelper.validatePassword(password, result.password)) return Promise.reject('invalidLogin');

        const payload = {
            id: result.id,
            username: result.username,
            look: result.look,
            rank: result.rank
        };

        const token = this.sessionService.createToken(payload);

        return Promise.resolve(token);
    }
}