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
const item_entity_1 = require("../entities/item.entity");
let ItemService = class ItemService {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
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
                        const columnMetadata = this.itemRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);
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
                        const columnMetadata = this.itemRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);
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
            const result = yield this.itemRepository.findAndCount({
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
            return yield this.itemRepository.findOne({
                where: { id: itemId },
                relations: relations
            });
        });
    }
    put(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!item)
                throw new Error(`invalidParameters`);
            const add = {
                id: null,
                userId: item.userId || 0,
                roomId: item.roomId || 0,
                itemId: item.itemId || 0,
                wallPos: item.wallPos || 0,
                x: item.x || 0,
                y: item.y || 0,
                z: item.z || 0,
                rot: item.rot || 0,
                extraData: item.extraData || '',
                wiredData: item.wiredData || '',
                limitedData: item.limitedData || '0:0',
                groupId: item.groupId || 0
            };
            if (!add.userId || !add.itemId)
                throw new Error(`invalidItem`);
            return yield this.itemRepository.save(add);
        });
    }
    patch(itemId, item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!itemId || !item)
                throw new Error(`invalidParameters`);
            const result = yield this.itemRepository.findOne(itemId);
            if (!result)
                throw new Error(`invalidItem`);
            const update = {
                id: +itemId,
                userId: item.userId || result.userId,
                roomId: item.roomId || result.roomId,
                itemId: item.itemId || result.itemId,
                wallPos: item.wallPos || result.wallPos,
                x: item.x || result.x,
                y: item.y || result.y,
                z: item.z || result.z,
                rot: item.rot || result.rot,
                extraData: item.extraData || result.extraData,
                wiredData: item.wiredData || result.wiredData,
                limitedData: item.limitedData || result.limitedData,
                groupId: item.groupId || result.groupId
            };
            if (!update.userId || !update.itemId)
                throw new Error(`invalidItem`);
            yield this.itemRepository
                .createQueryBuilder()
                .update()
                .set(update)
                .where('id = :id', { id: itemId })
                .execute();
            return update;
        });
    }
    delete(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!itemId)
                throw new Error(`invalidParameters`);
            yield this.itemRepository.delete({ id: itemId });
            return true;
        });
    }
};
ItemService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(item_entity_1.ItemEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ItemService);
exports.ItemService = ItemService;
