"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const controllers_1 = require("./controllers");
const entities_1 = require("./entities");
const services_1 = require("./services");
let ChatlogModule = class ChatlogModule {
};
ChatlogModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.ChatlogCommandEntity, entities_1.ChatlogPrivateEntity, entities_1.ChatlogRoomEntity])],
        controllers: [controllers_1.ChatlogPrivateController, controllers_1.ChatlogRoomController],
        exports: [services_1.ChatlogPrivateService, services_1.ChatlogRoomService],
        providers: [services_1.ChatlogPrivateService, services_1.ChatlogRoomService]
    })
], ChatlogModule);
exports.ChatlogModule = ChatlogModule;
