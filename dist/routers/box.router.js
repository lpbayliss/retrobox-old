"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post("/api/box", controllers_1.BoxController.create);
router.get("/api/box/:id", controllers_1.BoxController.fetch);
exports.default = router;
