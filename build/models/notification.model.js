"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var notificationSchema = new mongoose_1.Schema({
    icon: {
        type: String,
    },
    iconPATH: {
        type: String,
    },
    title: {
        type: String,
        require: [true, "title is required."],
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        require: [true, "user id is required."],
    },
    readStatus: {
        type: Boolean,
        default: false,
    },
    redirectLink: {
        type: String,
    },
}, { timestamps: true });
var NotificationSchema = (0, mongoose_1.model)("Notification", notificationSchema);
exports.default = NotificationSchema;
