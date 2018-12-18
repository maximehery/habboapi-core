import { Injectable } from '@nestjs/common';

import { PasswordHelper } from '@habboapi/common';
import { UserService } from '@habboapi/habbo';

import { ISession } from '../interfaces';

import { PermissionService } from './permission.service';
import { SessionService } from './session.service';

@Injectable()
export class AuthenticationService
{
    constructor(
        private readonly userService: UserService,
        private readonly permissionService: PermissionService,
        private readonly sessionService: SessionService) {}
    
    async login(username: string, password: string): Promise<{ sessionToken: string, session: ISession}>
    {
        if(!username || !password) throw new Error('invalid_parameters');

        const result = await this.userService.login(username);

        if(!result) throw new Error('invalid_login');

        if(!PasswordHelper.validatePassword(password, result.password)) throw new Error('invalid_login');

        const payload: ISession = {
            id: result.id,
            username: result.username,
            look: result.look,
            rank: result.rank
        };

        const token         = this.sessionService.createToken(payload);
        const permissions   = this.permissionService.getPermissions(payload.rank);

        return Promise.resolve({
            sessionToken: token,
            session: {
                id: payload.id,
                username: payload.username,
                look: payload.look,
                rank: payload.rank,
                permissions: permissions
            }
        });
    }
}