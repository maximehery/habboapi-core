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
const chalk_1 = require("chalk");
const moment = require("moment");
const config_service_1 = require("./config.service");
let LogService = class LogService {
    constructor(configService) {
        this.configService = configService;
        this.logAppend = chalk_1.default.green(' [HabboAPI] ') + moment().format('D/M/YY h:mm:ss A') + ' - ';
    }
    log(message, context) {
        if (context == 'NestApplication' && message == 'Nest application successfully started') {
            this.success(`[ONLINE] API Server: ${this.configService.config.http.ip}:${this.configService.config.http.port}`, 'HabboAPI');
            return;
        }
        if (context == 'RouterExplorer' || context == 'RoutesResolver')
            return;
        else
            return console.log(this.logAppend + (context ? chalk_1.default.yellow(`[${context}] `) : null) + message);
    }
    error(message, trace, context) {
        return console.log(this.logAppend + (context ? chalk_1.default.yellow(`[${context}] `) : null) + chalk_1.default.red(message));
    }
    success(message, context) {
        return console.log(this.logAppend + (context ? chalk_1.default.yellow(`[${context}] `) : null) + chalk_1.default.green(message));
    }
    warn(message, context) {
        return console.log(this.logAppend + (context ? chalk_1.default.yellow(`[${context}] `) : null) + chalk_1.default.yellow(message));
    }
};
LogService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], LogService);
exports.LogService = LogService;
