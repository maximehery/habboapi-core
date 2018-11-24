import { Repository } from 'typeorm';
import { GroupEntity } from '../entities/group.entity';
import { ISearchOptions } from '@habboapi/common';
import { IGroup, IGroupList } from '../interfaces';
export declare class GroupService {
    private readonly groupRepository;
    constructor(groupRepository: Repository<GroupEntity>);
    getAll(searchOptions?: ISearchOptions): Promise<IGroupList>;
    getOne(groupId: number, relations?: Array<string>): Promise<IGroup>;
}
