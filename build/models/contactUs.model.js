"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var contactUsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required."],
    },
    email: {
        type: String,
        required: [true, "email is required."],
    },
    // phoneNumber: {
    //   type: String,
    //   required: [true, "phoneNumber is required."],
    // },
    // countryCode: {
    //   type: String,
    //   required: [true, "countryCode is required."],
    // },
    subject: {
        type: String,
        required: [true, "subject is required."],
    },
    message: {
        type: String,
        required: [true, "message is required."],
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Store",
    },
}, { timestamps: true });
var ContactUsSchema = (0, mongoose_1.model)("ContactUs", contactUsSchema);
exports.default = ContactUsSchema;
