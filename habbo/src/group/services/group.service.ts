import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISearchOptions, RepositoryHelper } from '@habboapi/common';

import { GroupEntity } from '../entities/group.entity';
import { IGroup, IGroupList } from '../interfaces';

@Injectable()
export class GroupService
{
    constructor(
        @InjectRepository(GroupEntity)
        private readonly groupRepository: Repository<GroupEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IGroupList>
    {
        return await RepositoryHelper.search(this.groupRepository, searchOptions || null);
    }

    async getOne(groupId: number, relations?: Array<string>): Promise<IGroup>
    {
        if(!groupId) return Promise.reject('invalid_parameters');

        return await this.groupRepository.findOne({
            where: { id: groupId },
            relations: relations
        });
    }

    async totalGroups(): Promise<number>
    {
        return await this.groupRepository.count();
    }
}