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
const common_2 = require("@habboapi/common");
const ban_entity_1 = require("../entities/ban.entity");
let BanService = class BanService {
    constructor(banRepository) {
        this.banRepository = banRepository;
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
                        const columnMetadata = this.banRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);
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
                        const columnMetadata = this.banRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);
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
            const result = yield this.banRepository.findAndCount({
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
    getOne(banId, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!banId)
                throw new Error(`invalidParameters`);
            return yield this.banRepository.findOne({
                where: { id: banId },
                relations: relations
            });
        });
    }
    put(ban, staffId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ban)
                throw new Error(`invalidParameters`);
            const add = {
                id: null,
                userId: ban.userId || 0,
                ip: ban.ip || '',
                machineId: ban.machineId || '',
                userStaffId: staffId || 0,
                timestamp: common_2.TimeHelper.timestampNow(),
                banExpire: common_2.TimeHelper.addToTimestampNow(ban.banExpire),
                banReason: ban.banReason || '',
                type: ban.type || 'account',
                cfhTopic: 0
            };
            if (add.type == 'account' && !add.userId || add.type == 'ip' && !add.ip || add.type == 'machine' && !add.machineId)
                throw new Error(`invalidBan`);
            return yield this.banRepository.save(add);
        });
    }
    patch(banId, ban) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!banId || !ban)
                throw new Error(`invalidParameters`);
            const result = yield this.banRepository.findOne(banId);
            if (!result)
                throw new Error(`invalidBan`);
            const update = {
                id: +banId,
                userId: ban.userId || result.userId,
                ip: ban.ip || result.ip,
                machineId: ban.machineId || result.machineId,
                userStaffId: result.userStaffId,
                timestamp: result.timestamp,
                banExpire: common_2.TimeHelper.addToTimestampNow(ban.banExpire),
                banReason: ban.banReason || '',
                type: ban.type || 'account',
                cfhTopic: 0
            };
            if (update.type == 'account' && !update.userId || update.type == 'ip' && !update.ip || update.type == 'machine' && !update.machineId)
                throw new Error(`invalidBan`);
            yield this.banRepository
                .createQueryBuilder()
                .update()
                .set(update)
                .where('id = :id', { id: banId })
                .execute();
            return update;
        });
    }
    delete(banId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!banId)
                throw new Error(`invalidParameters`);
            yield this.banRepository.delete({ id: banId });
            return true;
        });
    }
};
BanService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(ban_entity_1.BanEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BanService);
exports.BanService = BanService;
