"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post("/api/dump", controllers_1.DumpController.create);
router.post("/api/dump/:id", controllers_1.DumpController.fetch);
exports.default = router;
