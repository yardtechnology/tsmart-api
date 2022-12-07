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
var banner_logic_1 = __importDefault(require("../logic/banner.logic"));
var banner_model_1 = require("../models/banner.model");
var Banner = /** @class */ (function (_super) {
    __extends(Banner, _super);
    function Banner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validateCreateBannerFields = [
            (0, express_validator_1.body)("title")
                .not()
                .isEmpty()
                .withMessage("Title is required")
                .isLength({ min: 3, max: 25 })
                .withMessage("Title must be between 3 and 25 characters"),
            (0, express_validator_1.body)("link")
                .optional()
                .isLength({ min: 3, max: 500 })
                .withMessage("Link must be between 3 and 500 characters"),
            (0, express_validator_1.body)("description")
                .optional()
                .isLength({ min: 10, max: 250 })
                .withMessage("description must be between 10 and 250 characters"),
            (0, express_validator_1.body)("type")
                .not()
                .isEmpty()
                .withMessage("Type is required")
                .isLength({ min: 3, max: 26 })
                .withMessage("Type must be between 3 and 26 characters")
                .toUpperCase(),
            (0, express_validator_1.body)("themeColor")
                .optional()
                .isHexColor()
                .withMessage("Theme color must be a valid hex color"),
            (0, express_validator_1.body)("textColor")
                .optional()
                .isHexColor()
                .withMessage("Text color must be a valid hex color"),
        ];
        _this.validateUpdateBannerFields = [
            (0, express_validator_1.body)("title")
                .optional()
                .isLength({ min: 3, max: 25 })
                .withMessage("Title must be between 3 and 25 characters"),
            (0, express_validator_1.body)("link")
                .optional()
                .isLength({ min: 3, max: 500 })
                .withMessage("Link must be between 3 and 500 characters"),
            (0, express_validator_1.body)("description")
                .optional()
                .isLength({ min: 10, max: 250 })
                .withMessage("description must be between 10 and 250 characters"),
            (0, express_validator_1.body)("type")
                .optional()
                .isLength({ min: 3, max: 26 })
                .withMessage("Type must be between 3 and 26 characters")
                .toUpperCase(),
            (0, express_validator_1.body)("themeColor")
                .optional()
                .isHexColor()
                .withMessage("Theme color must be a valid hex color"),
            (0, express_validator_1.body)("textColor")
                .optional()
                .isHexColor()
                .withMessage("Text color must be a valid hex color"),
        ];
        return _this;
    }
    // create Banner
    Banner.prototype.createBannerController = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var errors, bannerData, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        return [4 /*yield*/, _super.prototype.createBanner.call(this, {
                                title: req.body.title,
                                description: req.body.description,
                                imageFile: (_a = req.files) === null || _a === void 0 ? void 0 : _a.image,
                                link: req.body.link,
                                data: {
                                    screen: req.body.dataScreen || ((_b = req.body.data) === null || _b === void 0 ? void 0 : _b.screen),
                                    id: req.body.dataId || ((_c = req.body.data) === null || _c === void 0 ? void 0 : _c.id),
                                },
                                type: req.body.type,
                                themeColor: req.body.themeColor,
                                textColor: req.body.textColor,
                            })];
                    case 1:
                        bannerData = _d.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Banner created successfully",
                            data: bannerData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _d.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //update banner
    Banner.prototype.updateBannerController = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var errors, bannerData, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        return [4 /*yield*/, _super.prototype.updateBanner.call(this, {
                                id: req.params.bannerId,
                                title: req.body.title,
                                description: req.body.description,
                                imageFile: (_a = req.files) === null || _a === void 0 ? void 0 : _a.image,
                                data: {
                                    screen: req.body.dataScreen || ((_b = req.body.data) === null || _b === void 0 ? void 0 : _b.screen),
                                    id: req.body.dataId || ((_c = req.body.data) === null || _c === void 0 ? void 0 : _c.id),
                                },
                                link: req.body.link,
                                type: req.body.type,
                                themeColor: req.body.themeColor,
                                textColor: req.body.textColor,
                            })];
                    case 1:
                        bannerData = _d.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Banner updated successfully",
                            data: bannerData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _d.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get all banners
    Banner.prototype.getAllBannersController = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var query, banners, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        query = { type: (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.toString()) === null || _c === void 0 ? void 0 : _c.toUpperCase() };
                        !((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.type) && delete query.type;
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: banner_model_1.BannerModel,
                                query: query,
                                limit: req.query.limit,
                                chunk: req.query.chunk,
                                sort: { createdAt: -1 },
                            })];
                    case 1:
                        banners = _e.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Banners found successfully",
                            data: banners,
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
    //delete banner
    Banner.prototype.deleteBannerController = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var bannerData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _super.prototype.deleteBanner.call(this, req.params.bannerId)];
                    case 1:
                        bannerData = _a.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Banner deleted successfully",
                            data: bannerData,
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
    return Banner;
}(banner_logic_1.default));
exports.default = Banner;
