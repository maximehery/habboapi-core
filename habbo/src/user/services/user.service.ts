import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISearchOptions, RepositoryHelper } from '@habboapi/common';

import { UserEntity } from '../entities';
import { IUser, IUserList } from '../interfaces';

@Injectable()
export class UserService
{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IUserList>
    {
        return await RepositoryHelper.search(this.userRepository, searchOptions || null);
    }

    async getOne(itemId: number, relations?: string[]): Promise<IUser>
    {
        if(!itemId) return Promise.reject('invalid_parameters');

        return await this.userRepository.findOne({
            where: { id: itemId },
            relations: relations
        });
    }

    async login(username: string): Promise<{ id: number; username: string; password: string; look: string; rank: number; }>
    {
        if(!username) return Promise.reject('invalid_parameters');
        
        return await this.userRepository.findOne({
            select: ['id', 'username', 'password', 'look', 'rank'],
            where: { username: username }
        });
    }

    async totalUsers(): Promise<number>
    {
        return await this.userRepository.count();
    }
}