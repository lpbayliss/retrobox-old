"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gateways_1 = require("../gateways");
const health = async (_req, res) => {
    const healthy = await gateways_1.PrismaGateway.checkHealth();
    return res.json({ healthy });
};
const controller = {
    health,
};
exports.default = controller;
