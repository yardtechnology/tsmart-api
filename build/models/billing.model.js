"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingModel = void 0;
var mongoose_1 = require("mongoose");
var billingSchema = new mongoose_1.Schema({
    orders: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    tax: Number,
    subPrice: Number,
    total: Number,
    metadata: {
        charged_id: String,
        balance_transaction: String,
        paymentId: String,
        clientSecret: String,
    },
    extraChargesMetadata: {
        charged_id: String,
        balance_transaction: String,
        paymentId: String,
        clientSecret: String,
    },
    couponDiscount: {
        coupon: String,
        benefitAmount: Number,
        activeAt: Date,
        couponId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Coupon",
        },
    },
    extraCharge: {
        amount: Number,
        comment: String,
        tax: Number,
    },
    status: {
        type: String,
        default: "PENDING",
    },
    type: {
        type: String,
        default: "REGULAR",
    },
}, { timestamps: true });
exports.BillingModel = (0, mongoose_1.model)("Billing", billingSchema);
