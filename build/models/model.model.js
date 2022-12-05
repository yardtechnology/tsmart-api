"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelModel = void 0;
var mongoose_1 = require("mongoose");
var modelSchema = new mongoose_1.Schema({
    title: {
        unique: true,
        type: String,
        required: true,
    },
    description: String,
    image: String,
    imagePATH: String,
    device: {
        required: [true, "Device id is required"],
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Device",
    },
    make: {
        required: [true, "Model id is required"],
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Make",
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
exports.ModelModel = (0, mongoose_1.model)("Model", modelSchema);
