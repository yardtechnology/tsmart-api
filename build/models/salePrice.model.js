"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var salePriceSchema = new mongoose_1.Schema({
    price: Number,
    model: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Model",
    },
    memory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Memory",
    },
    color: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Color",
    },
}, { timestamps: true });
var SalePriceModel = (0, mongoose_1.model)("SalePrice", salePriceSchema);
exports.default = SalePriceModel;
