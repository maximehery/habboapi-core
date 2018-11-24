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
const apiPermission_entity_1 = require("../entities/apiPermission.entity");
let PermissionService = class PermissionService {
    constructor(logService, apiPermissionRepository) {
        this.logService = logService;
        this.apiPermissionRepository = apiPermissionRepository;
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loadPermissions();
            }
            catch (err) {
                if (err.message == 'noPermissions')
                    this.logService.error(`No permissions have been set, authentication will be unavailable`, err.stack, 'ApiPermissionService');
                else
                    this.logService.error(err.message, err.stack, 'PermissionService');
            }
        });
    }
    loadPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            this.permissionList = [];
            const results = yield this.apiPermissionRepository.find();
            if (!results.length)
                return Promise.reject('noPermissions');
            yield results.forEach((result) => __awaiter(this, void 0, void 0, function* () { return this.permissionList.push(result); }));
            this.logService.success(`Loaded ${this.permissionList.length} permission groups`, 'PermissionService');
            return Promise.resolve(true);
        });
    }
    getPermissions(rankId) {
        const permissions = this.permissionList.find(rank => rank.id == rankId);
        if (!permissions)
            return null;
        return permissions;
    }
};
PermissionService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(apiPermission_entity_1.ApiPermissionEntity)),
    __metadata("design:paramtypes", [common_2.LogService,
        typeorm_2.Repository])
], PermissionService);
exports.PermissionService = PermissionService;
