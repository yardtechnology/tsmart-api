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
var mongoose_1 = require("mongoose");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var address_model_1 = require("../models/address.model");
var product_model_1 = require("../models/product.model");
var store_model_1 = require("../models/store.model");
var user_model_1 = require("../models/user.model");
var media_logic_1 = __importDefault(require("./media.logic"));
var product_logic_1 = __importDefault(require("./product.logic"));
var StoreLogic = /** @class */ (function (_super) {
    __extends(StoreLogic, _super);
    function StoreLogic(Id) {
        var _this = _super.call(this) || this;
        _this._storeId = Id;
        return _this;
    }
    /**
     * get all stores managers
     */
    StoreLogic.prototype.getAllStoresManagers = function (_a) {
        var Id = _a.Id, chunk = _a.chunk, limit = _a.limit;
        return __awaiter(this, void 0, void 0, function () {
            var managersData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, pagination_helper_1.default)({
                            model: user_model_1.UserModel,
                            query: {
                                store: Id || this._storeId,
                                role: "MANAGER",
                            },
                            chunk: chunk,
                            limit: limit,
                            select: "-encrypted_password -salt -refreshTokens -verificationInfo",
                        })];
                    case 1:
                        managersData = _b.sent();
                        return [2 /*return*/, managersData];
                }
            });
        });
    };
    StoreLogic.prototype.getAllStoreByStoreIn = function (_a) {
        var date = _a.date, services = _a.services;
        return __awaiter(this, void 0, void 0, function () {
            var getDayOfWeek, objectFormatSetArray, getStoreData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        getDayOfWeek = new Date(date).getDay();
                        objectFormatSetArray = services === null || services === void 0 ? void 0 : services.map(function (item) { return new mongoose_1.Types.ObjectId(item); });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, store_model_1.StoreModel.aggregate([
                                {
                                    $lookup: {
                                        from: "serviceprices",
                                        localField: "_id",
                                        foreignField: "store",
                                        as: "storeService",
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $in: ["$_id", objectFormatSetArray],
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $match: {
                                        $expr: {
                                            $cond: [
                                                {
                                                    $eq: [
                                                        { $size: "$storeService" },
                                                        objectFormatSetArray.length,
                                                    ],
                                                },
                                                true,
                                                false,
                                            ],
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "timings",
                                        localField: "_id",
                                        foreignField: "store",
                                        as: "timing",
                                        let: { currentDayOfWeek: getDayOfWeek },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ["$$currentDayOfWeek", "$dayOfWeekNumber"],
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $addFields: {
                                        bookingDay: {
                                            $dayOfMonth: new Date(date),
                                        },
                                        bookingMonth: {
                                            $month: new Date(date),
                                        },
                                        bookingYear: {
                                            $year: new Date(date),
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "holidays",
                                        localField: "_id",
                                        foreignField: "store",
                                        as: "holidays",
                                        let: {
                                            day: "$bookingDay",
                                            month: "$bookingMonth",
                                            year: "$bookingYear",
                                        },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $and: [
                                                            {
                                                                $eq: [
                                                                    {
                                                                        $dayOfMonth: "$date",
                                                                    },
                                                                    "$$day",
                                                                ],
                                                            },
                                                            {
                                                                $eq: [
                                                                    {
                                                                        $month: "$date",
                                                                    },
                                                                    "$$month",
                                                                ],
                                                            },
                                                            {
                                                                $eq: [
                                                                    {
                                                                        $year: "$date",
                                                                    },
                                                                    "$$year",
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $match: {
                                        $expr: {
                                            $gte: [{ $size: "$holidays" }, 1],
                                        },
                                    },
                                },
                            ])];
                    case 2:
                        getStoreData = _b.sent();
                        return [2 /*return*/, getStoreData];
                    case 3:
                        error_1 = _b.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //delete store
    StoreLogic.prototype.deleteStore = function (storeId) {
        return __awaiter(this, void 0, void 0, function () {
            var storeData, allStoresProducts, _i, allStoresProducts_1, product, allStoresManagers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, store_model_1.StoreModel.findById(storeId)];
                    case 1:
                        storeData = _a.sent();
                        if (!storeData)
                            throw new Error("Store not found");
                        return [4 /*yield*/, product_model_1.ProductModel.find({
                                store: storeId,
                                variantOf: { $exists: false },
                            })];
                    case 2:
                        allStoresProducts = _a.sent();
                        _i = 0, allStoresProducts_1 = allStoresProducts;
                        _a.label = 3;
                    case 3:
                        if (!(_i < allStoresProducts_1.length)) return [3 /*break*/, 6];
                        product = allStoresProducts_1[_i];
                        return [4 /*yield*/, new product_logic_1.default().deleteProduct(product === null || product === void 0 ? void 0 : product._id)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, user_model_1.UserModel.find({
                            store: storeId,
                        })];
                    case 7:
                        allStoresManagers = _a.sent();
                        //remove store id
                        user_model_1.UserModel === null || user_model_1.UserModel === void 0 ? void 0 : user_model_1.UserModel.updateMany({ _id: allStoresManagers === null || allStoresManagers === void 0 ? void 0 : allStoresManagers.map(function (item) { return item === null || item === void 0 ? void 0 : item._id; }) }, {
                            store: null,
                        });
                        // //delete all store manager assigned to store
                        // for (const manager of allStoresManagers) {
                        //   await new UserLogic().deleteUser(manager?._id);
                        // }
                        //delete store address
                        return [4 /*yield*/, address_model_1.AddressModel.findByIdAndDelete(storeData === null || storeData === void 0 ? void 0 : storeData.address)];
                    case 8:
                        // //delete all store manager assigned to store
                        // for (const manager of allStoresManagers) {
                        //   await new UserLogic().deleteUser(manager?._id);
                        // }
                        //delete store address
                        _a.sent();
                        // delete image
                        (storeData === null || storeData === void 0 ? void 0 : storeData.imagePath) && _super.prototype.deleteMedia.call(this, storeData === null || storeData === void 0 ? void 0 : storeData.imagePath);
                        //delete store
                        return [4 /*yield*/, store_model_1.StoreModel.findByIdAndDelete(storeId)];
                    case 9:
                        //delete store
                        _a.sent();
                        return [2 /*return*/, storeData];
                }
            });
        });
    };
    return StoreLogic;
}(media_logic_1.default));
exports.default = StoreLogic;
