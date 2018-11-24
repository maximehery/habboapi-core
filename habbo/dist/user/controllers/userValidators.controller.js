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
const userValidator_service_1 = require("../services/userValidator.service");
let UserValidatorsController = class UserValidatorsController {
    constructor(userValidatorService) {
        this.userValidatorService = userValidatorService;
    }
    validateUsername(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userValidatorService.validateUsername(params.username);
                return;
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    validateEmail(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userValidatorService.validateEmail(params.email);
                return;
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
__decorate([
    common_1.Get('username/:username'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserValidatorsController.prototype, "validateUsername", null);
__decorate([
    common_1.Get('email/:email'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserValidatorsController.prototype, "validateEmail", null);
UserValidatorsController = __decorate([
    common_1.Controller('validators'),
    __metadata("design:paramtypes", [userValidator_service_1.UserValidatorService])
], UserValidatorsController);
exports.UserValidatorsController = UserValidatorsController;
