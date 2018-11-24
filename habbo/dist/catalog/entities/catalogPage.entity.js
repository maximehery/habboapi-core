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
const catalogItem_entity_1 = require("./catalogItem.entity");
let CatalogPageEntity = class CatalogPageEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], CatalogPageEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'parent_id' }),
    __metadata("design:type", Number)
], CatalogPageEntity.prototype, "parentId", void 0);
__decorate([
    typeorm_1.Column({ name: 'caption_save' }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "captionSave", void 0);
__decorate([
    typeorm_1.Column({ name: 'caption' }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "caption", void 0);
__decorate([
    typeorm_1.Column({ name: 'icon_color' }),
    __metadata("design:type", Number)
], CatalogPageEntity.prototype, "iconColor", void 0);
__decorate([
    typeorm_1.Column({ name: 'icon_image' }),
    __metadata("design:type", Number)
], CatalogPageEntity.prototype, "iconImage", void 0);
__decorate([
    typeorm_1.Column({ name: 'visible', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "visible", void 0);
__decorate([
    typeorm_1.Column({ name: 'enabled', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "enabled", void 0);
__decorate([
    typeorm_1.Column({ name: 'min_rank' }),
    __metadata("design:type", Number)
], CatalogPageEntity.prototype, "minRank", void 0);
__decorate([
    typeorm_1.Column({ name: 'club_only', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "clubOnly", void 0);
__decorate([
    typeorm_1.Column({ name: 'order_num' }),
    __metadata("design:type", Number)
], CatalogPageEntity.prototype, "orderNum", void 0);
__decorate([
    typeorm_1.Column({ name: 'page_layout', type: 'enum', enum: ['default_3x3', 'club_buy', 'club_gift', 'frontpage', 'spaces', 'recycler', 'recycler_info', 'recycler_prizes', 'trophies', 'plasto', 'marketplace', 'marketplace_own_items', 'pets', 'spaces_new', 'soundmachine', 'guilds', 'guild_furni', 'info_duckets', 'info_rentables', 'info_pets', 'roomads', 'single_bundle', 'sold_ltd_items', 'badge_display', 'bots', 'pets2', 'pets3', 'productpage1', 'room_bundle', 'recent_purchases', 'pets2', 'pets3', 'default_3x3_color_grouping', 'guild_forum', 'vip_buy', 'info_loyalty', 'loyalty_vip_buy', 'collectibles', 'frontpage_featured'] }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "pageLayout", void 0);
__decorate([
    typeorm_1.Column({ name: 'page_headline' }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "pageHeadline", void 0);
__decorate([
    typeorm_1.Column({ name: 'page_teaser' }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "pageTeaser", void 0);
__decorate([
    typeorm_1.Column({ name: 'page_special' }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "pageSpecial", void 0);
__decorate([
    typeorm_1.Column({ name: 'page_text1' }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "pageText1", void 0);
__decorate([
    typeorm_1.Column({ name: 'page_text2' }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "pageText2", void 0);
__decorate([
    typeorm_1.Column({ name: 'page_text_details' }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "pageTextDetails", void 0);
__decorate([
    typeorm_1.Column({ name: 'page_text_teaser' }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "pageTextTeaser", void 0);
__decorate([
    typeorm_1.Column({ name: 'vip_only', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "vipOnly", void 0);
__decorate([
    typeorm_1.Column({ name: 'includes' }),
    __metadata("design:type", String)
], CatalogPageEntity.prototype, "includes", void 0);
__decorate([
    typeorm_1.Column({ name: 'room_id' }),
    __metadata("design:type", Number)
], CatalogPageEntity.prototype, "roomId", void 0);
__decorate([
    typeorm_1.OneToMany(type => catalogItem_entity_1.CatalogItemEntity, item => item.itemPage),
    __metadata("design:type", Array)
], CatalogPageEntity.prototype, "pageItems", void 0);
CatalogPageEntity = __decorate([
    typeorm_1.Entity('catalog_pages')
], CatalogPageEntity);
exports.CatalogPageEntity = CatalogPageEntity;
