import { UserEntity } from '../../user/entities/user.entity';
export declare class BanEntity {
    id: number;
    userId: number;
    ip: string;
    machineId: string;
    userStaffId: number;
    timestamp: number;
    banExpire: number;
    banReason: string;
    type: 'account' | 'ip' | 'machine' | 'super';
    cfhTopic: number;
    banUser?: UserEntity;
    banStaff?: UserEntity;
}
