"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var visitorSchema = new mongoose_1.Schema({
    windowsCount: {
        default: 0,
        type: Number,
    },
    macCount: {
        default: 0,
        type: Number,
    },
    androidCount: {
        default: 0,
        type: Number,
    },
    iosCount: {
        default: 0,
        type: Number,
    },
    otherCount: {
        default: 0,
        type: Number,
    },
}, { timestamps: true });
var VisitorSchema = (0, mongoose_1.model)("Visitor", visitorSchema);
exports.default = VisitorSchema;
