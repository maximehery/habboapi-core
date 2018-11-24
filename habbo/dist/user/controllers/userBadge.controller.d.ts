import { UserBadgeService } from '../services/userBadge.service';
export declare class UserBadgeController {
    private readonly userBadgeService;
    constructor(userBadgeService: UserBadgeService);
    giveBadge(body: any): Promise<any>;
    remove(body: any): Promise<any>;
}
