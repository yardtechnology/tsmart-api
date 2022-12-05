"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ReviewControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var models_1 = require("../models");
var store_model_1 = require("../models/store.model");
var user_model_1 = require("../models/user.model");
var product_model_1 = require("./../models/product.model");
var ReviewController = /** @class */ (function () {
    function ReviewController() {
    }
    ReviewController.prototype.create = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, comment, ratings, productId, storeId, technicianId, orderId, isAdmin, user, queryArg, reviewDevice, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 8, , 9]);
                        (0, helper_1.fieldValidateError)(req);
                        _b = req.body, comment = _b.comment, ratings = _b.ratings, productId = _b.productId, storeId = _b.storeId, technicianId = _b.technicianId, orderId = _b.orderId, isAdmin = _b.isAdmin;
                        user = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id;
                        queryArg = {};
                        if (!technicianId) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate(technicianId, {
                                $inc: {
                                    "reviews.total": 1,
                                    "reviews.stars": Number(ratings),
                                },
                            })];
                    case 1:
                        _c.sent();
                        queryArg = {
                            user: user,
                            technician: { $ne: technicianId },
                        };
                        _c.label = 2;
                    case 2:
                        if (!productId) return [3 /*break*/, 4];
                        return [4 /*yield*/, product_model_1.ProductModel.findByIdAndUpdate(productId, {
                                $inc: {
                                    "reviews.total": 1,
                                    "reviews.stars": Number(ratings),
                                },
                            })];
                    case 3:
                        _c.sent();
                        queryArg = {
                            user: user,
                            product: { $ne: productId },
                        };
                        _c.label = 4;
                    case 4:
                        if (!storeId) return [3 /*break*/, 6];
                        return [4 /*yield*/, store_model_1.StoreModel.findByIdAndUpdate(storeId, {
                                $inc: {
                                    "reviews.total": 1,
                                    "reviews.stars": Number(ratings),
                                },
                            })];
                    case 5:
                        _c.sent();
                        queryArg = {
                            user: user,
                            order: { $ne: orderId },
                        };
                        _c.label = 6;
                    case 6: return [4 /*yield*/, models_1.ReviewSchema.findOneAndUpdate(__assign({}, queryArg), {
                            comment: comment,
                            ratings: +ratings,
                            product: productId,
                            user: user,
                            store: storeId,
                            technician: technicianId,
                            isAdmin: isAdmin,
                            order: orderId,
                        }, {
                            upsert: true,
                            new: true,
                            runValidators: true,
                        })];
                    case 7:
                        reviewDevice = _c.sent();
                        if (!reviewDevice)
                            throw new http_errors_1.Conflict("Your review already recorded.");
                        res.json({
                            status: "SUCCESS",
                            message: "Review is created successfully.",
                            data: reviewDevice,
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _c.sent();
                        next(error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ReviewController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, reviewId, storeId, productId, userId, technicianId, orderId, isAdmin, query, getAllData, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, reviewId = _b.reviewId, storeId = _b.storeId, productId = _b.productId, userId = _b.userId, technicianId = _b.technicianId, orderId = _b.orderId, isAdmin = _b.isAdmin;
                        query = {};
                        reviewId && (query["_id"] = reviewId);
                        storeId && (query["store"] = storeId);
                        productId && (query["product"] = productId);
                        userId && (query["user"] = userId);
                        technicianId && (query["technician"] = technicianId);
                        orderId && (query["order"] = orderId);
                        isAdmin && (query["isAdmin"] = true);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.ReviewSchema,
                                query: query,
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                select: "",
                                populate: [
                                    {
                                        path: "user",
                                        select: "displayName email gender role avatar",
                                    },
                                    {
                                        path: "technician",
                                        select: "displayName email gender role avatar",
                                    },
                                    {
                                        path: "store",
                                        select: "displayName email imageURL",
                                    },
                                    {
                                        path: "product",
                                        select: "title shortDescription description mrp images displayImage salePrice",
                                    },
                                    {
                                        path: "order",
                                    },
                                ],
                                sort: {
                                    createdAt: -1,
                                },
                            })];
                    case 1:
                        getAllData = _c.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: reviewId
                                ? "Review found successfully."
                                : "All Review found successfully.",
                            data: reviewId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _c.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewController.prototype.deleteData = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var reviewId, deleteReview, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        reviewId = req.params.reviewId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.ReviewSchema.findByIdAndDelete(reviewId)];
                    case 1:
                        deleteReview = _a.sent();
                        //   delete device image
                        if (!deleteReview)
                            throw new http_errors_1.NotFound("Evaluation not found.");
                        if (!(deleteReview === null || deleteReview === void 0 ? void 0 : deleteReview.technician)) return [3 /*break*/, 3];
                        return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate(deleteReview === null || deleteReview === void 0 ? void 0 : deleteReview.technician, {
                                $inc: {
                                    "reviews.total": 1,
                                    "reviews.stars": Number(deleteReview === null || deleteReview === void 0 ? void 0 : deleteReview.ratings),
                                },
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(deleteReview === null || deleteReview === void 0 ? void 0 : deleteReview.product)) return [3 /*break*/, 5];
                        return [4 /*yield*/, product_model_1.ProductModel.findByIdAndUpdate(deleteReview === null || deleteReview === void 0 ? void 0 : deleteReview.product, {
                                $inc: {
                                    "reviews.total": 1,
                                    "reviews.stars": Number(deleteReview === null || deleteReview === void 0 ? void 0 : deleteReview.ratings),
                                },
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!(deleteReview === null || deleteReview === void 0 ? void 0 : deleteReview.store)) return [3 /*break*/, 7];
                        return [4 /*yield*/, product_model_1.ProductModel.findByIdAndUpdate(deleteReview === null || deleteReview === void 0 ? void 0 : deleteReview.store, {
                                $inc: {
                                    "reviews.total": 1,
                                    "reviews.stars": Number(deleteReview === null || deleteReview === void 0 ? void 0 : deleteReview.ratings),
                                },
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        res.json({
                            status: "SUCCESS",
                            message: "Review deleted successfully",
                            data: deleteReview,
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return ReviewController;
}());
exports.ReviewControllerValidation = {
    create: [
        (0, express_validator_1.body)("comment")
            .not()
            .isEmpty()
            .withMessage("comment is required.")
            .isLength({ min: 3 })
            .withMessage("comment must be at least 3 character.")
            .isLength({ max: 700 })
            .withMessage("comment must be at most 700 characters long"),
        (0, express_validator_1.body)("ratings")
            .not()
            .isEmpty()
            .withMessage("rating is required.")
            .isNumeric()
            .withMessage("Rating must be Number.")
            .exists()
            .custom(function (value, _a) {
            var req = _a.req;
            return value > 0 && value <= 5;
        })
            .withMessage("rating must be grater than 0 and less than 6."),
        (0, express_validator_1.oneOf)([
            (0, express_validator_1.body)("productId")
                .isMongoId()
                .withMessage("product id should be mongoose id."),
            (0, express_validator_1.body)("storeId")
                .isMongoId()
                .withMessage("storeId should be mongoose id."),
            (0, express_validator_1.body)("technicianId")
                .isMongoId()
                .withMessage("technicianId should be mongoose id."),
            (0, express_validator_1.body)("isAdmin").isBoolean().withMessage("isAdmin should be boolean"),
        ], "productId or technicianId or storeId one id is required."),
        (0, express_validator_1.body)("orderId")
            .not()
            .isEmpty()
            .withMessage("orderId should be required.")
            .isMongoId()
            .withMessage("orderId must be mongoose id."),
    ],
    delete: [
        (0, express_validator_1.param)("reviewId")
            .not()
            .isEmpty()
            .withMessage("reviewId is required.")
            .isMongoId()
            .withMessage("reviewId must be mongoose id."),
    ],
};
exports.default = ReviewController;
