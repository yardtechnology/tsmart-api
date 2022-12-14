"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var joinOurTeamSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, " fullName is required."],
    },
    phoneNumber: {
        type: String,
        require: [true, "phoneNumber title is required."],
    },
    email: {
        type: String,
        require: [true, "email title is required."],
    },
    address: {
        type: String,
        require: [true, "address title is required."],
    },
    city: {
        type: String,
        required: [true, "city is required."],
    },
    postalPin: {
        type: String,
        required: [true, "postalPin is required."],
    },
    resume: {
        type: String,
    },
    resumePATH: {
        type: String,
    },
    rightToWorkInUk: {
        type: Boolean,
    },
    commuteIntoCentralLondon: {
        type: Boolean,
    },
}, { timestamps: true });
var JoinOurTeamSchema = (0, mongoose_1.model)("JoinOurTeam", joinOurTeamSchema);
exports.default = JoinOurTeamSchema;
