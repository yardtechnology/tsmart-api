"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePropertySchema = void 0;
var mongoose_1 = require("mongoose");
var servicePropertySchema = new mongoose_1.Schema({
    title: String,
    description: String,
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Service",
    },
    type: {
        default: "string",
        type: String,
        enum: {
            message: "type must be string or boolean.",
            values: ["string", "boolean"],
        },
    },
}, { timestamps: true });
exports.ServicePropertySchema = (0, mongoose_1.model)("ServiceProperty", servicePropertySchema);
