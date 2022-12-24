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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var mongoose_1 = require("mongoose");
var helper_1 = require("../helper");
var pagination_helper_1 = __importStar(require("../helper/pagination.helper"));
var models_1 = require("../models");
var CouponController = /** @class */ (function () {
    function CouponController() {
    }
    CouponController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var createCoupon, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.CouponSchema.create(__assign({}, req.body))];
                    case 1:
                        createCoupon = _a.sent();
                        if (!createCoupon)
                            throw new http_errors_1.InternalServerError("Something went wrong, Coupon is not created.");
                        res.json({
                            status: "SUCCESS",
                            message: "Config created successfully.",
                            data: createCoupon,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CouponController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var couponId, _a, discountPercent, startDate, endDate, maxUses, title, description, updateCouponData, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        couponId = req.params.couponId;
                        _a = req.body, discountPercent = _a.discountPercent, startDate = _a.startDate, endDate = _a.endDate, maxUses = _a.maxUses, title = _a.title, description = _a.description;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.CouponSchema.findByIdAndUpdate(couponId, {
                                discountPercent: discountPercent,
                                startDate: startDate,
                                endDate: endDate,
                                maxUses: maxUses,
                                title: title,
                                description: description,
                            }, {
                                runValidators: true,
                                new: true,
                            })];
                    case 1:
                        updateCouponData = _b.sent();
                        if (!updateCouponData)
                            throw new http_errors_1.InternalServerError("Something went wrong, Coupon is not updated.");
                        res.json({
                            status: "SUCCESS",
                            message: "Coupon updated successfully",
                            data: updateCouponData,
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
    CouponController.prototype.couponUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var couponId, _a, limit, chunk, aggregationQuery, couponUsers, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        couponId = req.params.couponId;
                        _a = req.query, limit = _a.limit, chunk = _a.chunk;
                        (0, helper_1.fieldValidateError)(req);
                        aggregationQuery = [
                            {
                                $match: {
                                    _id: new mongoose_1.Types.ObjectId(couponId),
                                },
                            },
                            {
                                $unwind: {
                                    path: "$users",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "users",
                                    foreignField: "_id",
                                    as: "user",
                                    pipeline: [
                                        {
                                            $project: {
                                                displayName: 1,
                                                phoneNumber: 1,
                                                country: 1,
                                                avatar: 1,
                                                email: 1,
                                                gender: 1,
                                                dateOfBirth: 1,
                                                createdAt: 1,
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $unwind: {
                                    path: "$user",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $project: {
                                    displayName: "$user.displayName",
                                    phoneNumber: "$user.phoneNumber",
                                    country: "$user.country",
                                    avatar: "$user.avatar",
                                    email: "$user.email",
                                    gender: "$user.gender",
                                    dateOfBirth: "$user.dateOfBirth",
                                    createdAt: "$user.createdAt",
                                },
                            },
                        ];
                        return [4 /*yield*/, (0, pagination_helper_1.aggregationData)({
                                model: models_1.CouponSchema,
                                query: aggregationQuery,
                                position: 4,
                                sort: { createdAt: -1 },
                                limit: limit ? Number(limit) : undefined,
                                chunk: chunk ? Number(chunk) : undefined,
                            })];
                    case 1:
                        couponUsers = _b.sent();
                        // CouponSchema.aggregate(
                        // );
                        res.json({
                            status: "SUCCESS",
                            message: "Coupon users get successfully",
                            data: couponUsers,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CouponController.prototype.getAll = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, limit, chunk, code, couponId, isActive, _c, startDate, endDate, query_1, getAllData, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _b = req.query, limit = _b.limit, chunk = _b.chunk, code = _b.code, couponId = _b.couponId, isActive = _b.isActive;
                        _c = req.body, startDate = _c.startDate, endDate = _c.endDate;
                        query_1 = {};
                        code && (query_1["code"] = code);
                        couponId && (query_1["_id"] = couponId);
                        startDate &&
                            endDate &&
                            (query_1["$and"] = [
                                {
                                    startDate: { $gte: new Date(startDate) },
                                },
                                {
                                    endDate: {
                                        $lte: new Date(endDate),
                                    },
                                },
                            ]);
                        isActive &&
                            (query_1["$and"] = [
                                {
                                    startDate: { $lte: new Date() },
                                },
                                {
                                    endDate: { $gte: new Date() },
                                },
                            ]);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: models_1.CouponSchema,
                                query: query_1,
                                chunk: chunk ? Number(chunk) : undefined,
                                limit: limit ? Number(limit) : undefined,
                                select: "",
                                sort: {
                                    createdAt: -1,
                                },
                            })];
                    case 1:
                        getAllData = _d.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "All Coupon found successfully.s",
                            data: code || couponId ? (_a = getAllData === null || getAllData === void 0 ? void 0 : getAllData.data) === null || _a === void 0 ? void 0 : _a[0] : getAllData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _d.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CouponController.prototype.deleteData = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var couponId, deleteDevice, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        couponId = req.params.couponId;
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, models_1.CouponSchema.findByIdAndDelete(couponId)];
                    case 1:
                        deleteDevice = _a.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Coupon deleted successfully",
                            data: deleteDevice,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CouponController;
}());
exports.CouponControllerValidation = {
    create: [
        (0, express_validator_1.body)("code")
            .not()
            .isEmpty()
            .withMessage("code is required.")
            .isLength({ min: 3 })
            .withMessage("code must be at least 3 character.")
            .isLength({ max: 10 })
            .withMessage("code must be at most 10 character."),
        (0, express_validator_1.body)("discountPercent")
            .not()
            .isEmpty()
            .withMessage("discountPercent is required.")
            .isNumeric()
            .withMessage("discountPercent must be number."),
        (0, express_validator_1.body)("maxCashBack")
            .not()
            .isEmpty()
            .withMessage("maxCashBack is required.")
            .isNumeric()
            .withMessage("maxCashBack must be number."),
        (0, express_validator_1.body)("startDate")
            .not()
            .isEmpty()
            .withMessage("startDate is required.")
            .toDate()
            .withMessage("startDate must be date."),
        (0, express_validator_1.body)("endDate")
            .not()
            .isEmpty()
            .withMessage("endDate is required.")
            .toDate()
            .withMessage("endDate must be date.")
            .custom(function (value, _a) {
            var req = _a.req;
            return (new Date(req.body.startDate).getTime() < new Date(value).getTime());
        })
            .withMessage("start date should have to smaller then end date."),
        (0, express_validator_1.body)("maxUses")
            .optional()
            .isNumeric()
            .withMessage("maxUses must be number."),
        (0, express_validator_1.body)("title")
            .not()
            .isEmpty()
            .withMessage("title is required.")
            .isLength({ min: 3 })
            .withMessage("title must be at least 3 characters long")
            .isLength({ max: 20 })
            .withMessage("title must be at most 20 characters long"),
        (0, express_validator_1.body)("description")
            .not()
            .isEmpty()
            .withMessage("description is required")
            .isLength({ min: 3 })
            .withMessage("description must be at least 3 characters long")
            .isLength({ max: 150 })
            .withMessage("description must be at most 150 characters long"),
    ],
    delete: [
        (0, express_validator_1.param)("couponId").not().isEmpty().withMessage("couponId is required."),
    ],
    update: [
        (0, express_validator_1.param)("couponId").not().isEmpty().withMessage("couponId is required."),
        (0, express_validator_1.body)("discountPercent")
            .optional()
            .isNumeric()
            .withMessage("discountPercent must be number."),
        (0, express_validator_1.body)("startDate")
            .optional()
            .exists()
            .toDate()
            .withMessage("startDate must be date."),
        (0, express_validator_1.body)("endDate")
            .optional()
            .exists({ checkFalsy: true })
            .toDate()
            .withMessage("endDate must be date.")
            .custom(function (value, _a) {
            var req = _a.req;
            return req.body.startDate
                ? new Date(req.body.startDate).getTime() < new Date(value).getTime()
                : true;
        })
            .withMessage("start date should have to smaller then end date."),
        (0, express_validator_1.body)("maxUses")
            .optional()
            .isNumeric()
            .withMessage("maxUses must be number."),
        (0, express_validator_1.body)("title")
            .optional()
            .exists()
            .isLength({ min: 3 })
            .withMessage("title must be at least 3 characters long")
            .isLength({ max: 20 })
            .withMessage("title must be at most 20 characters long"),
        (0, express_validator_1.body)("description")
            .optional()
            .exists()
            .isLength({ min: 3 })
            .withMessage("description must be at least 3 characters long")
            .isLength({ max: 150 })
            .withMessage("description must be at most 150 characters long"),
    ],
    getAll: [
        (0, express_validator_1.query)("code")
            .optional()
            .exists()
            .isLength({ min: 3 })
            .withMessage("code must be at least 3 character.")
            .isLength({ max: 10 })
            .withMessage("code must be at most 10 character."),
        (0, express_validator_1.body)("startDate")
            .optional()
            .exists()
            .custom(function (value, _a) {
            var _b;
            var req = _a.req;
            return Boolean(((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.endDate) && value);
        })
            .withMessage("Both startDate and endDate are required."),
    ],
    couponUser: [
        (0, express_validator_1.param)("couponId")
            .not()
            .isEmpty()
            .withMessage("couponId is required.")
            .isMongoId()
            .withMessage("couponId must be a valid mongoId."),
        (0, express_validator_1.query)("limit").optional().isNumeric().withMessage("limit must be number."),
        (0, express_validator_1.query)("chunk").optional().isNumeric().withMessage("limit must be number."),
    ],
};
exports.default = CouponController;
