"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const item_entity_1 = require("../../item/entities/item.entity");
const catalogItem_entity_1 = require("../../catalog/entities/catalogItem.entity");
let ItemBaseEntity = class ItemBaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], ItemBaseEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'item_name' }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "itemName", void 0);
__decorate([
    typeorm_1.Column({ name: 'public_name' }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "publicName", void 0);
__decorate([
    typeorm_1.Column({ name: 'type', type: 'enum', enum: ['s', 'i', 'e', 'h', 'v', 'r', 'b', 'p'] }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ name: 'width' }),
    __metadata("design:type", Number)
], ItemBaseEntity.prototype, "width", void 0);
__decorate([
    typeorm_1.Column({ name: 'length' }),
    __metadata("design:type", Number)
], ItemBaseEntity.prototype, "length", void 0);
__decorate([
    typeorm_1.Column({ name: 'stack_height' }),
    __metadata("design:type", Number)
], ItemBaseEntity.prototype, "stackHeight", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_stack', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "allowStack", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_sit', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "allowSit", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_lay', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "allowLay", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_walk', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "allowWalk", void 0);
__decorate([
    typeorm_1.Column({ name: 'sprite_id' }),
    __metadata("design:type", Number)
], ItemBaseEntity.prototype, "spriteId", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_recycle', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "allowRecycle", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_trade', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "allowTrade", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_marketplace_sell', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "allowMarketplaceSell", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_gift', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "allowGift", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_inventory_stack', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "allowInventoryStack", void 0);
__decorate([
    typeorm_1.Column({ name: 'interaction_type' }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "interactionType", void 0);
__decorate([
    typeorm_1.Column({ name: 'interaction_modes_count' }),
    __metadata("design:type", Number)
], ItemBaseEntity.prototype, "interactionModesCount", void 0);
__decorate([
    typeorm_1.Column({ name: 'vending_ids' }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "vendingIds", void 0);
__decorate([
    typeorm_1.Column({ name: 'multiheight' }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "multiHeight", void 0);
__decorate([
    typeorm_1.Column({ name: 'effect_id_male' }),
    __metadata("design:type", Number)
], ItemBaseEntity.prototype, "effectIdMale", void 0);
__decorate([
    typeorm_1.Column({ name: 'effect_id_female' }),
    __metadata("design:type", Number)
], ItemBaseEntity.prototype, "effectIdFemale", void 0);
__decorate([
    typeorm_1.Column({ name: 'customparams' }),
    __metadata("design:type", String)
], ItemBaseEntity.prototype, "customParams", void 0);
__decorate([
    typeorm_1.OneToMany(type => item_entity_1.ItemEntity, item => item.itemBase),
    __metadata("design:type", Array)
], ItemBaseEntity.prototype, "baseItems", void 0);
__decorate([
    typeorm_1.OneToMany(type => catalogItem_entity_1.CatalogItemEntity, item => item.itemBase),
    __metadata("design:type", Array)
], ItemBaseEntity.prototype, "baseCatalogItems", void 0);
ItemBaseEntity = __decorate([
    typeorm_1.Entity('items_base')
], ItemBaseEntity);
exports.ItemBaseEntity = ItemBaseEntity;
