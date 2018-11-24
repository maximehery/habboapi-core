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
const groupMember_entity_1 = require("./groupMember.entity");
const item_entity_1 = require("../../item/entities/item.entity");
const room_entity_1 = require("../../room/entities/room.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let GroupEntity = class GroupEntity {
    ;
    ;
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], GroupEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_id' }),
    __metadata("design:type", Number)
], GroupEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ name: 'name' }),
    __metadata("design:type", String)
], GroupEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'description' }),
    __metadata("design:type", String)
], GroupEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ name: 'room_id' }),
    __metadata("design:type", Number)
], GroupEntity.prototype, "roomId", void 0);
__decorate([
    typeorm_1.Column({ name: 'state' }),
    __metadata("design:type", Number)
], GroupEntity.prototype, "state", void 0);
__decorate([
    typeorm_1.Column({ name: 'rights', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], GroupEntity.prototype, "rights", void 0);
__decorate([
    typeorm_1.Column({ name: 'color_one' }),
    __metadata("design:type", Number)
], GroupEntity.prototype, "colorOne", void 0);
__decorate([
    typeorm_1.Column({ name: 'color_two' }),
    __metadata("design:type", Number)
], GroupEntity.prototype, "colorTwo", void 0);
__decorate([
    typeorm_1.Column({ name: 'badge' }),
    __metadata("design:type", String)
], GroupEntity.prototype, "badge", void 0);
__decorate([
    typeorm_1.Column({ name: 'date_created' }),
    __metadata("design:type", Number)
], GroupEntity.prototype, "dateCreated", void 0);
__decorate([
    typeorm_1.Column({ name: 'forum', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], GroupEntity.prototype, "forum", void 0);
__decorate([
    typeorm_1.Column({ name: 'read_forum', type: 'enum', enum: ['EVERYONE', 'MEMBERS', 'ADMINS'] }),
    __metadata("design:type", String)
], GroupEntity.prototype, "readForum", void 0);
__decorate([
    typeorm_1.Column({ name: 'post_messages', type: 'enum', enum: ['EVERYONE', 'MEMBERS', 'ADMINS', 'OWNER'] }),
    __metadata("design:type", String)
], GroupEntity.prototype, "postMessages", void 0);
__decorate([
    typeorm_1.Column({ name: 'post_threads', type: 'enum', enum: ['EVERYONE', 'MEMBERS', 'ADMINS', 'OWNER'] }),
    __metadata("design:type", String)
], GroupEntity.prototype, "postThreads", void 0);
__decorate([
    typeorm_1.Column({ name: 'mod_forum', type: 'enum', enum: ['ADMINS', 'OWNER'] }),
    __metadata("design:type", String)
], GroupEntity.prototype, "modForum", void 0);
__decorate([
    typeorm_1.OneToMany(type => groupMember_entity_1.GroupMemberEntity, membership => membership.membershipUser),
    __metadata("design:type", Array)
], GroupEntity.prototype, "groupMembers", void 0);
__decorate([
    typeorm_1.OneToMany(type => item_entity_1.ItemEntity, item => item.itemGroup),
    __metadata("design:type", Array)
], GroupEntity.prototype, "groupItems", void 0);
__decorate([
    typeorm_1.OneToOne(type => room_entity_1.RoomEntity),
    typeorm_1.JoinColumn({ name: 'room_id' }),
    __metadata("design:type", room_entity_1.RoomEntity)
], GroupEntity.prototype, "groupRoom", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], GroupEntity.prototype, "groupUser", void 0);
GroupEntity = __decorate([
    typeorm_1.Entity('guilds')
], GroupEntity);
exports.GroupEntity = GroupEntity;
