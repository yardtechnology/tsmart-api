"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhiteListModel = void 0;
var mongoose_1 = require("mongoose");
var crypto = require("crypto");
var whitelistSchema = new mongoose_1.Schema({
    phoneNumber: Number,
    otp: Number,
}, { timestamps: true });
exports.WhiteListModel = (0, mongoose_1.model)("Whitelist", whitelistSchema);
