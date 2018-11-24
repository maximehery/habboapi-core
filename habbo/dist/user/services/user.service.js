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
const userValidator_service_1 = require("./userValidator.service");
const user_entity_1 = require("../entities/user.entity");
let UserService = class UserService {
    constructor(userValidatorService, userRepository) {
        this.userValidatorService = userValidatorService;
        this.userRepository = userRepository;
    }
    getAll(searchOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const search = {
                where: searchOptions.where || null,
                order: searchOptions.order || null,
                limit: searchOptions.limit && searchOptions.limit >= 20 ? +searchOptions.limit : 20,
                page: +searchOptions.page || 1,
                relations: searchOptions.relations
            };
            let searchWhereOptions = {};
            let searchOrderOptions = {};
            if (search.where && search.where.length >= 1) {
                search.where.forEach(where => {
                    if (where.column && where.operator && where.value) {
                        const columnMetadata = this.userRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);
                        if (!columnMetadata)
                            throw new Error(`invalidSearchColumn: ${where.column}`);
                        if (where.operator == 'equals')
                            return searchWhereOptions[columnMetadata.propertyName] = typeorm_2.Equal(where.value);
                        else if (where.operator == 'like')
                            return searchWhereOptions[columnMetadata.propertyName] = typeorm_2.Like(`%${where.value}%`);
                        else
                            throw new Error(`invalidSearchOperator: ${where.operator}`);
                    }
                    throw new Error(`invalidSearch: ${where.column}:${where.operator}:${where.value}`);
                });
            }
            if (search.order && search.order.length >= 1) {
                search.order.forEach(order => {
                    if (order.column && order.sort) {
                        const columnMetadata = this.userRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);
                        if (!columnMetadata)
                            throw new Error(`invalidOrderColumn: ${order.column}`);
                        if (order.sort == 'ASC' || order.sort == 'DESC')
                            return searchOrderOptions[columnMetadata.propertyName] = order.sort;
                        else
                            throw new Error(`invalidOrderType: ${order.sort}`);
                    }
                    throw new Error(`invalidOrder: ${order.column}:${order.sort}`);
                });
            }
            const result = yield this.userRepository.findAndCount({
                where: searchWhereOptions,
                order: searchOrderOptions,
                take: search.limit,
                skip: (search.page - 1) * search.limit,
                relations: search.relations
            });
            let nextPage = search.page + 1;
            let previousPage = search.page - 1;
            let totalPages = Math.ceil(+result[1] / search.limit);
            let totalItems = +result[1];
            return {
                items: result[0],
                pagination: {
                    currentPage: search.page,
                    nextPage: nextPage > totalPages ? search.page > totalPages ? 1 : search.page : nextPage,
                    previousPage: previousPage > totalPages ? 1 : previousPage || 1,
                    totalPages: totalPages,
                    totalItems: totalItems
                }
            };
        });
    }
    getOne(itemId, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!itemId)
                throw new Error(`invalidParameters`);
            return yield this.userRepository.findOne({
                where: { id: itemId },
                relations: relations
            });
        });
    }
    login(username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username)
                throw new Error(`invalidParameters`);
            return yield this.userRepository.findOne({
                select: ['id', 'username', 'password', 'look', 'rank'],
                where: { username: username }
            });
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [userValidator_service_1.UserValidatorService,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
