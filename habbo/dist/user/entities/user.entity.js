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
const userBadge_entity_1 = require("./userBadge.entity");
const userCurrency_entity_1 = require("./userCurrency.entity");
const userFavoriteRoom_entity_1 = require("./userFavoriteRoom.entity");
const chatlogPrivate_entity_1 = require("../../chatlog/entities/chatlogPrivate.entity");
const chatlogRoom_entity_1 = require("../../chatlog/entities/chatlogRoom.entity");
const chatlogCommand_entity_1 = require("../../chatlog/entities/chatlogCommand.entity");
const group_entity_1 = require("../../group/entities/group.entity");
const groupMember_entity_1 = require("../../group/entities/groupMember.entity");
const item_entity_1 = require("../../item/entities/item.entity");
const room_entity_1 = require("../../room/entities/room.entity");
const roomBan_entity_1 = require("../../room/entities/roomBan.entity");
const roomEntry_entity_1 = require("../../room/entities/roomEntry.entity");
const roomMute_entity_1 = require("../../room/entities/roomMute.entity");
let UserEntity = class UserEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'username' }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ name: 'real_name', select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "realName", void 0);
__decorate([
    typeorm_1.Column({ name: 'password', select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ name: 'mail' }),
    __metadata("design:type", String)
], UserEntity.prototype, "mail", void 0);
__decorate([
    typeorm_1.Column({ name: 'mail_verified', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], UserEntity.prototype, "mailVerified", void 0);
__decorate([
    typeorm_1.Column({ name: 'account_created' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "accountCreated", void 0);
__decorate([
    typeorm_1.Column({ name: 'account_day_of_birth', select: false }),
    __metadata("design:type", Number)
], UserEntity.prototype, "accountBirthday", void 0);
__decorate([
    typeorm_1.Column({ name: 'last_login' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "lastLogin", void 0);
__decorate([
    typeorm_1.Column({ name: 'last_online' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "lastOnline", void 0);
__decorate([
    typeorm_1.Column({ name: 'motto' }),
    __metadata("design:type", String)
], UserEntity.prototype, "motto", void 0);
__decorate([
    typeorm_1.Column({ name: 'look' }),
    __metadata("design:type", String)
], UserEntity.prototype, "look", void 0);
__decorate([
    typeorm_1.Column({ name: 'gender', type: 'enum', enum: ['M', 'F'], select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column({ name: 'rank' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "rank", void 0);
__decorate([
    typeorm_1.Column({ name: 'credits' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "credits", void 0);
__decorate([
    typeorm_1.Column({ name: 'pixels', select: false }),
    __metadata("design:type", Number)
], UserEntity.prototype, "pixels", void 0);
__decorate([
    typeorm_1.Column({ name: 'points', select: false }),
    __metadata("design:type", Number)
], UserEntity.prototype, "points", void 0);
__decorate([
    typeorm_1.Column({ name: 'online', type: 'enum', enum: ['0', '1', '2'] }),
    __metadata("design:type", String)
], UserEntity.prototype, "online", void 0);
__decorate([
    typeorm_1.Column({ name: 'auth_ticket', select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "auth_ticket", void 0);
__decorate([
    typeorm_1.Column({ name: 'ip_register' }),
    __metadata("design:type", String)
], UserEntity.prototype, "ipRegister", void 0);
__decorate([
    typeorm_1.Column({ name: 'ip_current' }),
    __metadata("design:type", String)
], UserEntity.prototype, "ipCurrent", void 0);
__decorate([
    typeorm_1.Column({ name: 'machine_id' }),
    __metadata("design:type", String)
], UserEntity.prototype, "machineId", void 0);
__decorate([
    typeorm_1.Column({ name: 'home_room' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "homeRoom", void 0);
__decorate([
    typeorm_1.OneToMany(type => userBadge_entity_1.UserBadgeEntity, badge => badge.badgeUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userBadges", void 0);
__decorate([
    typeorm_1.OneToMany(type => userCurrency_entity_1.UserCurrencyEntity, currency => currency.currencyUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userCurrencies", void 0);
__decorate([
    typeorm_1.OneToMany(type => userFavoriteRoom_entity_1.UserFavoriteRoomEntity, favorite => favorite.favoriteUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userFavoriteRooms", void 0);
__decorate([
    typeorm_1.OneToMany(type => chatlogPrivate_entity_1.ChatlogPrivateEntity, chatlog => chatlog.chatlogUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userChatlogRoom", void 0);
__decorate([
    typeorm_1.OneToMany(type => chatlogRoom_entity_1.ChatlogRoomEntity, chatlog => chatlog.chatlogUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userChatlogPrivate", void 0);
__decorate([
    typeorm_1.OneToMany(type => chatlogCommand_entity_1.ChatlogCommandEntity, chatlog => chatlog.chatlogUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userChatlogCommand", void 0);
__decorate([
    typeorm_1.OneToMany(type => group_entity_1.GroupEntity, group => group.groupUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userGroups", void 0);
__decorate([
    typeorm_1.OneToMany(type => groupMember_entity_1.GroupMemberEntity, member => member.membershipUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userGroupMemberships", void 0);
__decorate([
    typeorm_1.OneToMany(type => item_entity_1.ItemEntity, item => item.itemUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userItems", void 0);
__decorate([
    typeorm_1.OneToMany(type => room_entity_1.RoomEntity, room => room.roomUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userRooms", void 0);
__decorate([
    typeorm_1.OneToMany(type => roomBan_entity_1.RoomBanEntity, ban => ban.banUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userRoomBans", void 0);
__decorate([
    typeorm_1.OneToMany(type => roomEntry_entity_1.RoomEntryEntity, entry => entry.entryUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userRoomEntries", void 0);
__decorate([
    typeorm_1.OneToMany(type => roomMute_entity_1.RoomMuteEntity, mute => mute.muteUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userRoomMutes", void 0);
UserEntity = __decorate([
    typeorm_1.Entity('users')
], UserEntity);
exports.UserEntity = UserEntity;
