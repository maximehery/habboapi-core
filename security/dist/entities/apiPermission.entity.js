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
let ApiPermissionEntity = class ApiPermissionEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], ApiPermissionEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'rank_name' }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "rankName", void 0);
__decorate([
    typeorm_1.Column({ name: 'catalog', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "catalog", void 0);
__decorate([
    typeorm_1.Column({ name: 'catalog_patch', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "catalogPatch", void 0);
__decorate([
    typeorm_1.Column({ name: 'catalog_put', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "catalogPut", void 0);
__decorate([
    typeorm_1.Column({ name: 'catalog_delete', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "catalogDelete", void 0);
__decorate([
    typeorm_1.Column({ name: 'chatlog', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "chatlog", void 0);
__decorate([
    typeorm_1.Column({ name: 'chatlog_delete', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "chatlogDelete", void 0);
__decorate([
    typeorm_1.Column({ name: 'chatlog_backup', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "chatlogBackup", void 0);
__decorate([
    typeorm_1.Column({ name: 'item', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "item", void 0);
__decorate([
    typeorm_1.Column({ name: 'item_patch', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "itemPatch", void 0);
__decorate([
    typeorm_1.Column({ name: 'item_put', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "itemPut", void 0);
__decorate([
    typeorm_1.Column({ name: 'item_delete', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "itemDelete", void 0);
__decorate([
    typeorm_1.Column({ name: 'group', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "group", void 0);
__decorate([
    typeorm_1.Column({ name: 'room', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "room", void 0);
__decorate([
    typeorm_1.Column({ name: 'user', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_patch', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "userPatch", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_put', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "userPut", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_delete', type: 'enum', enum: ['0', '1'] }),
    __metadata("design:type", String)
], ApiPermissionEntity.prototype, "userDelete", void 0);
ApiPermissionEntity = __decorate([
    typeorm_1.Entity('api_permissions')
], ApiPermissionEntity);
exports.ApiPermissionEntity = ApiPermissionEntity;
