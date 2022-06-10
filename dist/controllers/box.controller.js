"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const await_to_js_1 = __importDefault(require("await-to-js"));
const gateways_1 = require("../gateways");
const createBox = async (req, res) => {
    const [err, data] = await (0, await_to_js_1.default)(gateways_1.PrismaGateway.createBox(req.body.name));
    if (err)
        return res.status(500).send(err.message);
    return res.status(201).json(data);
};
const fetchBox = async (req, res) => {
    const [err, data] = await (0, await_to_js_1.default)(gateways_1.PrismaGateway.fetchBox(req.params.id));
    if (err)
        return res.status(500).send(err.message);
    return res.status(200).json(data);
};
const createDump = async (req, res) => {
    const [err, data] = await (0, await_to_js_1.default)(gateways_1.PrismaGateway.createDump(req.params.id));
    if (err)
        return res.status(500).send(err.message);
    return res.status(201).json(data);
};
const fetchDump = async (req, res) => {
    const [err, data] = await (0, await_to_js_1.default)(gateways_1.PrismaGateway.fetchDump(req.params.id));
    if (err)
        return res.status(500).send(err.message);
    return res.status(200).json(data);
};
const createItem = async (req, res) => {
    const [err, data] = await (0, await_to_js_1.default)(gateways_1.PrismaGateway.createItem(req.params.id, req.body.body, req.body.submitter));
    if (err)
        return res.status(500).send(err.message);
    return res.status(201).json(data);
};
const controller = {
    createBox,
    fetchBox,
    createDump,
    fetchDump,
    createItem,
};
exports.default = controller;
