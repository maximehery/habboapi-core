import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities';

@Injectable()
export class UserValidatorService
{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>) {}

    async validateUsername(username: string): Promise<boolean>
    {
        const regex = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{1,20}$/g);

        if(!username || !regex.test(username)) return Promise.reject('invalid_parameters');

        const result = await this.userRepository.findOne({
            select: ['username'],
            where: { username: username }
        });

        if(result) return Promise.reject('username_unavailable');

        return Promise.resolve(true);
    }

    async validateEmail(email: string): Promise<boolean>
    {
        const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);

        if(!email || !regex.test(email)) return Promise.reject('invalid_parameters');

        const result = await this.userRepository.findOne({
            select: ['mail'],
            where: { mail: email }
        });

        if(result) return Promise.reject('email_unavailable');
        
        return Promise.resolve(true);
    }
}