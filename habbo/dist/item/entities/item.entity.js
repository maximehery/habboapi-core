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
const itemBase_entity_1 = require("./itemBase.entity");
const group_entity_1 = require("../../group/entities/group.entity");
const room_entity_1 = require("../../room/entities/room.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let ItemEntity = class ItemEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], ItemEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_id' }),
    __metadata("design:type", Number)
], ItemEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ name: 'room_id' }),
    __metadata("design:type", Number)
], ItemEntity.prototype, "roomId", void 0);
__decorate([
    typeorm_1.Column({ name: 'item_id' }),
    __metadata("design:type", Number)
], ItemEntity.prototype, "itemId", void 0);
__decorate([
    typeorm_1.Column({ name: 'wall_pos' }),
    __metadata("design:type", Number)
], ItemEntity.prototype, "wallPos", void 0);
__decorate([
    typeorm_1.Column({ name: 'x' }),
    __metadata("design:type", Number)
], ItemEntity.prototype, "x", void 0);
__decorate([
    typeorm_1.Column({ name: 'y' }),
    __metadata("design:type", Number)
], ItemEntity.prototype, "y", void 0);
__decorate([
    typeorm_1.Column({ name: 'z' }),
    __metadata("design:type", Number)
], ItemEntity.prototype, "z", void 0);
__decorate([
    typeorm_1.Column({ name: 'rot' }),
    __metadata("design:type", Number)
], ItemEntity.prototype, "rot", void 0);
__decorate([
    typeorm_1.Column({ name: 'extra_data' }),
    __metadata("design:type", String)
], ItemEntity.prototype, "extraData", void 0);
__decorate([
    typeorm_1.Column({ name: 'wired_data' }),
    __metadata("design:type", String)
], ItemEntity.prototype, "wiredData", void 0);
__decorate([
    typeorm_1.Column({ name: 'limited_data' }),
    __metadata("design:type", String)
], ItemEntity.prototype, "limitedData", void 0);
__decorate([
    typeorm_1.Column({ name: 'guild_id' }),
    __metadata("design:type", Number)
], ItemEntity.prototype, "groupId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => itemBase_entity_1.ItemBaseEntity),
    typeorm_1.JoinColumn({ name: 'item_id' }),
    __metadata("design:type", itemBase_entity_1.ItemBaseEntity)
], ItemEntity.prototype, "itemBase", void 0);
__decorate([
    typeorm_1.ManyToOne(type => group_entity_1.GroupEntity),
    typeorm_1.JoinColumn({ name: 'guild_id' }),
    __metadata("design:type", group_entity_1.GroupEntity)
], ItemEntity.prototype, "itemGroup", void 0);
__decorate([
    typeorm_1.ManyToOne(type => room_entity_1.RoomEntity),
    typeorm_1.JoinColumn({ name: 'room_id' }),
    __metadata("design:type", room_entity_1.RoomEntity)
], ItemEntity.prototype, "itemRoom", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ItemEntity.prototype, "itemUser", void 0);
ItemEntity = __decorate([
    typeorm_1.Entity('items')
], ItemEntity);
exports.ItemEntity = ItemEntity;
