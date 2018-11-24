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
const itemBase_entity_1 = require("../entities/itemBase.entity");
let ItemBaseService = class ItemBaseService {
    constructor(itemRepository, itemBaseRepository) {
        this.itemRepository = itemRepository;
        this.itemBaseRepository = itemBaseRepository;
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
                        const columnMetadata = this.itemBaseRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);
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
                        const columnMetadata = this.itemBaseRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);
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
            const result = yield this.itemBaseRepository.findAndCount({
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
    getOne(itemBaseId, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!itemBaseId)
                throw new Error(`invalidParameters`);
            return yield this.itemBaseRepository.findOne({
                where: { id: itemBaseId },
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
                itemName: item.itemName || null,
                publicName: item.publicName || null,
                type: item.type || 's',
                width: item.width || 1,
                length: item.length || 1,
                stackHeight: item.stackHeight || 0,
                allowStack: item.allowStack || '0',
                allowSit: item.allowSit || '0',
                allowLay: item.allowLay || '0',
                allowWalk: item.allowWalk || '0',
                spriteId: item.spriteId || 0,
                allowRecycle: item.allowRecycle || '1',
                allowTrade: item.allowTrade || '1',
                allowMarketplaceSell: item.allowMarketplaceSell || '1',
                allowGift: item.allowGift || '1',
                allowInventoryStack: item.allowInventoryStack || '1',
                interactionType: item.interactionType || 'default',
                interactionModesCount: item.interactionModesCount || 1,
                vendingIds: item.vendingIds || '0',
                multiHeight: item.multiHeight || '0',
                effectIdMale: item.effectIdMale || 0,
                effectIdFemale: item.effectIdFemale || 0,
                customParams: item.customParams || null
            };
            if (!add.itemName || !add.publicName)
                throw new Error(`invalidItemBase`);
            return yield this.itemBaseRepository.save(add);
        });
    }
    patch(itemBaseId, item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!itemBaseId || !item)
                throw new Error(`invalidParameters`);
            const result = yield this.itemBaseRepository.findOne(itemBaseId);
            if (!result)
                throw new Error(`invalidItemBase`);
            const update = {
                id: +itemBaseId,
                itemName: item.itemName || result.itemName,
                publicName: item.publicName || result.publicName,
                type: item.type || result.type,
                width: item.width || result.width,
                length: item.length || result.length,
                stackHeight: item.stackHeight || result.stackHeight,
                allowStack: item.allowStack || result.allowStack,
                allowSit: item.allowSit || result.allowSit,
                allowLay: item.allowLay || result.allowLay,
                allowWalk: item.allowWalk || result.allowWalk,
                spriteId: item.spriteId || result.spriteId,
                allowRecycle: item.allowRecycle || result.allowRecycle,
                allowTrade: item.allowTrade || result.allowTrade,
                allowMarketplaceSell: item.allowMarketplaceSell || result.allowMarketplaceSell,
                allowGift: item.allowGift || result.allowGift,
                allowInventoryStack: item.allowInventoryStack || result.allowInventoryStack,
                interactionType: item.interactionType || result.interactionType,
                interactionModesCount: item.interactionModesCount || result.interactionModesCount,
                vendingIds: item.vendingIds || result.vendingIds,
                multiHeight: item.multiHeight || result.multiHeight,
                effectIdMale: item.effectIdMale || result.effectIdMale,
                effectIdFemale: item.effectIdFemale || result.effectIdFemale,
                customParams: item.customParams || result.customParams
            };
            if (!update.itemName || !update.publicName)
                throw new Error(`invalidItemBase`);
            yield this.itemBaseRepository
                .createQueryBuilder()
                .update()
                .set(update)
                .where('id = :id', { id: itemBaseId })
                .execute();
            return update;
        });
    }
    delete(itemBaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!itemBaseId)
                throw new Error(`invalidParameters`);
            yield this.itemBaseRepository.delete({ id: itemBaseId });
            yield this.itemRepository.delete({ itemId: itemBaseId });
            return true;
        });
    }
};
ItemBaseService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(item_entity_1.ItemEntity)),
    __param(1, typeorm_1.InjectRepository(itemBase_entity_1.ItemBaseEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ItemBaseService);
exports.ItemBaseService = ItemBaseService;
