"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var deviceSchema = new mongoose_1.Schema({
    image: {
        type: String,
    },
    imagePATH: {
        type: String,
    },
    title: {
        type: String,
        unique: true,
        index: true,
        require: [true, "Device title is required."],
    },
    type: [
        {
            type: String,
            enum: {
                values: ["SERVICE", "SELL"],
                message: "type must be SERVICE or SELL",
            },
        },
    ],
}, { timestamps: true });
var DevicesSchema = (0, mongoose_1.model)("Device", deviceSchema);
exports.default = DevicesSchema;
