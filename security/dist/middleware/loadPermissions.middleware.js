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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const permission_service_1 = require("../services/permission.service");
let LoadPermissionsMiddleware = class LoadPermissionsMiddleware {
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    resolve() {
        return (req, res, next) => {
            if (req.user && req.user.rank) {
                req.user.permissions = null;
                const permissions = this.permissionService.getPermissions(req.user.rank);
                if (!permissions)
                    throw new common_1.HttpException('invalidPermissions', common_1.HttpStatus.BAD_REQUEST);
                req.user.permissions = permissions;
            }
            return next();
        };
    }
};
LoadPermissionsMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], LoadPermissionsMiddleware);
exports.LoadPermissionsMiddleware = LoadPermissionsMiddleware;
