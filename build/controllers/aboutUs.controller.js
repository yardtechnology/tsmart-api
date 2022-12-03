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
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var aboutUs_logic_1 = __importDefault(require("../logic/aboutUs.logic"));
var aboutUs_model_1 = require("../models/aboutUs.model");
var AboutUs = /** @class */ (function (_super) {
    __extends(AboutUs, _super);
    function AboutUs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // create AboutUs
    AboutUs.prototype.createAboutUsController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var errors, aboutUsData, error_1;
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
                        return [4 /*yield*/, _super.prototype.createAboutUs.call(this, {
                                title: req.body.title,
                                description: req.body.description,
                                imageFile: (_a = req.files) === null || _a === void 0 ? void 0 : _a.image,
                            })];
                    case 1:
                        aboutUsData = _b.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "AboutUs created successfully",
                            data: aboutUsData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //update aboutUs
    AboutUs.prototype.updateAboutUsController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var errors, aboutUsData, error_2;
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
                        return [4 /*yield*/, _super.prototype.updateAboutUs.call(this, {
                                id: req.params.aboutUsId,
                                title: req.body.title,
                                description: req.body.description,
                                imageFile: (_a = req.files) === null || _a === void 0 ? void 0 : _a.image,
                            })];
                    case 1:
                        aboutUsData = _b.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "AboutUs updated successfully",
                            data: aboutUsData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get all aboutUss
    AboutUs.prototype.getAllAboutUssController = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var query, aboutUss, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        query = { type: (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.toString()) === null || _c === void 0 ? void 0 : _c.toUpperCase() };
                        !((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.type) && delete query.type;
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: aboutUs_model_1.AboutUsModel,
                                query: query,
                                limit: req.query.limit,
                                chunk: req.query.chunk,
                                sort: { createdAt: -1 },
                            })];
                    case 1:
                        aboutUss = _e.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "AboutUss found successfully",
                            data: aboutUss,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _e.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //delete aboutUs
    AboutUs.prototype.deleteAboutUsController = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var aboutUsData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _super.prototype.deleteAboutUs.call(this, req.params.aboutUsId)];
                    case 1:
                        aboutUsData = _a.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "AboutUs deleted successfully",
                            data: aboutUsData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AboutUs;
}(aboutUs_logic_1.default));
exports.default = AboutUs;
