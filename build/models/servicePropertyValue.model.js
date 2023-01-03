"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePropertyValueSchema = void 0;
var mongoose_1 = require("mongoose");
var servicePropertyValueSchema = new mongoose_1.Schema({
    value: String,
    servicePrice: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ServicePrice",
    },
    serviceProperty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ServiceProperty",
    },
    model: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Model",
    },
}, { timestamps: true });
exports.ServicePropertyValueSchema = (0, mongoose_1.model)("ServicePropertyValue", servicePropertyValueSchema);
