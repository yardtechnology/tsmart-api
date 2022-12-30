"use strict";
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
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var faq_model_1 = require("../models/faq.model");
var FAQLogic = /** @class */ (function () {
    function FAQLogic() {
    }
    /**
     * add to FAQ
     * @param Props { question: string, answer: string }
     * @returns Promise<FAQType>
     */
    FAQLogic.prototype.add = function (Props) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var FAQData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new faq_model_1.FAQModel({
                                question: Props.question,
                                answer: Props.answer,
                            }).save()];
                    case 1:
                        FAQData = _a.sent();
                        resolve(FAQData);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * add to FAQ
     * @param Props { FAQId: string, question: string, answer: string }
     * @returns Promise<FAQType>
     */
    FAQLogic.prototype.update = function (Props) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var FAQData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, faq_model_1.FAQModel.findByIdAndUpdate(Props === null || Props === void 0 ? void 0 : Props.FAQId, {
                                question: Props.question,
                                answer: Props.answer,
                            })];
                    case 1:
                        FAQData = _a.sent();
                        resolve(FAQData);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        reject(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * remove from FAQ
     * @param {string} FAQId
     * @returns Promise<FAQType>
     */
    FAQLogic.prototype.remove = function (FAQId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var FAQ, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, faq_model_1.FAQModel.findByIdAndDelete(FAQId)];
                    case 1:
                        FAQ = _a.sent();
                        if (!FAQ)
                            throw new Error("FAQ not found");
                        resolve(FAQ);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        reject(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * get one users FAQ
     */
    FAQLogic.prototype.getAll = function (_a) {
        var _this = this;
        var limit = _a.limit, chunk = _a.chunk;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var FAQ, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: faq_model_1.FAQModel,
                                query: {},
                                limit: limit,
                                chunk: chunk,
                                sort: { createdAt: -1 },
                            })];
                    case 1:
                        FAQ = _a.sent();
                        if (!FAQ)
                            throw new Error("FAQ not found");
                        resolve(FAQ);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        reject(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return FAQLogic;
}());
exports.default = FAQLogic;
