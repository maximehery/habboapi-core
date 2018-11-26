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
const catalog_1 = require("./catalog");
const chatlog_1 = require("./chatlog");
const group_1 = require("./group");
const item_1 = require("./item");
const moderation_1 = require("./moderation");
const room_1 = require("./room");
const user_1 = require("./user");
let HabboModule = class HabboModule {
    constructor() {
        console.log(` [INITIALIZING] @habboapi/habbo@${process.env.npm_package_version}`);
    }
};
HabboModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            catalog_1.CatalogModule,
            chatlog_1.ChatlogModule,
            group_1.GroupModule,
            item_1.ItemModule,
            moderation_1.ModerationModule,
            room_1.RoomModule,
            user_1.UserModule
        ]
    }),
    __metadata("design:paramtypes", [])
], HabboModule);
exports.HabboModule = HabboModule;
