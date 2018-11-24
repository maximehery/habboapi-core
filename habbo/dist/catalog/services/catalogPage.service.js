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
const catalogPage_entity_1 = require("../entities/catalogPage.entity");
let CatalogPageService = class CatalogPageService {
    constructor(catalogPageRepository) {
        this.catalogPageRepository = catalogPageRepository;
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
                        const columnMetadata = this.catalogPageRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);
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
                        const columnMetadata = this.catalogPageRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);
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
            const result = yield this.catalogPageRepository.findAndCount({
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
    getOne(pageId, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!pageId)
                throw new Error(`invalidParameters`);
            return yield this.catalogPageRepository.findOne({
                where: { id: pageId },
                relations: relations
            });
        });
    }
    put(page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!page)
                throw new Error(`invalidParameters`);
            const add = {
                id: null,
                parentId: page.parentId || -1,
                captionSave: page.captionSave || '',
                caption: page.caption || null,
                iconColor: page.iconColor || 1,
                iconImage: page.iconImage || 1,
                visible: page.visible || '1',
                enabled: page.enabled || '1',
                minRank: page.minRank || 1,
                clubOnly: page.clubOnly || '0',
                orderNum: page.orderNum || 0,
                pageLayout: page.pageLayout || 'default_3x3',
                pageHeadline: page.pageHeadline || '',
                pageTeaser: page.pageTeaser || '',
                pageSpecial: page.pageSpecial || '',
                pageText1: page.pageText1 || '',
                pageText2: page.pageText2 || '',
                pageTextDetails: page.pageTextDetails || '',
                pageTextTeaser: page.pageTextTeaser || '',
                vipOnly: page.vipOnly || '0',
                includes: page.includes || '',
                roomId: page.roomId || 0
            };
            if (!add.caption)
                throw new Error(`invalidPage`);
            return yield this.catalogPageRepository.save(add);
        });
    }
    patch(pageId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!pageId || !page)
                throw new Error(`invalidParameters`);
            const result = yield this.catalogPageRepository.findOne(pageId);
            if (!result)
                throw new Error(`invalidPage`);
            const update = {
                id: pageId,
                parentId: page.parentId || result.parentId,
                captionSave: page.captionSave || result.captionSave,
                caption: page.caption || result.caption,
                iconColor: page.iconColor || result.iconColor,
                iconImage: page.iconImage || result.iconImage,
                visible: page.visible || result.visible,
                enabled: page.enabled || result.enabled,
                minRank: page.minRank || result.minRank,
                clubOnly: page.clubOnly || result.clubOnly,
                orderNum: page.orderNum || result.orderNum,
                pageLayout: page.pageLayout || result.pageLayout,
                pageHeadline: page.pageHeadline || result.pageHeadline,
                pageTeaser: page.pageTeaser || result.pageTeaser,
                pageSpecial: page.pageSpecial || result.pageSpecial,
                pageText1: page.pageText1 || result.pageText1,
                pageText2: page.pageText2 || result.pageText2,
                pageTextDetails: page.pageTextDetails || result.pageTextDetails,
                pageTextTeaser: page.pageTextTeaser || result.pageTextDetails,
                vipOnly: page.vipOnly || result.vipOnly,
                includes: page.includes || result.includes,
                roomId: page.roomId || result.roomId
            };
            if (!update.caption)
                throw new Error(`invalidPage`);
            yield this.catalogPageRepository
                .createQueryBuilder()
                .update()
                .set(update)
                .where('id = :id', { id: pageId })
                .execute();
            return update;
        });
    }
    delete(pageId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!pageId)
                throw new Error(`invalidParameters`);
            yield this.catalogPageRepository.delete({ id: pageId });
            return true;
        });
    }
};
CatalogPageService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(catalogPage_entity_1.CatalogPageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CatalogPageService);
exports.CatalogPageService = CatalogPageService;
