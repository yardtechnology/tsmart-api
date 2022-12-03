"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    name: String,
    image: String,
    imagePath: String,
    description: String,
    parentCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
    },
    isFeatured: Boolean,
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.CategoryModel = (0, mongoose_1.model)("Category", categorySchema);
