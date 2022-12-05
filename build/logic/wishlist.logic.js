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
var mongoose_1 = require("mongoose");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var cartItem_model_1 = require("../models/cartItem.model");
var wishlist_model_1 = require("../models/wishlist.model");
var WishListLogic = /** @class */ (function () {
    function WishListLogic() {
    }
    /**
     * add to wishlist
     * @param Props { user: string, product: string }
     * @returns Promise<WishListType>
     */
    WishListLogic.prototype.add = function (Props) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var wishListData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, wishlist_model_1.WishListModel.findOne({
                                user: Props.userId,
                                product: Props.productId,
                            })];
                    case 1:
                        wishListData = _a.sent();
                        if (!!wishListData) return [3 /*break*/, 3];
                        return [4 /*yield*/, new wishlist_model_1.WishListModel({
                                user: Props.userId,
                                product: Props.productId,
                            }).save()];
                    case 2:
                        wishListData = _a.sent();
                        _a.label = 3;
                    case 3:
                        resolve(wishListData);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * remove from wishlist
     * @param {string} wishListId
     * @returns Promise<WishListType>
     */
    WishListLogic.prototype.remove = function (productId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var wishlist, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, wishlist_model_1.WishListModel.findOneAndDelete({
                                product: productId,
                            })];
                    case 1:
                        wishlist = _a.sent();
                        if (!wishlist)
                            throw new Error("Wishlist not found");
                        resolve(wishlist);
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
     * get one users wishlist
     * @param {string} userId
     */
    WishListLogic.prototype.getAll = function (_a) {
        var _this = this;
        var userId = _a.userId, limit = _a.limit, chunk = _a.chunk;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var wishlist, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: wishlist_model_1.WishListModel,
                                query: { user: userId },
                                limit: limit,
                                chunk: chunk,
                                populate: ["product"],
                                sort: { createdAt: -1 },
                            })];
                    case 1:
                        wishlist = _a.sent();
                        if (!wishlist)
                            throw new Error("Wishlist not found");
                        resolve(wishlist);
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
     * get one users wishlist
     * @param {string} userId
     */
    WishListLogic.prototype.getAllWishlistOptimized = function (_a) {
        var _this = this;
        var userId = _a.userId, _b = _a.limit, limit = _b === void 0 ? 100 : _b, _c = _a.chunk, chunk = _c === void 0 ? 0 : _c;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var cartItemData, allCartItemArray, wishlists, totalLength, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, cartItem_model_1.CartItemModel.find({
                                user: userId,
                            }).populate("product")];
                    case 1:
                        cartItemData = _a.sent();
                        allCartItemArray = cartItemData.map(function (wishList) { return new mongoose_1.Types.ObjectId(wishList.product); });
                        return [4 /*yield*/, wishlist_model_1.WishListModel.aggregate([
                                {
                                    $match: {
                                        user: new mongoose_1.Types.ObjectId(userId),
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "products",
                                        localField: "product",
                                        foreignField: "_id",
                                        as: "product",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$product",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $addFields: {
                                        "product.isInCart": {
                                            $cond: [
                                                {
                                                    $toBool: { $in: ["$product._id", allCartItemArray] },
                                                },
                                                true,
                                                false,
                                            ],
                                        },
                                    },
                                },
                                {
                                    $sort: { createdAt: -1 },
                                },
                                {
                                    $skip: chunk * limit,
                                },
                                {
                                    $limit: limit + 1,
                                },
                            ])];
                    case 2:
                        wishlists = _a.sent();
                        totalLength = wishlists.length;
                        if (totalLength > Number(limit))
                            wishlists.pop();
                        resolve({
                            data: wishlists,
                            isLastChunk: !(totalLength > Number(limit)),
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        reject(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return WishListLogic;
}());
exports.default = WishListLogic;
