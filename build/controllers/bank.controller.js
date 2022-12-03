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
var express_validator_1 = require("express-validator");
var helper_1 = require("../helper");
var bank_model_1 = require("../models/bank.model");
var Bank = /** @class */ (function () {
    function Bank() {
        // finds validators for the bank creation request
        this.validateUpdateBankFields = [
            (0, express_validator_1.body)("fullName")
                .optional()
                .exists()
                .isLength({ min: 3 })
                .withMessage("[fullName]:Full name must be at least 3 characters long")
                .isLength({ max: 25 })
                .withMessage("[fullName]:Full name must be at most 25 characters long"),
            (0, express_validator_1.body)("accountNumber")
                .optional()
                .exists()
                .isLength({ min: 8 })
                .withMessage("accountNumber most be 8 digit.")
                .isLength({ max: 8 })
                .withMessage("accountNumber most be 8 digit."),
            (0, express_validator_1.body)("SORDCode")
                .optional()
                .exists()
                .isLength({ min: 6 })
                .withMessage("SORDCode most be 6 digit.")
                .isLength({ max: 6 })
                .withMessage("SORDCode most be 6 digit."),
            (0, express_validator_1.body)("bankName")
                .optional()
                .exists()
                .isLength({ min: 1 })
                .withMessage("[bankName]:Full name must be at least 1 characters long")
                .isLength({ max: 125 })
                .withMessage("[bankName]:Full name must be at most 125 characters long"),
        ];
    }
    // create bank
    Bank.prototype.createBank = function (req, res, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var bankData, error_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, bank_model_1.BankModel.findOneAndUpdate({ user: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id }, {
                                fullName: (_b = req.body) === null || _b === void 0 ? void 0 : _b.fullName,
                                accountNumber: (_c = req.body) === null || _c === void 0 ? void 0 : _c.accountNumber,
                                SORDCode: (_d = req.body) === null || _d === void 0 ? void 0 : _d.SORDCode,
                                bankName: (_e = req.body) === null || _e === void 0 ? void 0 : _e.bankName,
                            }, {
                                upsert: true,
                                runValidators: true,
                                new: true,
                            })];
                    case 1:
                        bankData = _f.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Bank added successfully",
                            data: bankData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _f.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get bank
    Bank.prototype.getBank = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var bankData, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, bank_model_1.BankModel.findOne({
                                user: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                            })];
                    case 1:
                        bankData = _b.sent();
                        if (!bankData)
                            throw new Error("Bank not found");
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Bank found successfully",
                            data: bankData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        // send error to client
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // get bank
    Bank.prototype.deleteBank = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var bankData, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, bank_model_1.BankModel.findOneAndDelete({
                                user: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                            })];
                    case 1:
                        bankData = _b.sent();
                        if (!bankData)
                            throw new Error("Bank not found");
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Bank deleted successfully",
                            data: bankData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        // send error to client
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Bank;
}());
exports.default = Bank;
