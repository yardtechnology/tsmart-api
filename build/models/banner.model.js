"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerModel = void 0;
var mongoose_1 = require("mongoose");
var bannerSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    image: String,
    link: String,
    imagePath: String,
    data: {
        screen: String,
        id: String,
    },
    type: String,
    themeColor: String,
    textColor: String,
}, { timestamps: true });
exports.BannerModel = (0, mongoose_1.model)("Banner", bannerSchema);
