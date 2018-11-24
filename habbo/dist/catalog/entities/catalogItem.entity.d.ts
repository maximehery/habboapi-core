import { CatalogPageEntity } from './catalogPage.entity';
import { ItemBaseEntity } from '../../item/entities/itemBase.entity';
export declare class CatalogItemEntity {
    id?: number;
    pageId: number;
    itemIds: number;
    catalogName: string;
    costCredits: number;
    costPoints: number;
    pointsType: number;
    amount: number;
    songId: number;
    limitedStack: number;
    limitedSells: number;
    extraData: string;
    clubOnly: '0' | '1';
    haveOffer: '0' | '1';
    offerId: number;
    orderNum: number;
    badge: string;
    itemPage?: CatalogPageEntity;
    itemBase?: ItemBaseEntity;
}
