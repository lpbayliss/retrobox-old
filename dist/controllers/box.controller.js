"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create = async (_req, res) => {
    return res.json({ hello: "world" });
};
const fetch = async (_req, res) => {
    return res.json({ hello: "world" });
};
const controller = {
    create,
    fetch,
};
exports.default = controller;
