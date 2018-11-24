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
const userCurrency_entity_1 = require("../entities/userCurrency.entity");
let UserCurrencyService = class UserCurrencyService {
    constructor(userCurrencyRepository) {
        this.userCurrencyRepository = userCurrencyRepository;
    }
    modifyCurrency(userIds, type, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userIds || !type || !amount)
                throw new Error('invalid_parameters');
            let values = [];
            userIds.forEach(userId => {
                values.push({
                    userId: userId,
                    type: type,
                    amount: amount
                });
            });
            if (!values)
                throw new Error('invalid_currency');
            values.forEach((value) => __awaiter(this, void 0, void 0, function* () {
                const findCurrency = yield this.userCurrencyRepository.findOne({
                    where: { userId: value.userId, type: value.type }
                });
                if (findCurrency)
                    yield this.userCurrencyRepository.save({
                        id: findCurrency.id,
                        amount: findCurrency.amount + amount
                    });
                else
                    yield this.userCurrencyRepository.save(value);
            }));
            return true;
        });
    }
};
UserCurrencyService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(userCurrency_entity_1.UserCurrencyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserCurrencyService);
exports.UserCurrencyService = UserCurrencyService;
