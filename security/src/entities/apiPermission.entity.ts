import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('api_permissions')
export class ApiPermissionEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'rank_name' })
    rankName: string;

    @Column({ name: 'catalog', type: 'enum', enum: ['0', '1'] })
    catalog: '0' | '1';

    @Column({ name: 'catalog_patch', type: 'enum', enum: ['0', '1'] })
    catalogPatch: '0' | '1';

    @Column({ name: 'catalog_put', type: 'enum', enum: ['0', '1'] })
    catalogPut: '0' | '1';

    @Column({ name: 'catalog_delete', type: 'enum', enum: ['0', '1'] })
    catalogDelete: '0' | '1';

    @Column({ name: 'chatlog', type: 'enum', enum: ['0', '1'] })
    chatlog: '0' | '1';

    @Column({ name: 'chatlog_delete', type: 'enum', enum: ['0', '1'] })
    chatlogDelete: '0' | '1';

    @Column({ name: 'chatlog_backup', type: 'enum', enum: ['0', '1'] })
    chatlogBackup: '0' | '1';

    @Column({ name: 'item', type: 'enum', enum: ['0', '1'] })
    item: '0' | '1';

    @Column({ name: 'item_patch', type: 'enum', enum: ['0', '1'] })
    itemPatch: '0' | '1';

    @Column({ name: 'item_put', type: 'enum', enum: ['0', '1'] })
    itemPut: '0' | '1';

    @Column({ name: 'item_delete', type: 'enum', enum: ['0', '1'] })
    itemDelete: '0' | '1';

    @Column({ name: 'group', type: 'enum', enum: ['0', '1'] })
    group: '0' | '1';

    @Column({ name: 'room', type: 'enum', enum: ['0', '1'] })
    room: '0' | '1';

    @Column({ name: 'user', type: 'enum', enum: ['0', '1'] })
    user: '0' | '1';

    @Column({ name: 'user_patch', type: 'enum', enum: ['0', '1'] })
    userPatch: '0' | '1';

    @Column({ name: 'user_put', type: 'enum', enum: ['0', '1'] })
    userPut: '0' | '1';

    @Column({ name: 'user_delete', type: 'enum', enum: ['0', '1'] })
    userDelete: '0' | '1';

    @Column({ name: 'user_badge_put', type: 'enum', enum: ['0', '1'] })
    userBadgePut: '0' | '1';

    @Column({ name: 'user_badge_delete', type: 'enum', enum: ['0', '1'] })
    userBadgeDelete: '0' | '1';
}