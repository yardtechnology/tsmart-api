"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var warrantySchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
    },
    name: {
        type: String,
        required: [true, "name is required."],
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is required."],
    },
    makeModel: {
        type: String,
        required: [true, "makeModel is required."],
    },
    storeVisited: {
        type: String,
        required: [true, "StoreVisited is required."],
    },
    claimInformation: {
        type: String,
        required: [true, "ClaimInformation is required."],
    },
}, { timestamps: true });
var WarrantySchema = (0, mongoose_1.model)("Warranty", warrantySchema);
exports.default = WarrantySchema;
