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
const roomBan_entity_1 = require("./roomBan.entity");
const roomEntry_entity_1 = require("./roomEntry.entity");
const roomModel_entity_1 = require("./roomModel.entity");
const roomMute_entity_1 = require("./roomMute.entity");
const chatlogRoom_entity_1 = require("../../chatlog/entities/chatlogRoom.entity");
const group_entity_1 = require("../../group/entities/group.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let RoomEntity = class RoomEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'owner_id' }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "ownerId", void 0);
__decorate([
    typeorm_1.Column({ name: 'owner_name', select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "ownerName", void 0);
__decorate([
    typeorm_1.Column({ name: 'name' }),
    __metadata("design:type", String)
], RoomEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'description' }),
    __metadata("design:type", String)
], RoomEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ name: 'model' }),
    __metadata("design:type", String)
], RoomEntity.prototype, "model", void 0);
__decorate([
    typeorm_1.Column({ name: 'password', select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ name: 'state', type: 'enum', enum: ['open', 'locked', 'password', 'invisible'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "state", void 0);
__decorate([
    typeorm_1.Column({ name: 'users' }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "users", void 0);
__decorate([
    typeorm_1.Column({ name: 'users_max' }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "usersMax", void 0);
__decorate([
    typeorm_1.Column({ name: 'guild_id' }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "guildId", void 0);
__decorate([
    typeorm_1.Column({ name: 'category' }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "category", void 0);
__decorate([
    typeorm_1.Column({ name: 'score' }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "score", void 0);
__decorate([
    typeorm_1.Column({ name: 'paper_floor', select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "paperFloor", void 0);
__decorate([
    typeorm_1.Column({ name: 'paper_wall', select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "paperWall", void 0);
__decorate([
    typeorm_1.Column({ name: 'paper_landscape', select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "paperLandscape", void 0);
__decorate([
    typeorm_1.Column({ name: 'thickness_wall', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "thicknessWall", void 0);
__decorate([
    typeorm_1.Column({ name: 'wall_height', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "wallHeight", void 0);
__decorate([
    typeorm_1.Column({ name: 'thickness_floor', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "thicknessFloor", void 0);
__decorate([
    typeorm_1.Column({ name: 'moodlight_data', select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "moodlightData", void 0);
__decorate([
    typeorm_1.Column({ name: 'tags', select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "tags", void 0);
__decorate([
    typeorm_1.Column({ name: 'is_public', type: 'enum', enum: ['0', '1'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "isPublic", void 0);
__decorate([
    typeorm_1.Column({ name: 'is_staff_picked', type: 'enum', enum: ['0', '1'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "isStaffPicked", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_other_pets', type: 'enum', enum: ['0', '1'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "allow_OtherPets", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_other_pets_eat', type: 'enum', enum: ['0', '1'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "allowOtherPetsEat", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_walkthrough', type: 'enum', enum: ['0', '1'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "allowWalkthrough", void 0);
__decorate([
    typeorm_1.Column({ name: 'allow_hidewall', type: 'enum', enum: ['0', '1'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "allowHidewall", void 0);
__decorate([
    typeorm_1.Column({ name: 'chat_mode', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "chatMode", void 0);
__decorate([
    typeorm_1.Column({ name: 'chat_weight', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "chatWeight", void 0);
__decorate([
    typeorm_1.Column({ name: 'chat_speed', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "chatSpeed", void 0);
__decorate([
    typeorm_1.Column({ name: 'chat_hearing_distance', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "chatHearingDistance", void 0);
__decorate([
    typeorm_1.Column({ name: 'chat_protection', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "chatProtection", void 0);
__decorate([
    typeorm_1.Column({ name: 'override_model', type: 'enum', enum: ['0', '1'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "overrideModel", void 0);
__decorate([
    typeorm_1.Column({ name: 'who_can_mute', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "whoCanMute", void 0);
__decorate([
    typeorm_1.Column({ name: 'who_can_kick', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "whoCanKick", void 0);
__decorate([
    typeorm_1.Column({ name: 'who_can_ban', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "whoCanBan", void 0);
__decorate([
    typeorm_1.Column({ name: 'poll_id', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "pollId", void 0);
__decorate([
    typeorm_1.Column({ name: 'roller_speed', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "rollerSpeed", void 0);
__decorate([
    typeorm_1.Column({ name: 'promoted', type: 'enum', enum: ['0', '1'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "promoted", void 0);
__decorate([
    typeorm_1.Column({ name: 'trade_mode', select: false }),
    __metadata("design:type", Number)
], RoomEntity.prototype, "tradeMode", void 0);
__decorate([
    typeorm_1.Column({ name: 'move_diagonally', type: 'enum', enum: ['0', '1'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "moveDiagonally", void 0);
__decorate([
    typeorm_1.Column({ name: 'jukebox_active', type: 'enum', enum: ['0', '1'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "jukeboxActive", void 0);
__decorate([
    typeorm_1.Column({ name: 'hidewired', type: 'enum', enum: ['0', '1'], select: false }),
    __metadata("design:type", String)
], RoomEntity.prototype, "hideWired", void 0);
__decorate([
    typeorm_1.OneToMany(type => chatlogRoom_entity_1.ChatlogRoomEntity, chatlog => chatlog.chatlogRoom),
    __metadata("design:type", Array)
], RoomEntity.prototype, "roomChatlog", void 0);
__decorate([
    typeorm_1.OneToOne(type => group_entity_1.GroupEntity),
    typeorm_1.JoinColumn({ name: 'guild_id' }),
    __metadata("design:type", group_entity_1.GroupEntity)
], RoomEntity.prototype, "roomGroup", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity),
    typeorm_1.JoinColumn({ name: 'owner_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], RoomEntity.prototype, "roomUser", void 0);
__decorate([
    typeorm_1.OneToMany(type => roomBan_entity_1.RoomBanEntity, ban => ban.banRoom),
    __metadata("design:type", Array)
], RoomEntity.prototype, "roomBans", void 0);
__decorate([
    typeorm_1.OneToMany(type => roomEntry_entity_1.RoomEntryEntity, entry => entry.entryRoom),
    __metadata("design:type", Array)
], RoomEntity.prototype, "roomEntries", void 0);
__decorate([
    typeorm_1.OneToOne(type => roomModel_entity_1.RoomModelEntity),
    typeorm_1.JoinColumn({ name: 'model' }),
    __metadata("design:type", roomModel_entity_1.RoomModelEntity)
], RoomEntity.prototype, "roomModelDefinition", void 0);
__decorate([
    typeorm_1.OneToMany(type => roomMute_entity_1.RoomMuteEntity, mute => mute.muteRoom),
    __metadata("design:type", Array)
], RoomEntity.prototype, "roomMutes", void 0);
RoomEntity = __decorate([
    typeorm_1.Entity('rooms')
], RoomEntity);
exports.RoomEntity = RoomEntity;
