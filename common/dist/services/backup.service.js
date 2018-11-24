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
const mysqldump_1 = require("mysqldump");
const helpers_1 = require("../helpers");
const config_service_1 = require("./config.service");
let BackupService = class BackupService {
    constructor(configService) {
        this.configService = configService;
    }
    backupMysql(table) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mysqldump_1.default({
                connection: {
                    host: this.configService.config.database.host,
                    user: this.configService.config.database.username,
                    password: this.configService.config.database.password,
                    database: this.configService.config.database.database
                },
                dump: (table) ? { tables: table.split(null) } : null,
                dumpToFile: (table) ? `backups/${table}-${helpers_1.TimeHelper.formatNow('D-M-YY-HH-m')}.sql` : `backups/full-${helpers_1.TimeHelper.formatNow('D-M-YY-HH-m')}.sql`
            });
        });
    }
};
BackupService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], BackupService);
exports.BackupService = BackupService;
