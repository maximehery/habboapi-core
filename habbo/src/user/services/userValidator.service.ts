import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserValidatorService
{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>) {}

    async validateUsername(username: string): Promise<boolean>
    {
        let regex = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{1,20}$/g);

        if(!username || !regex.test(username)) throw new Error('invalidParameters');

        const result = await this.userRepository.findOne({
            select: ['username'],
            where: { username: username }
        });

        if(result) throw new Error('usernameUnavailable');

        return true;
    }

    async validateEmail(email: string): Promise<boolean>
    {
        let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);

        if(!email || !regex.test(email)) throw new Error('invalidParameters');

        const result = await this.userRepository.findOne({
            select: ['mail'],
            where: { mail: email }
        });

        if(result) throw new Error('emailUnavailable');
        
        return true;
    }
}