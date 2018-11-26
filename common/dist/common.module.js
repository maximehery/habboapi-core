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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const services_1 = require("./services");
let CommonModule = CommonModule_1 = class CommonModule {
    constructor(connection) {
        this.connection = connection;
        console.log(` [INITIALIZING] @habboapi/common@${process.env.npm_package_version}`);
    }
    static forRoot(configuration) {
        return {
            module: CommonModule_1,
            imports: [typeorm_1.TypeOrmModule.forRoot(configuration.database)],
            providers: [
                {
                    provide: services_1.ConfigService,
                    useFactory: () => {
                        return new services_1.ConfigService(configuration);
                    }
                },
                services_1.BackupService,
                services_1.LogService
            ],
            exports: [services_1.ConfigService, services_1.BackupService, services_1.LogService]
        };
    }
};
CommonModule = CommonModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({}),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], CommonModule);
exports.CommonModule = CommonModule;
var CommonModule_1;
