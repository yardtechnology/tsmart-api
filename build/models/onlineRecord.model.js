"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineRecordSchema = void 0;
var mongoose_1 = require("mongoose");
var onlineRecordSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    startTime: Date,
    endTime: Date,
    totalSeconds: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.OnlineRecordSchema = (0, mongoose_1.model)("OnlineRecord", onlineRecordSchema);
