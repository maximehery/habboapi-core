import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { CatalogItemEntity } from '../../catalog';
import { ItemEntity } from '../../item';

@Entity('items_base')
export class ItemBaseEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'item_name' })
    itemName: string;

    @Column({ name: 'public_name' })
    publicName: string;

    @Column({ name: 'type', type: 'enum', enum: ['s', 'i', 'e', 'h', 'v', 'r', 'b', 'p'] })
    type: 's' | 'i' | 'e' | 'h' | 'v' | 'r' | 'b' | 'p';

    @Column({ name: 'width' })
    width: number;

    @Column({ name: 'length' })
    length: number;

    @Column({ name: 'stack_height' })
    stackHeight: number;

    @Column({ name: 'allow_stack', type: 'enum', enum: ['0', '1'] })
    allowStack: '0' | '1';

    @Column({ name: 'allow_sit', type: 'enum', enum: ['0', '1'] })
    allowSit: '0' | '1';

    @Column({ name: 'allow_lay', type: 'enum', enum: ['0', '1'] })
    allowLay: '0' | '1';

    @Column({ name: 'allow_walk', type: 'enum', enum: ['0', '1'] })
    allowWalk: '0' | '1';

    @Column({ name: 'sprite_id' })
    spriteId: number;

    @Column({ name: 'allow_recycle', type: 'enum', enum: ['0', '1'] })
    allowRecycle: '0' | '1';

    @Column({ name: 'allow_trade', type: 'enum', enum: ['0', '1'] })
    allowTrade: '0' | '1';

    @Column({ name: 'allow_marketplace_sell', type: 'enum', enum: ['0', '1'] })
    allowMarketplaceSell: '0' | '1';

    @Column({ name: 'allow_gift', type: 'enum', enum: ['0', '1'] })
    allowGift: '0' | '1';

    @Column({ name: 'allow_inventory_stack', type: 'enum', enum: ['0', '1'] })
    allowInventoryStack: '0' | '1';

    @Column({ name: 'interaction_type' })
    interactionType: string;

    @Column({ name: 'interaction_modes_count' })
    interactionModesCount: number;

    @Column({ name: 'vending_ids' })
    vendingIds: string;

    @Column({ name: 'multiheight' })
    multiHeight: string;

    @Column({ name: 'effect_id_male' })
    effectIdMale: number;

    @Column({ name: 'effect_id_female' })
    effectIdFemale: number;

    @Column({ name: 'customparams' })
    customParams: string;

    @OneToMany(type => ItemEntity, item => item.itemBase)
    baseItems?: ItemEntity[];

    @OneToMany(type => CatalogItemEntity, item => item.itemBase)
    baseCatalogItems?: CatalogItemEntity[];
}