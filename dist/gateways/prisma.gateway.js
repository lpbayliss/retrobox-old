"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const checkHealth = async () => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        return true;
    }
    catch (e) {
        return false;
    }
};
const gateway = {
    checkHealth,
};
exports.default = gateway;
