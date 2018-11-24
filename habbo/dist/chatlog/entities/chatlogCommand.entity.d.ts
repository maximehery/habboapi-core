import { UserEntity } from '../../user/entities/user.entity';
export declare class ChatlogCommandEntity {
    id: number;
    userId: number;
    timestamp: number;
    command: string;
    params: string;
    success: '0' | '1';
    chatlogUser?: UserEntity;
}
