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
let RoomEntryEntity = class RoomEntryEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], RoomEntryEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'room_id' }),
    __metadata("design:type", Number)
], RoomEntryEntity.prototype, "roomId", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_id' }),
    __metadata("design:type", Number)
], RoomEntryEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ name: 'timestamp' }),
    __metadata("design:type", Number)
], RoomEntryEntity.prototype, "timestamp", void 0);
__decorate([
    typeorm_1.Column({ name: 'exit_timestamp' }),
    __metadata("design:type", Number)
], RoomEntryEntity.prototype, "exitTimestamp", void 0);
__decorate([
    typeorm_1.ManyToOne(type => room_entity_1.RoomEntity),
    typeorm_1.JoinColumn({ name: 'room_id' }),
    __metadata("design:type", room_entity_1.RoomEntity)
], RoomEntryEntity.prototype, "entryRoom", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], RoomEntryEntity.prototype, "entryUser", void 0);
RoomEntryEntity = __decorate([
    typeorm_1.Entity('room_enter_log')
], RoomEntryEntity);
exports.RoomEntryEntity = RoomEntryEntity;
