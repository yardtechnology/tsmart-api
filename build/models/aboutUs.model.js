"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutUsModel = void 0;
var mongoose_1 = require("mongoose");
var aboutUsSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    image: String,
    imagePath: String,
}, { timestamps: true });
exports.AboutUsModel = (0, mongoose_1.model)("AboutUs", aboutUsSchema);
