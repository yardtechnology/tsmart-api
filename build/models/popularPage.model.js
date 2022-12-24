"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var popularPageSchema = new mongoose_1.Schema({
    url: String,
    title: String,
    count: Number,
}, { timestamps: true });
var PopularPageSchema = (0, mongoose_1.model)("PopularPage", popularPageSchema);
exports.default = PopularPageSchema;
