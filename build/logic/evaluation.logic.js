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
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var EvaluationLogic = /** @class */ (function () {
    function EvaluationLogic() {
    }
    /**
     * Device evaluation fn
     * @param  Props{evaluationPriceIds?: string[], modelId: string, colorId: string, memoryId: string}
     * @return Promise<{deductedPrice:number,estimatePrice:number, evaluatePrice:number}>
     * 'finalPrice' : it is the final price of the device
     * 'evaluatePrice' : it is the price, which amount deduct from the original price from the device
     */
    EvaluationLogic.prototype.deviceEvaluation = function (_a) {
        var _this = this;
        var evaluationPriceIds = _a.evaluationPriceIds, modelId = _a.modelId, colorId = _a.colorId, memoryId = _a.memoryId;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var evaluationPriceFind, _a, deductedPrice, sellPriceFind, evaluatePrice, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!(evaluationPriceIds === null || evaluationPriceIds === void 0 ? void 0 : evaluationPriceIds.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.EvaluationPriceSchema.find({
                                _id: { $in: evaluationPriceIds },
                            })];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = [];
                        _b.label = 3;
                    case 3:
                        evaluationPriceFind = _a;
                        if ((evaluationPriceIds === null || evaluationPriceIds === void 0 ? void 0 : evaluationPriceIds.length) && !evaluationPriceFind.length)
                            throw new Error("Evaluation price id are error.");
                        deductedPrice = evaluationPriceFind.reduce(function (ac, ele) {
                            return ac + ele.price;
                        }, 0);
                        return [4 /*yield*/, models_1.SalePriceModel.findOne({
                                model: modelId,
                                color: colorId,
                                memory: memoryId,
                            }).select("price")];
                    case 4:
                        sellPriceFind = _b.sent();
                        if (!sellPriceFind)
                            throw new Error("Sale price of this model is not found.");
                        evaluatePrice = (sellPriceFind === null || sellPriceFind === void 0 ? void 0 : sellPriceFind.price) - deductedPrice;
                        return [2 /*return*/, resolve({
                                deductedPrice: deductedPrice,
                                estimatePrice: sellPriceFind.price,
                                evaluatePrice: evaluatePrice,
                                // evaluationPriceFind,
                            })];
                    case 5:
                        error_1 = _b.sent();
                        reject(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    EvaluationLogic.prototype.sellSummery = function (_a) {
        var _this = this;
        var evaluationPriceIds = _a.evaluationPriceIds, sellPriceId = _a.sellPriceId;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var evaluationPriceFind, _a, deductedPrice, sellPriceFind, evaluatePrice, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!(evaluationPriceIds === null || evaluationPriceIds === void 0 ? void 0 : evaluationPriceIds.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.EvaluationPriceSchema.find({
                                _id: { $in: evaluationPriceIds },
                            }).populate([
                                {
                                    path: "model",
                                },
                                {
                                    path: "evaluation",
                                },
                            ])];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = [];
                        _b.label = 3;
                    case 3:
                        evaluationPriceFind = _a;
                        if ((evaluationPriceIds === null || evaluationPriceIds === void 0 ? void 0 : evaluationPriceIds.length) && !evaluationPriceFind.length)
                            throw new Error("Evaluation price id are error.");
                        deductedPrice = evaluationPriceFind.reduce(function (ac, ele) {
                            return ac + ele.price;
                        }, 0);
                        return [4 /*yield*/, models_1.SalePriceModel.findById(sellPriceId).select("price")];
                    case 4:
                        sellPriceFind = _b.sent();
                        if (!sellPriceFind)
                            throw new Error("Sale price of this model is not found.");
                        evaluatePrice = (sellPriceFind === null || sellPriceFind === void 0 ? void 0 : sellPriceFind.price) - deductedPrice;
                        return [2 /*return*/, resolve({
                                deductedPrice: deductedPrice,
                                estimatePrice: sellPriceFind.price,
                                evaluatePrice: evaluatePrice,
                                evaluationPriceFind: evaluationPriceFind,
                            })];
                    case 5:
                        error_2 = _b.sent();
                        reject(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    return EvaluationLogic;
}());
exports.default = EvaluationLogic;
