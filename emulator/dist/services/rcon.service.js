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
const tcpPortUsed = require("tcp-port-used");
const promise_socket_1 = require("promise-socket");
const common_2 = require("@habboapi/common");
let RconService = class RconService {
    constructor(configService, logService) {
        this.configService = configService;
        this.logService = logService;
        this.rconOnline = false;
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.checkRconStatus();
                this.logService.success(`[ONLINE] Arcturus RCON Server: ${this.configService.config.emulator.ip}:${this.configService.config.emulator.portRcon}`, `RconService`);
            }
            catch (err) {
                if (err.message == 'rconOffline')
                    this.logService.error(`[OFFLINE] Arcturus RCON Server: ${this.configService.config.emulator.ip}:${this.configService.config.emulator.portRcon}`, err.stack, `RconService`);
                else
                    this.logService.error(err.message, err.stack, `RconService`);
            }
        });
    }
    checkRconStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield tcpPortUsed.check(this.configService.config.emulator.portRcon, this.configService.config.emulator.ip);
            if (!status) {
                this.rconOnline = false;
                throw new Error(`rconOffline`);
            }
            this.rconOnline = true;
            return true;
        });
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message)
                throw new Error(`invalidParameters`);
            yield this.checkRconStatus();
            const socket = new promise_socket_1.PromiseSocket();
            yield socket.connect(this.configService.config.emulator.portRcon, this.configService.config.emulator.ip);
            yield socket.write(JSON.stringify(message));
            const socketResponse = yield socket.readAll();
            socket.destroy();
            const socketResponseMessage = socketResponse.toString('utf8');
            if (!socketResponseMessage)
                throw new Error(`rconNoResponse`);
            const rconResponse = JSON.parse(socketResponseMessage);
            if (rconResponse.status == 2)
                throw new Error(`rconHabboNotFound`);
            return true;
        });
    }
};
RconService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_2.ConfigService,
        common_2.LogService])
], RconService);
exports.RconService = RconService;
