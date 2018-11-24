"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
class TimeHelper {
    static timestampNow() {
        return Math.floor(Date.now() / 1000);
    }
    static addToTimestampNow(seconds) {
        return this.timestampNow() + seconds;
    }
    static formatNow(value) {
        return moment().format(value);
    }
}
exports.TimeHelper = TimeHelper;
