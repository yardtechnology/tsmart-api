"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = void 0;
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    comment: String,
    blog: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Blog",
    },
}, { timestamps: true });
exports.CommentSchema = (0, mongoose_1.model)("Comment", commentSchema);
