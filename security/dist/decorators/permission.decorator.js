"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.Permission = (...permissions) => common_1.ReflectMetadata('permissions', permissions);
