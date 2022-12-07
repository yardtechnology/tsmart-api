"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModel = void 0;
var mongoose_1 = require("mongoose");
var storeSchema = new mongoose_1.Schema({
    displayName: String,
    email: String,
    phoneNumber: Number,
    countryCode: Number,
    imageURL: String,
    imagePath: String,
    about: String,
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        default: "STORE",
    },
    address: {
        state: String,
        city: String,
        street: String,
        country: String,
        zip: String,
        latitude: Number,
        longitude: Number,
    },
    reviews: {
        total: {
            type: Number,
            default: 0,
        },
        stars: {
            type: Number,
            default: 0,
        },
    },
    timing: String,
}, { timestamps: true });
exports.StoreModel = (0, mongoose_1.model)("Store", storeSchema);
