"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var faq_controller_1 = __importDefault(require("../controllers/faq.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var FAQ = /** @class */ (function (_super) {
    __extends(FAQ, _super);
    function FAQ() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.faqController = new faq_controller_1.default();
        _this.addFAQRoute();
        _this.updateFAQRoute();
        _this.deleteFAQRoute();
        _this.getMyFAQRoute();
        return _this;
    }
    // add to faq
    FAQ.prototype.addFAQRoute = function () {
        this.router.post("/faq", _super.prototype.isAdmin, this.faqController.validateCreateFAQ, this.faqController.createFAQController);
    };
    // add to faq
    FAQ.prototype.updateFAQRoute = function () {
        this.router.put("/faq/:faqId", _super.prototype.isAdmin, this.faqController.validateUpdateFAQ, this.faqController.updateFAQController);
    };
    // delete faq
    FAQ.prototype.deleteFAQRoute = function () {
        this.router.delete("/faq/:FAQId", _super.prototype.isAdmin, this.faqController.deleteFAQController);
    };
    // get all faq
    FAQ.prototype.getMyFAQRoute = function () {
        this.router.get("/faqs", this.faqController.getAllFAQController);
    };
    return FAQ;
}(authenticate_middleware_1.default));
exports.default = FAQ;
