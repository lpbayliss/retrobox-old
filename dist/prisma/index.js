"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDump = exports.createDump = exports.addItem = exports.fetchBox = exports.createBox = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBox = async (name) => {
    const data = await prisma.box.create({
        data: { name },
        include: { itemDumps: true, items: true },
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
    return data;
};
exports.fetchBox = fetchBox;
const addItem = async (boxId, body, submitter = null) => {
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
exports.addItem = addItem;
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
        select: { items: true, id: true, createdAt: true },
    });
    return data;
};
exports.fetchDump = fetchDump;
exports.default = prisma;
