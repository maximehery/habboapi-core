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
let RoomModelEntity = class RoomModelEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], RoomModelEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'name' }),
    __metadata("design:type", String)
], RoomModelEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'door_x' }),
    __metadata("design:type", Number)
], RoomModelEntity.prototype, "doorX", void 0);
__decorate([
    typeorm_1.Column({ name: 'dooy_y' }),
    __metadata("design:type", Number)
], RoomModelEntity.prototype, "doorY", void 0);
__decorate([
    typeorm_1.Column({ name: 'door_dir' }),
    __metadata("design:type", Number)
], RoomModelEntity.prototype, "doorDir", void 0);
__decorate([
    typeorm_1.Column({ name: 'heightmap' }),
    __metadata("design:type", String)
], RoomModelEntity.prototype, "heightmap", void 0);
__decorate([
    typeorm_1.Column({ name: 'public_items' }),
    __metadata("design:type", String)
], RoomModelEntity.prototype, "publicItems", void 0);
__decorate([
    typeorm_1.Column({ name: 'club_only', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], RoomModelEntity.prototype, "clubOnly", void 0);
__decorate([
    typeorm_1.OneToMany(type => room_entity_1.RoomEntity, room => room.roomModelDefinition),
    __metadata("design:type", Array)
], RoomModelEntity.prototype, "modelRooms", void 0);
RoomModelEntity = __decorate([
    typeorm_1.Entity('room_models')
], RoomModelEntity);
exports.RoomModelEntity = RoomModelEntity;
