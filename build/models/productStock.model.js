"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStockModel = void 0;
var mongoose_1 = require("mongoose");
var productStockSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
    },
    stock: Number,
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Store",
    },
}, { timestamps: true });
exports.ProductStockModel = (0, mongoose_1.model)("ProductStock", productStockSchema);
