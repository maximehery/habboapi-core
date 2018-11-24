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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const userBadge_service_1 = require("../services/userBadge.service");
let UserBadgeController = class UserBadgeController {
    constructor(userBadgeService) {
        this.userBadgeService = userBadgeService;
    }
    giveBadge(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!body.userIds || !body.badgeCodes)
                    throw new common_1.HttpException('invalid_parameters', common_1.HttpStatus.BAD_REQUEST);
                yield this.userBadgeService.giveBadge(body.userIds, body.badgeCodes);
                return;
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    remove(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!body.userIds || !body.badgeCodes)
                    throw new common_1.HttpException('invalid_parameters', common_1.HttpStatus.BAD_REQUEST);
                yield this.userBadgeService.removeBadge(body.userIds, body.badgeCodes);
                return;
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserBadgeController.prototype, "giveBadge", null);
__decorate([
    common_1.Delete(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserBadgeController.prototype, "remove", null);
UserBadgeController = __decorate([
    common_1.Controller('badge'),
    __metadata("design:paramtypes", [userBadge_service_1.UserBadgeService])
], UserBadgeController);
exports.UserBadgeController = UserBadgeController;
