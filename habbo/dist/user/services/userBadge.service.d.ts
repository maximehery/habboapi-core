import { Repository, DeleteResult } from 'typeorm';
import { UserBadgeEntity } from '../entities/userBadge.entity';
export declare class UserBadgeService {
    private readonly userBadgeRepository;
    constructor(userBadgeRepository: Repository<UserBadgeEntity>);
    giveBadge(userIds: Array<number>, badgeCodes: Array<string>): Promise<boolean>;
    removeBadge(userIds: Array<number>, badgeCodes: Array<string>): Promise<DeleteResult>;
}
