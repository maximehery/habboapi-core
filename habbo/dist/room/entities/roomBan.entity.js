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
const room_entity_1 = require("./room.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let RoomBanEntity = class RoomBanEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], RoomBanEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'room_id' }),
    __metadata("design:type", Number)
], RoomBanEntity.prototype, "roomId", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_id' }),
    __metadata("design:type", Number)
], RoomBanEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ name: 'ends' }),
    __metadata("design:type", Number)
], RoomBanEntity.prototype, "ends", void 0);
__decorate([
    typeorm_1.ManyToOne(type => room_entity_1.RoomEntity),
    typeorm_1.JoinColumn({ name: 'room_id' }),
    __metadata("design:type", room_entity_1.RoomEntity)
], RoomBanEntity.prototype, "banRoom", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], RoomBanEntity.prototype, "banUser", void 0);
RoomBanEntity = __decorate([
    typeorm_1.Entity('room_bans')
], RoomBanEntity);
exports.RoomBanEntity = RoomBanEntity;
