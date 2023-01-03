"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var memorySchema = new mongoose_1.Schema({
    internal: String,
    ram: String,
}, { timestamps: true });
var MemorySchema = (0, mongoose_1.model)("Memory", memorySchema);
exports.default = MemorySchema;
