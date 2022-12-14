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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePriceControllerValidation = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var mongoose_1 = require("mongoose");
var helper_1 = require("../helper");
var coupon_logic_1 = __importDefault(require("../logic/coupon.logic"));
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var service_logic_1 = __importDefault(require("../logic/service.logic"));
var models_1 = require("../models");
var servicePrice_model_1 = require("../models/servicePrice.model");
var ServicePrice = /** @class */ (function (_super) {
    __extends(ServicePrice, _super);
    function ServicePrice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // create servicePrice
    ServicePrice.prototype.createServicePrice = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, title, description, mrp, salePrice, storeId, serviceId, modelId_1, type, isMostPopular, allServices, imageFile, filePath, imageData, _d, servicePriceCountCheck, servicePriceData_1, allServicesCheck, createServicePropertyValue, _e, error_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 9, , 10]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        _c = req.body, title = _c.title, description = _c.description, mrp = _c.mrp, salePrice = _c.salePrice, storeId = _c.storeId, serviceId = _c.serviceId, modelId_1 = _c.modelId, type = _c.type, isMostPopular = _c.isMostPopular, allServices = _c.allServices;
                        imageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "".concat((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id);
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imageFile, filePath)];
                    case 1:
                        _d = _f.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _d = undefined;
                        _f.label = 3;
                    case 3:
                        imageData = _d;
                        return [4 /*yield*/, servicePrice_model_1.ServicePriceModel.find({
                                model: modelId_1,
                                store: storeId,
                                service: serviceId,
                            })];
                    case 4:
                        servicePriceCountCheck = _f.sent();
                        if ((servicePriceCountCheck === null || servicePriceCountCheck === void 0 ? void 0 : servicePriceCountCheck.length) > 3)
                            throw new http_errors_1.BadRequest("You can't add more than 3 services.");
                        return [4 /*yield*/, new servicePrice_model_1.ServicePriceModel({
                                title: title,
                                description: description,
                                image: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                                mrp: mrp,
                                salePrice: salePrice,
                                model: modelId_1,
                                store: storeId,
                                service: serviceId,
                                type: type,
                                isMostPopular: isMostPopular,
                            }).save()];
                    case 5:
                        servicePriceData_1 = _f.sent();
                        allServicesCheck = allServices
                            ? allServices === null || allServices === void 0 ? void 0 : allServices.map(function (item) { return (__assign(__assign({}, item), { model: modelId_1, servicePrice: servicePriceData_1 === null || servicePriceData_1 === void 0 ? void 0 : servicePriceData_1._id })); })
                            : undefined;
                        if (!allServicesCheck) return [3 /*break*/, 7];
                        return [4 /*yield*/, models_1.ServicePropertyValueSchema.insertMany(JSON.parse(JSON.stringify(allServicesCheck)))];
                    case 6:
                        _e = _f.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _e = undefined;
                        _f.label = 8;
                    case 8:
                        createServicePropertyValue = _e;
                        console.log(createServicePropertyValue);
                        if (!createServicePropertyValue && allServicesCheck)
                            throw new http_errors_1.InternalServerError("Something went wrong, Service property value is not created.");
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "ServicePrice added successfully",
                            data: servicePriceData_1,
                        });
                        return [3 /*break*/, 10];
                    case 9:
                        error_1 = _f.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // update servicePrice
    ServicePrice.prototype.updateServicePrice = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var imageFile, filePath, imageData, _k, servicePriceData, error_2;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _l.trys.push([0, 5, , 6]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        imageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "".concat((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id);
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imageFile, filePath)];
                    case 1:
                        _k = _l.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _k = undefined;
                        _l.label = 3;
                    case 3:
                        imageData = _k;
                        return [4 /*yield*/, servicePrice_model_1.ServicePriceModel.findByIdAndUpdate(req.params.servicePriceId, {
                                title: (_c = req.body) === null || _c === void 0 ? void 0 : _c.title,
                                description: (_d = req.body) === null || _d === void 0 ? void 0 : _d.description,
                                image: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                                mrp: (_e = req.body) === null || _e === void 0 ? void 0 : _e.mrp,
                                salePrice: (_f = req.body) === null || _f === void 0 ? void 0 : _f.salePrice,
                                model: (_g = req.body) === null || _g === void 0 ? void 0 : _g.modelId,
                                store: (_h = req.body) === null || _h === void 0 ? void 0 : _h.storeId,
                                service: (_j = req.body) === null || _j === void 0 ? void 0 : _j.serviceId,
                            })];
                    case 4:
                        servicePriceData = _l.sent();
                        if (!servicePriceData)
                            throw new Error("ServicePrice not found");
                        // delete previous servicePrice image
                        (imageData === null || imageData === void 0 ? void 0 : imageData.path) &&
                            (servicePriceData === null || servicePriceData === void 0 ? void 0 : servicePriceData.imagePATH) &&
                            _super.prototype.deleteMedia.call(this, servicePriceData === null || servicePriceData === void 0 ? void 0 : servicePriceData.imagePATH);
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "ServicePrice updated successfully",
                            data: servicePriceData,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _l.sent();
                        // send error to client
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // get servicePrice
    ServicePrice.prototype.getServicePrice = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, servicePriceId, store, serviceId, modelId, excludeServicePriceIds, excludeServicePriceIdsArrayCheck, query_1, getAllServicePrice, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.query, servicePriceId = _b.servicePriceId, store = _b.store, serviceId = _b.serviceId, modelId = _b.modelId, excludeServicePriceIds = _b.excludeServicePriceIds;
                        excludeServicePriceIdsArrayCheck = excludeServicePriceIds
                            ? Array.isArray(excludeServicePriceIds)
                                ? excludeServicePriceIds
                                : [excludeServicePriceIds]
                            : undefined;
                        query_1 = {};
                        servicePriceId && (query_1["_id"] = servicePriceId);
                        store && (query_1["store"] = store);
                        serviceId && (query_1["service"] = serviceId);
                        modelId && (query_1["model"] = modelId);
                        excludeServicePriceIdsArrayCheck &&
                            (query_1["_id"] = { $nin: excludeServicePriceIdsArrayCheck });
                        return [4 /*yield*/, (0, helper_1.paginationHelper)({
                                model: servicePrice_model_1.ServicePriceModel,
                                query: query_1,
                                limit: req.query.limit,
                                chunk: req.query.chunk,
                                sort: { createdAt: -1 },
                                populate: [
                                    {
                                        path: "service",
                                        select: "-imagePATH",
                                    },
                                ],
                            })];
                    case 1:
                        getAllServicePrice = _c.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "ServicePrice found successfully",
                            data: servicePriceId
                                ? (_a = getAllServicePrice === null || getAllServicePrice === void 0 ? void 0 : getAllServicePrice.data) === null || _a === void 0 ? void 0 : _a[0]
                                : getAllServicePrice,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _c.sent();
                        // send error to client
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //   get all servicePrice by role
    ServicePrice.prototype.getAllServicePrice = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var model, _b, serviceId, servicePriceId, storeId, serviceArg, _c, servicePriceIds, couponId, checkArrayServicePriceId, matchArray, aggregationQuery, servicePriceData, findSelectedServices, _d, servicePricesReducer, couponCalculation, _e, error_4;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 8, , 9]);
                        // const role = req?.currentUser?.role;
                        (0, helper_1.fieldValidateError)(req);
                        model = req.params.model;
                        _b = req.query, serviceId = _b.serviceId, servicePriceId = _b.servicePriceId, storeId = _b.storeId;
                        serviceArg = [];
                        serviceId &&
                            serviceArg.push({
                                $match: {
                                    service: new mongoose_1.Types.ObjectId(String(serviceId)),
                                },
                            });
                        _c = req.query, servicePriceIds = _c.servicePriceIds, couponId = _c.couponId;
                        checkArrayServicePriceId = servicePriceIds
                            ? Array.isArray(servicePriceIds)
                                ? servicePriceIds.map(function (item) { return new mongoose_1.Types.ObjectId(String(item)); })
                                : [new mongoose_1.Types.ObjectId(String(servicePriceIds))]
                            : [];
                        matchArray = [
                            {
                                $eq: ["$model", new mongoose_1.Types.ObjectId(model)],
                            },
                        ];
                        servicePriceId &&
                            matchArray.push({
                                $eq: ["$_id", new mongoose_1.Types.ObjectId(String(servicePriceId))],
                            });
                        storeId &&
                            matchArray.push({
                                $eq: ["$store", new mongoose_1.Types.ObjectId(String(storeId))],
                            });
                        aggregationQuery = __spreadArray(__spreadArray([
                            {
                                $match: {
                                    $expr: {
                                        $and: matchArray,
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: "servicepropertyvalues",
                                    foreignField: "servicePrice",
                                    localField: "_id",
                                    as: "servicePropertyValue",
                                    pipeline: [
                                        {
                                            $lookup: {
                                                from: "serviceproperties",
                                                foreignField: "_id",
                                                localField: "serviceProperty",
                                                as: "serviceProperty",
                                            },
                                        },
                                        {
                                            $unwind: {
                                                path: "$serviceProperty",
                                                preserveNullAndEmptyArrays: true,
                                            },
                                        },
                                    ],
                                },
                            }
                        ], serviceArg, true), [
                            // extra end
                            {
                                $lookup: {
                                    from: "services",
                                    localField: "service",
                                    foreignField: "_id",
                                    as: "service",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$service",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $group: {
                                    _id: {
                                        service: "$service",
                                        model: "$model",
                                        store: "$store",
                                    },
                                    cardSize: {
                                        $first: {
                                            $cond: [
                                                { $gte: [{ $size: "$servicePropertyValue" }, 1] },
                                                "LONG_CARD",
                                                "NORMAL_CARD",
                                            ],
                                        },
                                    },
                                    longCard: {
                                        $push: {
                                            _id: "$_id",
                                            image: "$image",
                                            title: "$title",
                                            description: "$description",
                                            store: "$store",
                                            isInStock: "$isInStock",
                                            salePrice: "$salePrice",
                                            mrp: "$mrp",
                                            type: "$type",
                                            isMostPopular: "$isMostPopular",
                                            servicePropertyValue: "$servicePropertyValue",
                                        },
                                    },
                                    id: {
                                        $first: "$_id",
                                    },
                                    service: {
                                        $first: "$service",
                                    },
                                    model: {
                                        $first: "$model",
                                    },
                                    image: {
                                        $first: "$image",
                                    },
                                    // title: {
                                    //   $first: "$title",
                                    // },
                                    // description: {
                                    //   $first: "$description",
                                    // },
                                    store: {
                                        $first: "$store",
                                    },
                                    isInStock: {
                                        $first: "$isInStock",
                                    },
                                    salePrice: {
                                        $first: "$salePrice",
                                    },
                                    mrp: {
                                        $first: "$mrp",
                                    },
                                    type: {
                                        $first: "$type",
                                    },
                                    isMostPopular: {
                                        $first: "$isMostPopular",
                                    },
                                    createdAt: {
                                        $first: "$createdAt",
                                    },
                                },
                            },
                            {
                                $group: {
                                    _id: {
                                        service: "$_id.service",
                                        model: "$_id.model",
                                        cardSize: "$cardSize",
                                    },
                                    cardSize: { $first: "$cardSize" },
                                    longCard: { $first: "$longCard" },
                                    id: {
                                        $first: "$id",
                                    },
                                    service: {
                                        $first: "$service",
                                    },
                                    model: {
                                        $first: "$model",
                                    },
                                    image: {
                                        $first: "$image",
                                    },
                                    // title: {
                                    //   $first: "$title",
                                    // },
                                    // description: {
                                    //   $first: "$description",
                                    // },
                                    store: {
                                        $first: "$store",
                                    },
                                    isInStock: {
                                        $first: "$isInStock",
                                    },
                                    salePrice: {
                                        $first: "$salePrice",
                                    },
                                    mrp: {
                                        $first: "$mrp",
                                    },
                                    type: {
                                        $first: "$type",
                                    },
                                    isMostPopular: {
                                        $first: "$isMostPopular",
                                    },
                                    createdAt: {
                                        $first: "$createdAt",
                                    },
                                },
                            },
                            //
                            {
                                $project: {
                                    longCard: {
                                        $cond: [
                                            { $eq: ["$cardSize", "LONG_CARD"] },
                                            "$longCard",
                                            undefined,
                                        ],
                                    },
                                    cardSize: 1,
                                    _id: "$id",
                                    service: 1,
                                    model: 1,
                                    title: 1,
                                    description: 1,
                                    store: 1,
                                    isInStock: 1,
                                    salePrice: 1,
                                    mrp: 1,
                                    type: 1,
                                    isMostPopular: 1,
                                },
                            },
                        ], false);
                        // if (role === "ADMIN") {
                        //   aggregationQuery.splice(4);
                        // } else {
                        aggregationQuery.push({
                            $sort: {
                                cardSize: 1,
                            },
                        });
                        aggregationQuery.push({
                            $addFields: {
                                longCard: {
                                    $slice: ["$longCard", 3],
                                },
                            },
                        });
                        return [4 /*yield*/, (0, helper_1.aggregationData)({
                                model: servicePrice_model_1.ServicePriceModel,
                                query: aggregationQuery,
                                position: 5,
                                sort: { createdAt: -1 },
                                limit: req.query.limit ? Number(req.query.limit) : undefined,
                                chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                            })];
                    case 1:
                        servicePriceData = _f.sent();
                        if (!(checkArrayServicePriceId === null || checkArrayServicePriceId === void 0 ? void 0 : checkArrayServicePriceId.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, servicePrice_model_1.ServicePriceModel.find({
                                _id: { $in: checkArrayServicePriceId },
                            })];
                    case 2:
                        _d = _f.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _d = undefined;
                        _f.label = 4;
                    case 4:
                        findSelectedServices = _d;
                        servicePricesReducer = findSelectedServices
                            ? findSelectedServices === null || findSelectedServices === void 0 ? void 0 : findSelectedServices.reduce(function (preserveValue, currentValue) {
                                preserveValue.mrp = preserveValue.mrp + currentValue.mrp;
                                preserveValue.salePrice =
                                    preserveValue.salePrice + currentValue.salePrice;
                                return preserveValue;
                            }, {
                                mrp: 0,
                                salePrice: 0,
                            })
                            : undefined;
                        if (!((servicePricesReducer === null || servicePricesReducer === void 0 ? void 0 : servicePricesReducer.salePrice) && couponId)) return [3 /*break*/, 6];
                        return [4 /*yield*/, new coupon_logic_1.default().getCouponDiscount({
                                price: servicePricesReducer === null || servicePricesReducer === void 0 ? void 0 : servicePricesReducer.salePrice,
                                couponId: String(couponId),
                            })];
                    case 5:
                        _e = _f.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _e = undefined;
                        _f.label = 7;
                    case 7:
                        couponCalculation = _e;
                        res.json({
                            status: "SUCCESS",
                            message: "Service price get successfully",
                            servicePricesReducer: servicePricesReducer,
                            couponCalculation: couponCalculation,
                            findSelectedServices: findSelectedServices,
                            data: serviceId ? (_a = servicePriceData === null || servicePriceData === void 0 ? void 0 : servicePriceData.data) === null || _a === void 0 ? void 0 : _a[0] : servicePriceData,
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        error_4 = _f.sent();
                        next(error_4);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    // service summery
    ServicePrice.prototype.serviceSummery = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, servicePriceIds, couponId, arrayServicePriceId, dataServiceSummery, couponCalculation, _b, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _a = req.body, servicePriceIds = _a.servicePriceIds, couponId = _a.couponId;
                        (0, helper_1.fieldValidateError)(req);
                        arrayServicePriceId = Array.isArray(servicePriceIds)
                            ? servicePriceIds
                            : [servicePriceIds];
                        return [4 /*yield*/, new service_logic_1.default().getPriceBYServiceId({
                                servicePriceId: arrayServicePriceId,
                            })];
                    case 1:
                        dataServiceSummery = _c.sent();
                        if (!((dataServiceSummery === null || dataServiceSummery === void 0 ? void 0 : dataServiceSummery.salePrice) && couponId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new coupon_logic_1.default().getCouponDiscount({
                                couponId: String(couponId),
                                price: dataServiceSummery === null || dataServiceSummery === void 0 ? void 0 : dataServiceSummery.salePrice,
                            })];
                    case 2:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b = undefined;
                        _c.label = 4;
                    case 4:
                        couponCalculation = _b;
                        dataServiceSummery.salePrice =
                            dataServiceSummery.salePrice - (couponCalculation || 0);
                        res.json({
                            status: "SUCCESS",
                            message: "Service price get successfully",
                            data: __assign(__assign({ couponCalculation: couponCalculation }, dataServiceSummery), { couponId: couponId }),
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_5 = _c.sent();
                        next(error_5);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //   get all servicePrice by make
    // public async getServicePricesByModel(
    //   req: AuthRequest,
    //   res: Response,
    //   next: NextFunction
    // ): Promise<any> {
    //   try {
    //     // save user data to database
    //     const query = {
    //       model: req?.params?.modelId || undefined,
    //     };
    //     !req.params.modelId && delete query.model;
    //     const servicePriceData = await paginationHelper({
    //       model: ServicePriceModel,
    //       query: query,
    //       select: "-imagePATH",
    //       sort: { createdAt: -1 },
    //       populate: ["store", "model", "service"],
    //       limit: req.query.limit ? Number(req.query.limit) : undefined,
    //       chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
    //     });
    //     // send response to client
    //     res.status(200).json({
    //       status: "SUCCESS",
    //       message: "All servicePrice found successfully",
    //       data: servicePriceData,
    //     });
    //   } catch (error) {
    //     // send error to client
    //     next(error);
    //   }
    // }
    // get servicePrice
    ServicePrice.prototype.deleteServicePrice = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var servicePriceData, deleteServicePropertyValue, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, servicePrice_model_1.ServicePriceModel.findByIdAndDelete(req.params.servicePriceId)];
                    case 1:
                        servicePriceData = _a.sent();
                        if (!servicePriceData)
                            throw new Error("ServicePrice not found");
                        // delete previous servicePrice image
                        (servicePriceData === null || servicePriceData === void 0 ? void 0 : servicePriceData.imagePATH) &&
                            _super.prototype.deleteMedia.call(this, servicePriceData === null || servicePriceData === void 0 ? void 0 : servicePriceData.imagePATH);
                        return [4 /*yield*/, models_1.ServicePropertyValueSchema.deleteMany({
                                servicePrice: req.params.servicePriceId,
                            })];
                    case 2:
                        deleteServicePropertyValue = _a.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "ServicePrice deleted successfully",
                            data: servicePriceData,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        // send error to client
                        next(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ServicePrice;
}(media_logic_1.default));
exports.ServicePriceControllerValidation = {
    createServicePrice: [
        (0, express_validator_1.body)("mrp")
            .not()
            .isEmpty()
            .withMessage("MRP is required")
            .isNumeric()
            .withMessage("mrp most be a numeric"),
        (0, express_validator_1.body)("salePrice")
            .not()
            .isEmpty()
            .withMessage("salePrice is required")
            .isNumeric()
            .withMessage("mrp most be a numeric"),
        (0, express_validator_1.body)("modelId")
            .not()
            .isEmpty()
            .withMessage("modelId is required")
            .isMongoId()
            .withMessage("please enter a valid store id"),
        (0, express_validator_1.body)("storeId")
            .not()
            .isEmpty()
            .withMessage("storeId is required")
            .isMongoId()
            .withMessage("please enter a valid store id"),
        (0, express_validator_1.body)("isInStock")
            .not()
            .isEmpty()
            .withMessage("isInStock is required")
            .isBoolean()
            .withMessage("isInStock most be a boolean"),
        (0, express_validator_1.body)("serviceId")
            .not()
            .isEmpty()
            .withMessage("serviceId is required")
            .isMongoId()
            .withMessage("please enter a valid store id"),
        (0, express_validator_1.body)("type")
            .not()
            .isEmpty()
            .withMessage("type is required, ex-Stander, Premium"),
        (0, express_validator_1.body)("isMostPopular")
            .optional()
            .exists()
            .isBoolean()
            .withMessage("isMostPopular must be boolean."),
        (0, express_validator_1.body)("allServices.*.value")
            .optional()
            .isLength({ min: 1 })
            .withMessage("value must be at least 1 character.")
            .isLength({ max: 100 })
            .withMessage("value must be at most 100 characters long"),
        (0, express_validator_1.body)("allServices.*.serviceProperty")
            .optional()
            .isMongoId()
            .withMessage("serviceProperty must be mongoesId."),
    ],
    getAllServicePrice: [
        (0, express_validator_1.param)("model")
            .not()
            .isEmpty()
            .withMessage("model id is required.")
            .isMongoId()
            .withMessage("model must be mongoose id."),
        (0, express_validator_1.query)("storeId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("storeId must be mongoose id."),
        (0, express_validator_1.query)("serviceId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("serviceId is must be mongoose id."),
    ],
    serviceSummery: [
        (0, express_validator_1.body)("servicePriceIds.*")
            .not()
            .isEmpty()
            .withMessage("servicePriceIds is required")
            .isMongoId()
            .withMessage("servicePriceIds must be mongoes id"),
        (0, express_validator_1.body)("couponId")
            .optional()
            .exists()
            .isMongoId()
            .withMessage("couponId must be mongoose id."),
    ],
};
exports.default = ServicePrice;
