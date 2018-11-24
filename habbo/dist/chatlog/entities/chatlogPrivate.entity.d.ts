import { UserEntity } from '../../user/entities/user.entity';
export declare class ChatlogPrivateEntity {
    id: number;
    userFromId: number;
    userToId: number;
    message: string;
    timestamp: number;
    chatlogUser?: UserEntity;
    chatlogReciever?: UserEntity;
}
