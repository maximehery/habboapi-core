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
const catalogPage_entity_1 = require("./catalogPage.entity");
const itemBase_entity_1 = require("../../item/entities/itemBase.entity");
let CatalogItemEntity = class CatalogItemEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'page_id' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "pageId", void 0);
__decorate([
    typeorm_1.Column({ name: 'item_ids' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "itemIds", void 0);
__decorate([
    typeorm_1.Column({ name: 'catalog_name' }),
    __metadata("design:type", String)
], CatalogItemEntity.prototype, "catalogName", void 0);
__decorate([
    typeorm_1.Column({ name: 'cost_credits' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "costCredits", void 0);
__decorate([
    typeorm_1.Column({ name: 'cost_points' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "costPoints", void 0);
__decorate([
    typeorm_1.Column({ name: 'points_type' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "pointsType", void 0);
__decorate([
    typeorm_1.Column({ name: 'amount' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column({ name: 'song_id' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "songId", void 0);
__decorate([
    typeorm_1.Column({ name: 'limited_stack' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "limitedStack", void 0);
__decorate([
    typeorm_1.Column({ name: 'limited_sells' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "limitedSells", void 0);
__decorate([
    typeorm_1.Column({ name: 'extradata' }),
    __metadata("design:type", String)
], CatalogItemEntity.prototype, "extraData", void 0);
__decorate([
    typeorm_1.Column({ name: 'club_only', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], CatalogItemEntity.prototype, "clubOnly", void 0);
__decorate([
    typeorm_1.Column({ name: 'have_offer', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], CatalogItemEntity.prototype, "haveOffer", void 0);
__decorate([
    typeorm_1.Column({ name: 'offer_id' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "offerId", void 0);
__decorate([
    typeorm_1.Column({ name: 'order_number' }),
    __metadata("design:type", Number)
], CatalogItemEntity.prototype, "orderNum", void 0);
__decorate([
    typeorm_1.Column({ name: 'badge' }),
    __metadata("design:type", String)
], CatalogItemEntity.prototype, "badge", void 0);
__decorate([
    typeorm_1.ManyToOne(type => catalogPage_entity_1.CatalogPageEntity),
    typeorm_1.JoinColumn({ name: 'page_id' }),
    __metadata("design:type", catalogPage_entity_1.CatalogPageEntity)
], CatalogItemEntity.prototype, "itemPage", void 0);
__decorate([
    typeorm_1.ManyToOne(type => itemBase_entity_1.ItemBaseEntity),
    typeorm_1.JoinColumn({ name: 'item_ids' }),
    __metadata("design:type", itemBase_entity_1.ItemBaseEntity)
], CatalogItemEntity.prototype, "itemBase", void 0);
CatalogItemEntity = __decorate([
    typeorm_1.Entity('catalog_items')
], CatalogItemEntity);
exports.CatalogItemEntity = CatalogItemEntity;
