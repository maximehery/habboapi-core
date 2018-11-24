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
const group_entity_1 = require("./group.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let GroupMemberEntity = class GroupMemberEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], GroupMemberEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'guild_id' }),
    __metadata("design:type", Number)
], GroupMemberEntity.prototype, "groupId", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_id' }),
    __metadata("design:type", Number)
], GroupMemberEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ name: 'level_id' }),
    __metadata("design:type", Number)
], GroupMemberEntity.prototype, "levelId", void 0);
__decorate([
    typeorm_1.Column({ name: 'member_since' }),
    __metadata("design:type", Number)
], GroupMemberEntity.prototype, "memberSince", void 0);
__decorate([
    typeorm_1.ManyToOne(type => group_entity_1.GroupEntity),
    typeorm_1.JoinColumn({ name: 'guild_id' }),
    __metadata("design:type", group_entity_1.GroupEntity)
], GroupMemberEntity.prototype, "membershipGroup", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], GroupMemberEntity.prototype, "membershipUser", void 0);
GroupMemberEntity = __decorate([
    typeorm_1.Entity('guilds_members')
], GroupMemberEntity);
exports.GroupMemberEntity = GroupMemberEntity;
