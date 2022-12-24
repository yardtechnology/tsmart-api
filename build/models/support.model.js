"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var supportSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is required."],
    },
    countryCode: {
        type: String,
        required: [true, "Country Code is required."],
    },
    message: {
        type: String,
        required: [true, "Message is required."],
    },
    subject: {
        type: String,
        required: [true, "Subject is required."],
    },
    isReplayed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
var SupportSchema = (0, mongoose_1.model)("Support", supportSchema);
exports.default = SupportSchema;
