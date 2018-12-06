import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISearchOptions, RepositoryHelper } from '@habboapi/common';

import { GroupMemberEntity } from '../entities/groupMember.entity';
import { IGroupMember, IGroupMemberList } from '../interfaces';

@Injectable()
export class GroupMemberService
{
    constructor(
        @InjectRepository(GroupMemberEntity)
        private readonly groupMemberRepository: Repository<GroupMemberEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IGroupMemberList>
    {
        return await RepositoryHelper.search(this.groupMemberRepository, searchOptions || null);
    }

    async getOne(groupMembershipId: number, relations?: Array<string>): Promise<IGroupMember>
    {
        if(!groupMembershipId) return Promise.reject('invalid_parameters');

        return await this.groupMemberRepository.findOne({
            where: { id: groupMembershipId },
            relations: relations
        });
    }

    async totalMemberships(): Promise<number>
    {
        return this.groupMemberRepository.count();
    }
}