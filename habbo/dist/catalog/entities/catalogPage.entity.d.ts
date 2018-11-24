import { CatalogItemEntity } from './catalogItem.entity';
export declare class CatalogPageEntity {
    id: number;
    parentId: number;
    captionSave: string;
    caption: string;
    iconColor: number;
    iconImage: number;
    visible: '0' | '1';
    enabled: '0' | '1';
    minRank: number;
    clubOnly: '0' | '1';
    orderNum: number;
    pageLayout: 'default_3x3' | 'club_buy' | 'club_gift' | 'frontpage' | 'spaces' | 'recycler' | 'recycler_info' | 'recycler_prizes' | 'trophies' | 'plasto' | 'marketplace' | 'marketplace_own_items' | 'pets' | 'spaces_new' | 'soundmachine' | 'guilds' | 'guild_furni' | 'info_duckets' | 'info_rentables' | 'info_pets' | 'roomads' | 'single_bundle' | 'sold_ltd_items' | 'badge_display' | 'bots' | 'pets2' | 'pets3' | 'productpage1' | 'room_bundle' | 'recent_purchases' | 'pets2' | 'pets3' | 'default_3x3_color_grouping' | 'guild_forum' | 'vip_buy' | 'info_loyalty' | 'loyalty_vip_buy' | 'collectibles' | 'frontpage_featured';
    pageHeadline: string;
    pageTeaser: string;
    pageSpecial: string;
    pageText1: string;
    pageText2: string;
    pageTextDetails: string;
    pageTextTeaser: string;
    vipOnly: '0' | '1';
    includes: string;
    roomId: number;
    pageItems?: CatalogItemEntity[];
}
