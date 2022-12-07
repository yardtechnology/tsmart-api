"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
var mongoose_1 = require("mongoose");
var blogSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    author: String,
    poster: String,
    posterPATH: String,
    tags: [String],
    article: String,
}, { timestamps: true });
exports.BlogModel = (0, mongoose_1.model)("Blog", blogSchema);
