"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = exports.DumpController = exports.BoxController = exports.HealthController = void 0;
var health_controller_1 = require("./health.controller");
Object.defineProperty(exports, "HealthController", { enumerable: true, get: function () { return __importDefault(health_controller_1).default; } });
var box_controller_1 = require("./box.controller");
Object.defineProperty(exports, "BoxController", { enumerable: true, get: function () { return __importDefault(box_controller_1).default; } });
var dump_controller_1 = require("./dump.controller");
Object.defineProperty(exports, "DumpController", { enumerable: true, get: function () { return __importDefault(dump_controller_1).default; } });
var item_controller_1 = require("./item.controller");
Object.defineProperty(exports, "ItemController", { enumerable: true, get: function () { return __importDefault(item_controller_1).default; } });
