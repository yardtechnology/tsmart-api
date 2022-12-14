"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
var mongoose_1 = require("mongoose");
var orderSchema = new mongoose_1.Schema({
    user: {},
    store: {
        type: {},
    },
    product: {
        type: {},
    },
    quantity: Number,
    billing: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Billing",
    },
    extraBilling: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Billing",
    },
    address: {
        type: {},
    },
    ETA: {
        type: Date,
    },
    status: String,
    trackingNumber: String,
    totalPrice: Number,
    totalMrp: Number,
    faceVideo: String,
    faceVideoPath: String,
    startImage: String,
    startImagePATH: String,
    technician: {
        type: {},
    },
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    technicianID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    storeID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Store",
    },
    endOTP: {
        verifiedAt: Date,
        isVerified: {
            type: Boolean,
            default: false,
        },
        otp: Number,
    },
    endImage: String,
    endImagePATH: String,
    service: [],
    scheduledTime: Date,
    technicianImage: String,
    technicianImagePATH: String,
    startOTP: {
        verifiedAt: Date,
        isVerified: {
            type: Boolean,
            default: false,
        },
        otp: Number,
    },
    type: String,
    price: Number,
    mrp: Number,
    serviceType: String,
    evaluatedPrice: Number,
    evaluatedValues: [],
    paymentMethod: String,
    make: {},
    model: {},
    device: {},
    makeId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Make" },
    modelId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Model" },
    deviceId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Device" },
    bankDetails: {
        fullName: String,
        accountNumber: Number,
        sortCode: String,
        user: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    color: {},
    memory: {},
    colorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Color",
    },
    memoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Memory" },
    extraServices: [],
    accessory: [],
    imei: String,
    nearByTechnicians: [],
}, { timestamps: true });
exports.OrderModel = (0, mongoose_1.model)("Order", orderSchema);
