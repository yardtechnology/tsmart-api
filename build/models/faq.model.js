"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQModel = void 0;
var mongoose_1 = require("mongoose");
var faqSchema = new mongoose_1.Schema({
    question: String,
    answer: String,
}, { timestamps: true });
exports.FAQModel = (0, mongoose_1.model)("Faq", faqSchema);
