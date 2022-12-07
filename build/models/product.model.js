"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    title: String,
    shortDescription: String,
    description: String,
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
    },
    stock: {
        type: Number,
        min: 0,
    },
    salePrice: Number,
    mrp: Number,
    displayImage: {
        url: String,
        path: String,
    },
    images: [
        {
            url: String,
            path: String,
        },
    ],
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Store",
    },
    variantOf: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
    },
    memory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Memory",
    },
    color: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Color",
    },
    condition: String,
    reviews: {
        total: {
            type: Number,
            default: 0,
        },
        stars: {
            type: Number,
            default: 0,
        },
    },
    device: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Device",
    },
    make: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Make",
    },
    model: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Model",
    },
    type: {
        type: String,
        default: "REFURBISHED",
    },
}, { timestamps: true });
exports.ProductModel = (0, mongoose_1.model)("Product", productSchema);
