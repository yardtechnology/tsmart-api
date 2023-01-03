"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var colorSchema = new mongoose_1.Schema({
    color: String,
    hashCode: String,
}, { timestamps: true });
var ColorSchema = (0, mongoose_1.model)("Color", colorSchema);
exports.default = ColorSchema;
