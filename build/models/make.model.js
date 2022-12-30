"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var makeSchema = new mongoose_1.Schema({
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
        require: [true, "Make title is required."],
    },
    devices: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Device",
        },
    ],
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
var MakeSchema = (0, mongoose_1.model)("Make", makeSchema);
exports.default = MakeSchema;
