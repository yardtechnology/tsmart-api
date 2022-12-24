"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var configSchema = new mongoose_1.Schema({
    tax: {
        type: Number,
    },
    storeAndroid: {
        message: {
            type: String,
        },
        version: {
            type: String,
        },
        title: {
            type: String,
        },
        isDismissible: {
            type: Boolean,
        },
    },
    storeIos: {
        message: {
            type: String,
        },
        version: {
            type: String,
        },
        title: {
            type: String,
        },
        isDismissible: {
            type: Boolean,
        },
    },
    customerIos: {
        message: {
            type: String,
        },
        version: {
            type: String,
        },
        title: {
            type: String,
        },
        isDismissible: {
            type: Boolean,
        },
    },
    customerAndroid: {
        message: {
            type: String,
        },
        version: {
            type: String,
        },
        title: {
            type: String,
        },
        isDismissible: {
            type: Boolean,
        },
    },
    technicianAndroid: {
        message: {
            type: String,
        },
        version: {
            type: String,
        },
        title: {
            type: String,
        },
        isDismissible: {
            type: Boolean,
        },
    },
    technicianIos: {
        message: {
            type: String,
        },
        version: {
            type: String,
        },
        title: {
            type: String,
        },
        isDismissible: {
            type: Boolean,
        },
    },
    mailInInstauration: String,
    aboutUs: String,
    privacyPolicy: String,
    termsAndConditions: String,
    shoppingPolicy: String,
    mailInstructions: String,
    ourWarranty: String,
    storeRange: Number,
    orderCancelTime: Number,
    newsLatterEmails: [],
    technicianSearchRange: Number,
}, { timestamps: true });
var ConfigSchema = (0, mongoose_1.model)("Config", configSchema);
exports.default = ConfigSchema;
