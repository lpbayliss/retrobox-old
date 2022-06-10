"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DumpRouter = exports.ItemRouter = exports.BoxRouter = exports.HealthRouter = void 0;
var health_router_1 = require("./health.router");
Object.defineProperty(exports, "HealthRouter", { enumerable: true, get: function () { return __importDefault(health_router_1).default; } });
var box_router_1 = require("./box.router");
Object.defineProperty(exports, "BoxRouter", { enumerable: true, get: function () { return __importDefault(box_router_1).default; } });
var item_router_1 = require("./item.router");
Object.defineProperty(exports, "ItemRouter", { enumerable: true, get: function () { return __importDefault(item_router_1).default; } });
var dump_router_1 = require("./dump.router");
Object.defineProperty(exports, "DumpRouter", { enumerable: true, get: function () { return __importDefault(dump_router_1).default; } });
