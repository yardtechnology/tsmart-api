"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var evaluationSchema = new mongoose_1.Schema({
    image: {
        type: String,
    },
    imagePATH: {
        type: String,
    },
    title: {
        type: String,
        unique: true,
        index: true,
        require: [true, "Device title is required."],
    },
    description: {
        type: String,
    },
}, { timestamps: true });
var EvaluationSchema = (0, mongoose_1.model)("Evaluation", evaluationSchema);
exports.default = EvaluationSchema;
