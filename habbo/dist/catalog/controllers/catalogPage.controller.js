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
const security_1 = require("@habboapi/security");
const catalogPage_service_1 = require("../services/catalogPage.service");
let CatalogPageController = class CatalogPageController {
    constructor(catalogPageService) {
        this.catalogPageService = catalogPageService;
    }
    getAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.catalogPageService.getAll({
                    page: params.page,
                    relations: params.relations ? params.relations.split(',') : null
                });
                if (!result.pagination.totalItems)
                    throw new Error(`noPages`);
                return result;
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    getOne(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.catalogPageService.getOne(params.pageId, params.relations ? params.relations.split(',') : null);
                if (!result)
                    throw new Error(`invalidPage`);
                return result;
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    searchAll(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.catalogPageService.getAll(body.searchOptions);
                if (!result.pagination.totalItems)
                    throw new Error(`noPages`);
                return result;
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    patch(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.catalogPageService.patch(params.pageId, body.page);
                if (!result)
                    throw new Error(`invalidPage`);
                return result;
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    add(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.catalogPageService.put(body.page);
                if (!result)
                    throw new Error(`invalidPage`);
                return result;
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    delete(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.catalogPageService.delete(params.pageId);
                if (!result)
                    throw new Error(`invalidPage`);
                return null;
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
__decorate([
    common_1.Get('all/:page?/:relations?'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    security_1.Permission('catalog'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogPageController.prototype, "getAll", null);
__decorate([
    common_1.Get(':pageId/:relations?'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    security_1.Permission('catalog'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogPageController.prototype, "getOne", null);
__decorate([
    common_1.Post('search'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    security_1.Permission('catalog'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogPageController.prototype, "searchAll", null);
__decorate([
    common_1.Patch(':pageId'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    security_1.Permission('catalog', 'catalogPatch'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CatalogPageController.prototype, "patch", null);
__decorate([
    common_1.Put(),
    common_1.HttpCode(common_1.HttpStatus.OK),
    security_1.Permission('catalog', 'catalogPut'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogPageController.prototype, "add", null);
__decorate([
    common_1.Delete(':pageId'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    security_1.Permission('catalog', 'catalogDelete'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogPageController.prototype, "delete", null);
CatalogPageController = __decorate([
    common_1.Controller('page'),
    common_1.UseGuards(security_1.PermissionGuard),
    __metadata("design:paramtypes", [catalogPage_service_1.CatalogPageService])
], CatalogPageController);
exports.CatalogPageController = CatalogPageController;
