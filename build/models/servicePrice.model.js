"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePriceModel = void 0;
var mongoose_1 = require("mongoose");
var servicePriceSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    image: String,
    imagePATH: String,
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Service",
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Store",
    },
    isInStock: {
        type: Boolean,
        default: true,
    },
    mrp: Number,
    salePrice: Number,
    model: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Model",
    },
    type: String,
    isMostPopular: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.ServicePriceModel = (0, mongoose_1.model)("ServicePrice", servicePriceSchema);
