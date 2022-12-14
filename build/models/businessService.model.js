"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var businessServiceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required."],
    },
    phoneNumber: {
        type: String,
        // required: [true, "phoneNumber is required."],
    },
    countryCode: {
        type: String,
        // required: [true, "countryCode is required."],
    },
    email: {
        type: String,
        required: [true, "email is required."],
    },
    companyName: {
        type: String,
        required: [true, "companyName is required."],
    },
    companyRegNumber: {
        type: String,
        required: [true, "companyRegNumber is required."],
    },
    message: {
        type: String,
        required: [true, "message is required."],
    },
}, { timestamps: true });
var BusinessServiceSchema = (0, mongoose_1.model)("BusinessService", businessServiceSchema);
exports.default = BusinessServiceSchema;
