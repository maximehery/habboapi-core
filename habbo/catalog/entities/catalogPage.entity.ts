import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { CatalogItemEntity } from './catalogItem.entity';

@Entity('catalog_pages')
export class CatalogPageEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'parent_id' })
    parentId: number;

    @Column({ name: 'caption_save' })
    captionSave: string;

    @Column({ name: 'caption' })
    caption: string;

    @Column({ name: 'icon_color' })
    iconColor: number;

    @Column({ name: 'icon_image' })
    iconImage: number;

    @Column({ name: 'visible', type: 'enum', enum: ['0', '1'] })
    visible: '0' | '1';

    @Column({ name: 'enabled', type: 'enum', enum: ['0', '1'] })
    enabled: '0' | '1';

    @Column({ name: 'min_rank' })
    minRank: number;

    @Column({ name: 'club_only', type: 'enum', enum: ['0', '1'] })
    clubOnly: '0' | '1';

    @Column({ name: 'order_num' })
    orderNum: number;

    @Column({ name: 'page_layout', type: 'enum', enum: ['default_3x3', 'club_buy', 'club_gift', 'frontpage', 'spaces', 'recycler', 'recycler_info', 'recycler_prizes', 'trophies', 'plasto', 'marketplace', 'marketplace_own_items', 'pets', 'spaces_new', 'soundmachine', 'guilds', 'guild_furni', 'info_duckets', 'info_rentables', 'info_pets', 'roomads', 'single_bundle', 'sold_ltd_items', 'badge_display', 'bots', 'pets2', 'pets3', 'productpage1', 'room_bundle', 'recent_purchases', 'pets2', 'pets3', 'default_3x3_color_grouping', 'guild_forum', 'vip_buy', 'info_loyalty', 'loyalty_vip_buy', 'collectibles', 'frontpage_featured'] })
    pageLayout: 'default_3x3' | 'club_buy' | 'club_gift' | 'frontpage' | 'spaces' | 'recycler' | 'recycler_info' | 'recycler_prizes' | 'trophies' | 'plasto' | 'marketplace' | 'marketplace_own_items' | 'pets' | 'spaces_new' | 'soundmachine' | 'guilds' | 'guild_furni' | 'info_duckets' | 'info_rentables' | 'info_pets' | 'roomads' | 'single_bundle' | 'sold_ltd_items' | 'badge_display' | 'bots' | 'pets2' | 'pets3' | 'productpage1' | 'room_bundle' | 'recent_purchases' | 'pets2' | 'pets3' | 'default_3x3_color_grouping' | 'guild_forum' | 'vip_buy' | 'info_loyalty' | 'loyalty_vip_buy' | 'collectibles' | 'frontpage_featured';

    @Column({ name: 'page_headline' })
    pageHeadline: string;

    @Column({ name: 'page_teaser' })
    pageTeaser: string;

    @Column({ name: 'page_special' })
    pageSpecial: string;

    @Column({ name: 'page_text1' })
    pageText1: string;

    @Column({ name: 'page_text2' })
    pageText2: string;

    @Column({ name: 'page_text_details' })
    pageTextDetails: string;

    @Column({ name: 'page_text_teaser' })
    pageTextTeaser: string;

    @Column({ name: 'vip_only', type: 'enum', enum: ['0', '1'] })
    vipOnly: '0' | '1';

    @Column({ name: 'includes' })
    includes: string;

    @Column({ name: 'room_id' })
    roomId: number;

    @OneToMany(type => CatalogItemEntity, item => item.itemPage)
    pageItems?: CatalogItemEntity[];
}