"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var timingSchema = new mongoose_1.Schema({
    numberOfRepairers: {
        type: Number,
        default: 0,
    },
    durationInMin: {
        type: Number,
        default: 30,
    },
    dayOfWeekNumber: {
        type: Number,
        default: 1,
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Store",
        default: undefined,
    },
}, { timestamps: true });
var TimingSchema = (0, mongoose_1.model)("Timing", timingSchema);
exports.default = TimingSchema;
