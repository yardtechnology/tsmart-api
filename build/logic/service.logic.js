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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var models_1 = require("../models");
var ServiceLogic = /** @class */ (function () {
    function ServiceLogic() {
    }
    /**
     * Services logic
     *
     * @param  Props{ servicePriceId: string[]}
     * @return Promise<{mrpPrice:number,salePrice:number}>
     * 'mrpPrice' : It is sum of
     * 'salePrice' : It is the sum of the sale price
     */
    ServiceLogic.prototype.getPriceBYServiceId = function (_a) {
        var _this = this;
        var servicePriceId = _a.servicePriceId;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var getServices, servicePrice, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.ServicePriceModel.aggregate([
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                {
                                                    $in: [
                                                        "$_id",
                                                        servicePriceId === null || servicePriceId === void 0 ? void 0 : servicePriceId.map(function (item) { return new mongoose_1.Types.ObjectId(item); }),
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    $addFields: {
                                        servicePrices: servicePriceId,
                                    },
                                },
                                {
                                    $group: {
                                        _id: null,
                                        allData: { $push: "$$ROOT" },
                                        servicePrices: { $first: "$servicePrices" },
                                        id: { $first: "$_id" },
                                    },
                                },
                                {
                                    $addFields: {
                                        servicePrices: {
                                            $map: {
                                                input: "$servicePrices",
                                                as: "service",
                                                in: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$allData",
                                                                as: "serviceId",
                                                                cond: {
                                                                    $eq: [
                                                                        "$$serviceId._id",
                                                                        { $toObjectId: "$$service" },
                                                                    ],
                                                                },
                                                            },
                                                        },
                                                        0,
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$servicePrices",
                                        preserveNullAndEmptyArrays: false,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "services",
                                        localField: "servicePrices.service",
                                        foreignField: "_id",
                                        as: "servicePrices.service",
                                        pipeline: [
                                            {
                                                $project: {
                                                    title: 1,
                                                    description: 1,
                                                    image: 1,
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$servicePrices.service",
                                        preserveNullAndEmptyArrays: false,
                                    },
                                },
                                {
                                    $project: {
                                        _id: "$servicePrices._id",
                                        service: "$servicePrices.service",
                                        mrp: "$servicePrices.mrp",
                                        salePrice: "$servicePrices.salePrice",
                                        isInStock: "$servicePrices.isInStock",
                                        store: "$servicePrices.store",
                                        type: "$servicePrices.type",
                                        isMostPopular: "$servicePrices.isMostPopular",
                                    },
                                },
                            ])];
                    case 1:
                        getServices = _a.sent();
                        if (!getServices.length)
                            throw new Error("No service found for this model.");
                        servicePrice = getServices === null || getServices === void 0 ? void 0 : getServices.reduce(function (acc, element) {
                            acc.mrpPrice = acc.mrpPrice + (element === null || element === void 0 ? void 0 : element.mrp) || 0;
                            acc.salePrice = acc.salePrice + (element === null || element === void 0 ? void 0 : element.salePrice) || 0;
                            return acc;
                        }, {
                            mrpPrice: 0,
                            salePrice: 0,
                        });
                        return [2 /*return*/, resolve(__assign(__assign({}, servicePrice), { allService: getServices }))];
                    case 2:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return ServiceLogic;
}());
exports.default = ServiceLogic;
