import { GroupService } from '../services/group.service';
import { IGroup, IGroupList } from '../interfaces';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    getAll(params: any): Promise<IGroupList>;
    getOne(params: any): Promise<IGroup>;
    searchAll(body: any): Promise<IGroupList>;
}
