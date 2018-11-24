import { Repository } from 'typeorm';
import { GroupMemberEntity } from '../entities/groupMember.entity';
import { ISearchOptions } from '@habboapi/common';
import { IGroupMember, IGroupMemberList } from '../interfaces';
export declare class GroupMemberService {
    private readonly groupMemberRepository;
    constructor(groupMemberRepository: Repository<GroupMemberEntity>);
    getAll(searchOptions?: ISearchOptions): Promise<IGroupMemberList>;
    getOne(groupMembershipId: number, relations?: Array<string>): Promise<IGroupMember>;
}
