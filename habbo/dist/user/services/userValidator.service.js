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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let UserValidatorService = class UserValidatorService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    validateUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let regex = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{1,20}$/g);
            if (!username || !regex.test(username))
                throw new Error('invalidParameters');
            const result = yield this.userRepository.findOne({
                select: ['username'],
                where: { username: username }
            });
            if (result)
                throw new Error('usernameUnavailable');
            return true;
        });
    }
    validateEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
            if (!email || !regex.test(email))
                throw new Error('invalidParameters');
            const result = yield this.userRepository.findOne({
                select: ['mail'],
                where: { mail: email }
            });
            if (result)
                throw new Error('emailUnavailable');
            return true;
        });
    }
};
UserValidatorService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserValidatorService);
exports.UserValidatorService = UserValidatorService;
