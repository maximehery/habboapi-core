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
const common_2 = require("@habboapi/common");
const habbo_1 = require("@habboapi/habbo");
const session_service_1 = require("./session.service");
let AuthenticationService = class AuthenticationService {
    constructor(userService, sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username || !password)
                return Promise.reject('invalidParameters');
            const result = yield this.userService.login(username);
            if (!result)
                return Promise.reject('invalidLogin');
            if (!common_2.PasswordHelper.validatePassword(password, result.password))
                return Promise.reject('invalidLogin');
            const payload = {
                id: result.id,
                username: result.username,
                look: result.look,
                rank: result.rank
            };
            const token = this.sessionService.createToken(payload);
            return Promise.resolve(token);
        });
    }
};
AuthenticationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof habbo_1.UserService !== "undefined" && habbo_1.UserService) === "function" && _a || Object, session_service_1.SessionService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
var _a;
