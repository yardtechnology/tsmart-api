"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayModel = void 0;
var mongoose_1 = require("mongoose");
var holidaySchema = new mongoose_1.Schema({
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Store",
    },
    date: Date,
    title: String,
    description: String,
}, { timestamps: true });
exports.HolidayModel = (0, mongoose_1.model)("Holiday", holidaySchema);
