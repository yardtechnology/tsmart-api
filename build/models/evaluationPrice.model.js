"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var evaluationPriceSchema = new mongoose_1.Schema({
    price: {
        type: Number,
    },
    evaluation: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Evaluation",
    },
    model: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Model",
    },
}, { timestamps: true });
var EvaluationPriceSchema = (0, mongoose_1.model)("EvaluationPrice", evaluationPriceSchema);
exports.default = EvaluationPriceSchema;
