import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { ItemBaseEntity } from '../../item';

import { CatalogPageEntity } from './catalogPage.entity';

@Entity('catalog_items')
export class CatalogItemEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id?: number;

    @Column({ name: 'page_id' })
    pageId: number;

    @Column({ name: 'item_ids' })
    itemIds: number;

    @Column({ name: 'catalog_name' })
    catalogName: string;

    @Column({ name: 'cost_credits' })
    costCredits: number;

    @Column({ name: 'cost_points' })
    costPoints: number;

    @Column({ name: 'points_type' })
    pointsType: number;

    @Column({ name: 'amount' })
    amount: number;

    @Column({ name: 'song_id' })
    songId: number;

    @Column({ name: 'limited_stack' })
    limitedStack: number;

    @Column({ name: 'limited_sells' })
    limitedSells: number;

    @Column({ name: 'extradata' })
    extraData: string;

    @Column({ name: 'club_only', type: 'enum', enum: ['0', '1'] })
    clubOnly: '0' | '1';

    @Column({ name: 'have_offer', type: 'enum', enum: ['0', '1'] })
    haveOffer: '0' | '1';

    @Column({ name: 'offer_id' })
    offerId: number;

    @Column({ name: 'order_number' })
    orderNum: number;

    @ManyToOne(type => CatalogPageEntity)
    @JoinColumn({ name: 'page_id'})
    itemPage?: CatalogPageEntity;

    @ManyToOne(type => ItemBaseEntity)
    @JoinColumn({ name: 'item_ids'})
    itemBase?: ItemBaseEntity;
}