"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDump = exports.createDump = exports.createItem = exports.fetchBox = exports.createBox = void 0;
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
const createBox = async (name) => {
    const data = await prisma.box.create({
        data: { name },
        select: { id: true },
    });
    return data;
};
exports.createBox = createBox;
const fetchBox = async (id) => {
    const data = await prisma.box.findUnique({
        where: { id },
        include: {
            items: {
                where: { isDumped: false },
                select: { body: true, submitter: true },
            },
            itemDumps: {
                select: {
                    id: true,
                    createdAt: true,
                },
            },
        },
    });
    return Object.assign(Object.assign({}, data), { lastDump: data.lastDump.toISOString(), itemDumps: data.itemDumps.map((dump) => (Object.assign(Object.assign({}, dump), { createdAt: dump.createdAt.toISOString() }))) });
};
exports.fetchBox = fetchBox;
const createItem = async (boxId, body, submitter = null) => {
    const data = await prisma.item.create({
        data: {
            body,
            submitter,
            Box: { connect: { id: boxId } },
        },
        select: {
            id: true,
            body: true,
            submitter: true,
        },
    });
    return data;
};
exports.createItem = createItem;
const createDump = async (boxId) => {
    const data = await prisma.itemDump.create({
        data: { Box: { connect: { id: boxId } } },
        select: { id: true },
    });
    await prisma.item.updateMany({
        where: { boxId },
        data: { itemDumpId: data.id, isDumped: true },
    });
    await prisma.box.update({
        where: { id: boxId },
        data: { lastDump: new Date() },
    });
    return data;
};
exports.createDump = createDump;
const fetchDump = async (dumpId) => {
    const data = await prisma.itemDump.findUnique({
        where: { id: dumpId },
        select: {
            items: { select: { submitter: true, body: true } },
            createdAt: true,
        },
    });
    return Object.assign(Object.assign({}, data), { createdAt: data.createdAt.toISOString() });
};
exports.fetchDump = fetchDump;
const gateway = {
    checkHealth,
    createBox: exports.createBox,
    fetchBox: exports.fetchBox,
    createItem: exports.createItem,
    createDump: exports.createDump,
    fetchDump: exports.fetchDump,
};
exports.default = gateway;
