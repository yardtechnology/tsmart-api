"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModel = void 0;
var mongoose_1 = require("mongoose");
var newsSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    author: String,
    poster: String,
    posterPATH: String,
    tags: [String],
    article: String,
    link: String,
}, { timestamps: true });
exports.NewsModel = (0, mongoose_1.model)("News", newsSchema);
