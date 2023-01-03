"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var adminService = require("../../bevol-7455a-firebase-adminsdk-n8mab-cb96407494.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(adminService),
});
exports.default = firebase_admin_1.default;
