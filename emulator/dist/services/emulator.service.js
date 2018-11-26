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
const net_1 = require("net");
const common_2 = require("@habboapi/common");
let EmulatorService = class EmulatorService {
    constructor(configService, logService) {
        this.configService = configService;
        this.logService = logService;
        this.gameOnline = false;
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.checkGameStatus();
                this.logService.success(`[ONLINE] Arcturus Game Server: ${this.configService.config.emulator.ip}:${this.configService.config.emulator.port}`, 'EmulatorService');
            }
            catch (err) {
                if (err.message == 'gameOffline')
                    this.logService.error(`[OFFLINE] Arcturus Game Server: ${this.configService.config.emulator.ip}:${this.configService.config.emulator.port}`, err.stack, 'EmulatorService');
                else
                    this.logService.error(err.message, err.stack, 'EmulatorService');
            }
        });
    }
    checkGameStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const socket = new net_1.Socket();
                socket.connect(this.configService.config.emulator.port, this.configService.config.emulator.ip, () => {
                    this.gameOnline = true;
                    resolve(true);
                });
                socket.on('timeout', () => {
                    this.gameOnline = false;
                    reject(Error('gameOffline'));
                });
                socket.on('error', () => {
                    this.gameOnline = false;
                    reject(Error('gameOffline'));
                });
            });
        });
    }
};
EmulatorService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_2.ConfigService,
        common_2.LogService])
], EmulatorService);
exports.EmulatorService = EmulatorService;
