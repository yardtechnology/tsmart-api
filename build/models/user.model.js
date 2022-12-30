"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var uuid_1 = require("uuid");
var crypto = require("crypto");
var userSchema = new mongoose_1.Schema({
    displayName: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        unique: true,
    },
    activeOTP: {
        otp: Number,
        createdAt: Date,
    },
    country: {
        code: String,
        name: String,
        phone: String,
    },
    avatar: String,
    avatarPath: String,
    email: {
        type: String,
    },
    gender: String,
    encrypted_password: String,
    salt: String,
    // password: String,
    token: String,
    dateOfBirth: String,
    role: {
        type: String,
        enum: ["USER", "MANAGER", "ADMIN", "TECHNICIAN"],
        default: "USER",
    },
    fcmTokens: {
        web: String,
        android: String,
        ios: String,
    },
    isLoggedIn: {
        type: Boolean,
        default: false,
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    isOnDuty: {
        type: Boolean,
        default: false,
    },
    blockStatus: String,
    status: {
        type: String,
        enum: ["INACTIVE", "ACTIVE", "VERIFIED"],
        default: "INACTIVE",
    },
    verificationInfo: {
        OTP: Number,
        OTPExpiry: Date,
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Store",
    },
    lastLogin: Date,
    faceVideo: String,
    faceVideoPATH: String,
    latitude: Number,
    longitude: Number,
    location: String,
    deviceType: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Device",
        },
    ],
    makeType: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Make",
        },
    ],
    isAcademicCourses: Boolean,
    experience: Number,
    age: Number,
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
    documentType: String,
    document: String,
    documentPATH: String,
}, { timestamps: true });
userSchema
    .virtual("password")
    .set(function (password) {
    this._password = password;
    this.salt = (0, uuid_1.v4)();
    console.log("salt:", this.salt);
    console.log("password:", password);
    this.encrypted_password = this.encryptPassword(password);
})
    .get(function () {
    return this._password;
});
userSchema.methods.authenticate = function (rawPassword) {
    return this.encryptPassword(rawPassword) === this.encrypted_password;
};
userSchema.methods.encryptPassword = function (rawPassword) {
    console.log("rawPassword:", rawPassword);
    if (!rawPassword) {
        return "";
    }
    try {
        return crypto
            .createHash("sha256", this.salt)
            .update(rawPassword)
            .digest("hex");
    }
    catch (error) {
        console.log("password encryption error:", error);
        return "";
    }
};
var UserModel = (0, mongoose_1.model)("User", userSchema);
exports.UserModel = UserModel;
