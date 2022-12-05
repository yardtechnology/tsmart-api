"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var reviewSchema = new mongoose_1.Schema({
    comment: {
        type: String,
        required: [true, "Comments is required."],
    },
    ratings: {
        type: Number,
        enum: {
            values: [1, 2, 3, 4, 5],
            message: "Rating must be more be require",
        },
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        default: undefined,
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Store",
        default: undefined,
    },
    technician: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        default: undefined,
    },
    user: {
        required: [true, "User is is require."],
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        default: undefined,
    },
    order: {
        required: [true, "Order is is require."],
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Order",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
var ReviewSchema = (0, mongoose_1.model)("Review", reviewSchema);
exports.default = ReviewSchema;
