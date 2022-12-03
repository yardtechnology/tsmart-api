"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModel = void 0;
var mongoose_1 = require("mongoose");
var addressSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: String,
    landmark: {
        type: String,
    },
    email: String,
    phoneNumber: {
        type: Number,
        required: true,
    },
    countryCode: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zip: Number,
    isDefault: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ["HOME", "WORK", "OTHER"],
        default: "OTHER",
    },
    houseNumber: String,
    latitude: Number,
    longitude: Number,
}, { timestamps: true });
exports.AddressModel = (0, mongoose_1.model)("Address", addressSchema);
