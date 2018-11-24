"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs = require("bcryptjs");
class PasswordHelper {
    static validatePassword(check, against) {
        return bcryptjs.compareSync(check, against);
    }
    static encryptPassword(password) {
        return bcryptjs.hashSync(password);
    }
}
exports.PasswordHelper = PasswordHelper;
