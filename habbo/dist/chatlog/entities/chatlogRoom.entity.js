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
const room_entity_1 = require("../../room/entities/room.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let ChatlogRoomEntity = class ChatlogRoomEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], ChatlogRoomEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'room_id' }),
    __metadata("design:type", Number)
], ChatlogRoomEntity.prototype, "roomId", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_from_id' }),
    __metadata("design:type", Number)
], ChatlogRoomEntity.prototype, "userFromId", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_to_id' }),
    __metadata("design:type", Number)
], ChatlogRoomEntity.prototype, "userToId", void 0);
__decorate([
    typeorm_1.Column({ name: 'message' }),
    __metadata("design:type", String)
], ChatlogRoomEntity.prototype, "message", void 0);
__decorate([
    typeorm_1.Column({ name: 'timestamp' }),
    __metadata("design:type", Number)
], ChatlogRoomEntity.prototype, "timestamp", void 0);
__decorate([
    typeorm_1.ManyToOne(type => room_entity_1.RoomEntity),
    typeorm_1.JoinColumn({ name: 'room_id' }),
    __metadata("design:type", room_entity_1.RoomEntity)
], ChatlogRoomEntity.prototype, "chatlogRoom", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity),
    typeorm_1.JoinColumn({ name: 'user_from_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ChatlogRoomEntity.prototype, "chatlogUser", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity),
    typeorm_1.JoinColumn({ name: 'user_to_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ChatlogRoomEntity.prototype, "chatlogReciever", void 0);
ChatlogRoomEntity = __decorate([
    typeorm_1.Entity('chatlogs_room')
], ChatlogRoomEntity);
exports.ChatlogRoomEntity = ChatlogRoomEntity;
