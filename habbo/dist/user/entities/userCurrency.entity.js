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
const user_entity_1 = require("./user.entity");
let UserCurrencyEntity = class UserCurrencyEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    __metadata("design:type", Number)
], UserCurrencyEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'user_id' }),
    __metadata("design:type", Number)
], UserCurrencyEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ name: 'type' }),
    __metadata("design:type", Number)
], UserCurrencyEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ name: 'amount' }),
    __metadata("design:type", Number)
], UserCurrencyEntity.prototype, "amount", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserCurrencyEntity.prototype, "currencyUser", void 0);
UserCurrencyEntity = __decorate([
    typeorm_1.Entity('users_currency')
], UserCurrencyEntity);
exports.UserCurrencyEntity = UserCurrencyEntity;
