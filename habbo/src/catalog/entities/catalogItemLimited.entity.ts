import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('catalog_items_limited')
export class CatalogItemLimitedEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'catalog_item_id' })
    catalogItemId: number;

    @Column({ name: 'number' })
    number: number;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({ name: 'timestamp' })
    timestamp: number;

    @Column({ name: 'item_id' })
    itemId: number;
}