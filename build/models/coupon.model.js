"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var couponSchema = new mongoose_1.Schema({
    code: {
        type: String,
        unique: true,
        required: [true, "Code is required."],
    },
    discountPercent: {
        type: Number,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    maxCashBack: {
        type: Number,
    },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    maxUses: {
        default: 0,
        type: Number,
    },
    title: {
        type: String,
        required: [true, "Title is required."],
    },
    description: {
        type: String,
        required: [true, "Description is required."],
    },
}, { timestamps: true });
var CouponSchema = (0, mongoose_1.model)("Coupon", couponSchema);
exports.default = CouponSchema;
