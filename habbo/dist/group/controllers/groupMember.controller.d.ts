import { GroupMemberService } from '../services/groupMember.service';
import { IGroupMember, IGroupMemberList } from '../interfaces';
export declare class GroupMemberController {
    private readonly groupMemberService;
    constructor(groupMemberService: GroupMemberService);
    getAll(params: any): Promise<IGroupMemberList>;
    getOne(params: any): Promise<IGroupMember>;
    searchAll(body: any): Promise<IGroupMemberList>;
}
