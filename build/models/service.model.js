"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = void 0;
var mongoose_1 = require("mongoose");
var serviceSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    image: String,
    imagePATH: String,
}, { timestamps: true });
exports.ServiceModel = (0, mongoose_1.model)("Service", serviceSchema);
