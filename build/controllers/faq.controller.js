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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var faq_logic_1 = __importDefault(require("../logic/faq.logic"));
var FAQ = /** @class */ (function (_super) {
    __extends(FAQ, _super);
    function FAQ() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validateCreateFAQ = [
            (0, express_validator_1.body)("question")
                .not()
                .isEmpty()
                .withMessage("Question is required")
                .isLength({ min: 3 })
                .withMessage("Question must be at least 3 characters long")
                .isLength({ max: 101 })
                .withMessage("Question must be at most 101 characters long"),
            (0, express_validator_1.body)("answer")
                .not()
                .isEmpty()
                .withMessage("Answer is required")
                .isLength({ min: 3 })
                .withMessage("Answer must be at least 3 characters long"),
        ];
        _this.validateUpdateFAQ = [
            (0, express_validator_1.body)("question")
                .optional()
                .isLength({ min: 3 })
                .withMessage("Question must be at least 3 characters long")
                .isLength({ max: 101 })
                .withMessage("Question must be at most 101 characters long"),
            (0, express_validator_1.body)("answer")
                .optional()
                .isLength({ min: 3 })
                .withMessage("Answer must be at least 3 characters long"),
        ];
        return _this;
    }
    // add to faq
    FAQ.prototype.createFAQController = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, _a, question, answer, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        _a = req.body, question = _a.question, answer = _a.answer;
                        return [4 /*yield*/, _super.prototype.add.call(this, {
                                question: question,
                                answer: answer,
                            })];
                    case 1:
                        _b.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "FAQ Added Successfully",
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // update to faq
    FAQ.prototype.updateFAQController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var errors, _b, question, answer, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        _b = req.body, question = _b.question, answer = _b.answer;
                        return [4 /*yield*/, _super.prototype.update.call(this, {
                                FAQId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.faqId,
                                question: question,
                                answer: answer,
                            })];
                    case 1:
                        _c.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "FAQ updated Successfully",
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _c.sent();
                        // send error to client
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * remove from faq
     * @param req
     * @param res
     * @param next
     */
    FAQ.prototype.deleteFAQController = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var FAQId, faq, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        FAQId = req.params.FAQId;
                        return [4 /*yield*/, _super.prototype.remove.call(this, FAQId)];
                    case 1:
                        faq = _a.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "FAQ deleted successfully",
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        // send error to client
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * get all faq
     * @param req
     * @param res
     * @param next
     */
    FAQ.prototype.getAllFAQController = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var faq, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _super.prototype.getAll.call(this, {
                                limit: req.query.limit ? Number(req.query.limit) : undefined,
                                chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                            })];
                    case 1:
                        faq = _a.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "FAQ retrieved successfully",
                            data: faq,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        // send error to client
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FAQ;
}(faq_logic_1.default));
exports.default = FAQ;
