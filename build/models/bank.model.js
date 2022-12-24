"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankModel = void 0;
var mongoose_1 = require("mongoose");
var bankSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, "fullName is required."],
    },
    accountNumber: {
        type: Number,
        required: [true, "accountNumber is required."],
    },
    bankName: {
        type: String,
        required: [true, "bankName is required."],
    },
    SORDCode: {
        type: String,
        required: [true, "SORDCode is required."],
    },
    user: {
        required: [true, "user is required."],
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.BankModel = (0, mongoose_1.model)("Bank", bankSchema);
