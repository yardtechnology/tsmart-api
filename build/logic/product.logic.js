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
var mongoose_1 = require("mongoose");
var pagination_helper_1 = __importStar(require("../helper/pagination.helper"));
var cartItem_model_1 = require("../models/cartItem.model");
var product_model_1 = require("../models/product.model");
var productStock_model_1 = require("../models/productStock.model");
var wishlist_model_1 = require("../models/wishlist.model");
var media_logic_1 = __importDefault(require("./media.logic"));
var ProductLogic = /** @class */ (function (_super) {
    __extends(ProductLogic, _super);
    function ProductLogic(productId) {
        var _this = _super.call(this) || this;
        _this._productId = productId;
        return _this;
    }
    /** create a product */
    ProductLogic.prototype.createAProduct = function (req) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var displayImageFile, filePath, displayImageData, _a, imagesFile, imageFilePath, imagesData, _b, _c, productData, error_1;
            var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
            return __generator(this, function (_y) {
                switch (_y.label) {
                    case 0:
                        _y.trys.push([0, 11, , 12]);
                        displayImageFile = (_d = req.files) === null || _d === void 0 ? void 0 : _d.displayImage;
                        filePath = "product";
                        if (!(displayImageFile && !Array.isArray(displayImageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, displayImageFile, filePath)];
                    case 1:
                        _a = _y.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = undefined;
                        _y.label = 3;
                    case 3:
                        displayImageData = _a;
                        imagesFile = (_e = req.files) === null || _e === void 0 ? void 0 : _e.images;
                        imageFilePath = "product";
                        _b = imagesFile;
                        if (!_b) return [3 /*break*/, 8];
                        if (!Array.isArray(imagesFile)) return [3 /*break*/, 5];
                        return [4 /*yield*/, _super.prototype.uploadMultipleMedia.call(this, imagesFile, imageFilePath)];
                    case 4:
                        _c = _y.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imagesFile, imageFilePath)];
                    case 6:
                        _c = _y.sent();
                        _y.label = 7;
                    case 7:
                        _b = (_c);
                        _y.label = 8;
                    case 8:
                        imagesData = _b;
                        return [4 /*yield*/, new product_model_1.ProductModel({
                                title: (_f = req.body) === null || _f === void 0 ? void 0 : _f.title,
                                shortDescription: (_g = req.body) === null || _g === void 0 ? void 0 : _g.shortDescription,
                                description: (_h = req.body) === null || _h === void 0 ? void 0 : _h.description,
                                mrp: (_j = req.body) === null || _j === void 0 ? void 0 : _j.mrp,
                                salePrice: (_k = req.body) === null || _k === void 0 ? void 0 : _k.salePrice,
                                displayImage: displayImageData,
                                category: (_l = req.body) === null || _l === void 0 ? void 0 : _l.category,
                                store: (_m = req.body) === null || _m === void 0 ? void 0 : _m.storeId,
                                isFeatured: (_o = req.body) === null || _o === void 0 ? void 0 : _o.isFeatured,
                                isActive: (_p = req.body) === null || _p === void 0 ? void 0 : _p.isActive,
                                stock: (_q = req.body) === null || _q === void 0 ? void 0 : _q.stock,
                                memory: (_r = req.body) === null || _r === void 0 ? void 0 : _r.memory,
                                color: (_s = req.body) === null || _s === void 0 ? void 0 : _s.color,
                                condition: (_t = req.body) === null || _t === void 0 ? void 0 : _t.condition,
                                type: (_u = req.body) === null || _u === void 0 ? void 0 : _u.type,
                                images: imagesData,
                                device: (_v = req.body) === null || _v === void 0 ? void 0 : _v.device,
                                make: (_w = req.body) === null || _w === void 0 ? void 0 : _w.make,
                                model: (_x = req.body) === null || _x === void 0 ? void 0 : _x.model,
                            }).save()];
                    case 9:
                        productData = _y.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.findByIdAndUpdate(productData === null || productData === void 0 ? void 0 : productData._id, {
                                variantOf: productData === null || productData === void 0 ? void 0 : productData._id,
                            })];
                    case 10:
                        _y.sent();
                        // send response to client
                        resolve(productData);
                        return [3 /*break*/, 12];
                    case 11:
                        error_1 = _y.sent();
                        // send error to client
                        reject(error_1);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        }); });
    };
    /** get product variants */
    ProductLogic.prototype.getVariants = function (Id) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var productData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, product_model_1.ProductModel.find({
                                variantOf: Id || this._productId,
                            }).populate("category color")];
                    case 1:
                        productData = _a.sent();
                        // send response to client
                        resolve(productData);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        // send error to client
                        reject(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /** product info */
    ProductLogic.prototype.getProductInfo = function (Id) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var productId, productData, mainProductData, variants, error_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        productId = Id || this._productId;
                        return [4 /*yield*/, product_model_1.ProductModel.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.Types.ObjectId(productId),
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "stores",
                                        localField: "store",
                                        foreignField: "_id",
                                        as: "store",
                                    },
                                },
                                { $unwind: { path: "$store", preserveNullAndEmptyArrays: true } },
                                {
                                    $lookup: {
                                        from: "categories",
                                        localField: "category",
                                        foreignField: "_id",
                                        as: "category",
                                    },
                                },
                                { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
                                {
                                    $lookup: {
                                        from: "addresses",
                                        localField: "store.address",
                                        foreignField: "_id",
                                        as: "store.address",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "products",
                                        localField: "variantOf",
                                        foreignField: "variantOf",
                                        as: "variants",
                                        pipeline: [
                                            {
                                                $match: {
                                                    variantOf: { $exists: true },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $addFields: {
                                        variants: {
                                            $cond: [{ $toBool: { $size: "$variants" } }, "$variants", []],
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "colors",
                                        localField: "color",
                                        foreignField: "_id",
                                        as: "color",
                                    },
                                },
                                { $unwind: { path: "$color", preserveNullAndEmptyArrays: true } },
                                {
                                    $lookup: {
                                        from: "memories",
                                        localField: "memory",
                                        foreignField: "_id",
                                        as: "memory",
                                    },
                                },
                                { $unwind: { path: "$memory", preserveNullAndEmptyArrays: true } },
                            ])];
                    case 1:
                        productData = _b.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.findById(productId)];
                    case 2:
                        mainProductData = _b.sent();
                        if (!mainProductData)
                            throw new Error("Product not found");
                        variants = ((_a = productData[0].variants) === null || _a === void 0 ? void 0 : _a.length)
                            ? productData[0].variants
                            : [mainProductData];
                        // send response to client
                        resolve(__assign(__assign({}, productData[0]), { variants: variants }));
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        // send error to client
                        reject(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    /** product info optimized */
    ProductLogic.prototype.getProductInfoOptimized = function (_a) {
        var _this = this;
        var Id = _a.Id, userId = _a.userId;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var wishListData, allWishListArray, cartItemData, allCartItemArray, productId, productData, mainProductData, variants, error_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, wishlist_model_1.WishListModel.find({
                                user: userId,
                            }).populate("product")];
                    case 1:
                        wishListData = _b.sent();
                        allWishListArray = wishListData.map(function (wishList) { return new mongoose_1.Types.ObjectId(wishList.product); });
                        return [4 /*yield*/, cartItem_model_1.CartItemModel.find({
                                user: userId,
                            }).populate("product")];
                    case 2:
                        cartItemData = _b.sent();
                        allCartItemArray = cartItemData.map(function (wishList) { return new mongoose_1.Types.ObjectId(wishList.product); });
                        productId = Id || this._productId;
                        return [4 /*yield*/, product_model_1.ProductModel.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.Types.ObjectId(productId),
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "stores",
                                        localField: "store",
                                        foreignField: "_id",
                                        as: "store",
                                    },
                                },
                                { $unwind: { path: "$store", preserveNullAndEmptyArrays: true } },
                                {
                                    $lookup: {
                                        from: "categories",
                                        localField: "category",
                                        foreignField: "_id",
                                        as: "category",
                                    },
                                },
                                { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
                                {
                                    $lookup: {
                                        from: "addresses",
                                        localField: "store.address",
                                        foreignField: "_id",
                                        as: "store.address",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "products",
                                        localField: "variantOf",
                                        foreignField: "variantOf",
                                        as: "variants",
                                        pipeline: [
                                            {
                                                $match: {
                                                    variantOf: { $exists: true },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "cartitems",
                                        localField: "_id",
                                        foreignField: "product",
                                        as: "cartQuantity",
                                        pipeline: [
                                            {
                                                $match: {
                                                    user: new mongoose_1.Types.ObjectId(userId),
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$cartQuantity",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $addFields: {
                                        cartQuantity: "$cartQuantity.quantity",
                                        isInWishList: {
                                            $cond: [
                                                {
                                                    $toBool: { $in: ["$_id", allWishListArray] },
                                                },
                                                true,
                                                false,
                                            ],
                                        },
                                        isInCart: {
                                            $cond: [
                                                {
                                                    $toBool: { $in: ["$_id", allCartItemArray] },
                                                },
                                                true,
                                                false,
                                            ],
                                        },
                                        variants: {
                                            $cond: [{ $toBool: { $size: "$variants" } }, "$variants", []],
                                        },
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "colors",
                                        localField: "color",
                                        foreignField: "_id",
                                        as: "color",
                                    },
                                },
                                { $unwind: { path: "$color", preserveNullAndEmptyArrays: true } },
                                {
                                    $lookup: {
                                        from: "memories",
                                        localField: "memory",
                                        foreignField: "_id",
                                        as: "memory",
                                    },
                                },
                                { $unwind: { path: "$memory", preserveNullAndEmptyArrays: true } },
                            ])];
                    case 3:
                        productData = _b.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.findById(productId)];
                    case 4:
                        mainProductData = _b.sent();
                        if (!mainProductData)
                            throw new Error("Product not found");
                        variants = ((_a = productData[0].variants) === null || _a === void 0 ? void 0 : _a.length)
                            ? productData[0].variants
                            : [mainProductData];
                        resolve(__assign(__assign({}, productData[0]), { variants: variants }));
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _b.sent();
                        // send error to client
                        reject(error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * get all product of category
     */
    ProductLogic.prototype.getAllProductOfCategory = function (_a) {
        var categoryId = _a.categoryId, limit = _a.limit, chunk = _a.chunk, type = _a.type;
        return __awaiter(this, void 0, void 0, function () {
            var query, productsData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = {
                            category: categoryId,
                            isActive: true,
                            type: type,
                        };
                        !type && delete query.type;
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: product_model_1.ProductModel,
                                query: query,
                                limit: limit,
                                chunk: chunk,
                            })];
                    case 1:
                        productsData = _b.sent();
                        return [2 /*return*/, productsData];
                }
            });
        });
    };
    /** delete product */
    ProductLogic.prototype.deleteProduct = function (Id) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var productId, ProductInfo, getAllVariants, _i, getAllVariants_1, variant, error_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 14, , 15]);
                        productId = Id || this._productId;
                        return [4 /*yield*/, product_model_1.ProductModel.findById(productId)];
                    case 1:
                        ProductInfo = _b.sent();
                        // if product not found
                        if (!ProductInfo)
                            throw new Error("Product not found");
                        // delete images of product except display image
                        return [4 /*yield*/, _super.prototype.deleteMultipleMedia.call(this, (_a = ProductInfo === null || ProductInfo === void 0 ? void 0 : ProductInfo.images) === null || _a === void 0 ? void 0 : _a.map(function (image) { return image.path; }))];
                    case 2:
                        // delete images of product except display image
                        _b.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.find({
                                variantOf: productId,
                            })];
                    case 3:
                        getAllVariants = _b.sent();
                        _i = 0, getAllVariants_1 = getAllVariants;
                        _b.label = 4;
                    case 4:
                        if (!(_i < getAllVariants_1.length)) return [3 /*break*/, 10];
                        variant = getAllVariants_1[_i];
                        return [4 /*yield*/, wishlist_model_1.WishListModel.deleteMany({ product: variant._id })];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, cartItem_model_1.CartItemModel.deleteMany({ product: variant._id })];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, _super.prototype.deleteMultipleMedia.call(this, variant.images.map(function (image) { return image.path; }))];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.findByIdAndDelete(variant._id)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 4];
                    case 10: return [4 /*yield*/, wishlist_model_1.WishListModel.deleteMany({ product: ProductInfo._id })];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, cartItem_model_1.CartItemModel.deleteMany({ product: ProductInfo._id })];
                    case 12:
                        _b.sent();
                        // delete product
                        return [4 /*yield*/, product_model_1.ProductModel.findByIdAndDelete(productId)];
                    case 13:
                        // delete product
                        _b.sent();
                        //! after discursion, product image will not be deleted
                        // send response to client
                        resolve(ProductInfo);
                        return [3 /*break*/, 15];
                    case 14:
                        error_5 = _b.sent();
                        // send error to client
                        reject(error_5);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * get all display products
     * @param {number} limit
     * @param {number} chunk
     */
    ProductLogic.prototype.getAllDisplayProducts = function (_a) {
        var _this = this;
        var limit = _a.limit, chunk = _a.chunk, type = _a.type, storeId = _a.storeId, excludeAccessoryIdsArrayCheck = _a.excludeAccessoryIdsArrayCheck;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var matchArray, query, productData, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        matchArray = [
                            {
                                $eq: ["$_id", "$variantOf"],
                            },
                        ];
                        type &&
                            matchArray.push({
                                $eq: ["$type", type],
                            });
                        storeId &&
                            matchArray.push({
                                $eq: ["$store", new mongoose_1.Types.ObjectId(storeId)],
                            });
                        (excludeAccessoryIdsArrayCheck === null || excludeAccessoryIdsArrayCheck === void 0 ? void 0 : excludeAccessoryIdsArrayCheck.length) &&
                            matchArray.push({
                                $not: [{ $in: ["$_id", excludeAccessoryIdsArrayCheck] }],
                            });
                        query = [
                            {
                                $match: {
                                    $expr: {
                                        $and: matchArray,
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: "categories",
                                    localField: "category",
                                    foreignField: "_id",
                                    as: "category",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$category",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $lookup: {
                                    from: "colors",
                                    localField: "color",
                                    foreignField: "_id",
                                    as: "color",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$color",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                            {
                                $lookup: {
                                    from: "memories",
                                    localField: "memory",
                                    foreignField: "_id",
                                    as: "memory",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$memory",
                                    preserveNullAndEmptyArrays: true,
                                },
                            },
                        ];
                        return [4 /*yield*/, (0, pagination_helper_1.aggregationData)({
                                model: product_model_1.ProductModel,
                                query: query,
                                position: query.length,
                                sort: { createdAt: -1 },
                                limit: limit ? Number(limit) : undefined,
                                chunk: chunk ? Number(chunk) : undefined,
                            })];
                    case 1:
                        productData = _a.sent();
                        // send response to client
                        resolve(productData);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        // send error to client
                        reject(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * get all featured products
     */
    ProductLogic.prototype.getAllFeaturedProducts = function (_a) {
        var limit = _a.limit, chunk = _a.chunk, type = _a.type, isFeatured = _a.isFeatured;
        return __awaiter(this, void 0, void 0, function () {
            var query, productData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = {
                            isFeatured: isFeatured,
                            type: type,
                        };
                        !type && delete query.type;
                        !isFeatured && delete query.isFeatured;
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: product_model_1.ProductModel,
                                query: query,
                                limit: limit,
                                chunk: chunk,
                                populate: "category color memory",
                            })];
                    case 1:
                        productData = _b.sent();
                        // send response to client
                        return [2 /*return*/, productData];
                }
            });
        });
    };
    /**
     * get all product optimized
     */
    ProductLogic.prototype.getAllProductsOptimized = function (_a) {
        var _b = _a.limit, limit = _b === void 0 ? 100 : _b, _c = _a.chunk, chunk = _c === void 0 ? 0 : _c, type = _a.type, userId = _a.userId, isFeatured = _a.isFeatured, categoryId = _a.categoryId, excludeAccessoryIdsArrayCheck = _a.excludeAccessoryIdsArrayCheck;
        return __awaiter(this, void 0, void 0, function () {
            var wishListData, allWishListArray, cartItemData, allCartItemArray, query, excludeHaveThenQuery, products, totalLength;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, wishlist_model_1.WishListModel.find({
                            user: userId,
                        }).populate("product")];
                    case 1:
                        wishListData = _d.sent();
                        allWishListArray = wishListData.map(function (wishList) { return new mongoose_1.Types.ObjectId(wishList.product); });
                        return [4 /*yield*/, cartItem_model_1.CartItemModel.find({
                                user: userId,
                            }).populate("product")];
                    case 2:
                        cartItemData = _d.sent();
                        allCartItemArray = cartItemData.map(function (wishList) { return new mongoose_1.Types.ObjectId(wishList.product); });
                        query = {
                            type: type,
                            isFeatured: isFeatured,
                            category: categoryId,
                        };
                        !type && delete query.type;
                        !isFeatured && delete query.isFeatured;
                        !categoryId && delete query.category;
                        excludeHaveThenQuery = (excludeAccessoryIdsArrayCheck === null || excludeAccessoryIdsArrayCheck === void 0 ? void 0 : excludeAccessoryIdsArrayCheck.length)
                            ? [
                                {
                                    $match: {
                                        $expr: {
                                            $not: [{ $in: ["$_id", excludeAccessoryIdsArrayCheck] }],
                                        },
                                    },
                                },
                            ]
                            : [];
                        return [4 /*yield*/, product_model_1.ProductModel.aggregate(__spreadArray(__spreadArray([
                                { $match: query }
                            ], excludeHaveThenQuery, true), [
                                {
                                    $lookup: {
                                        from: "colors",
                                        localField: "color",
                                        foreignField: "_id",
                                        as: "color",
                                    },
                                },
                                { $unwind: { path: "$color", preserveNullAndEmptyArrays: true } },
                                {
                                    $lookup: {
                                        from: "memories",
                                        localField: "memory",
                                        foreignField: "_id",
                                        as: "memory",
                                    },
                                },
                                { $unwind: { path: "$memory", preserveNullAndEmptyArrays: true } },
                                {
                                    $lookup: {
                                        from: "cartitems",
                                        localField: "_id",
                                        foreignField: "product",
                                        as: "cartQuantity",
                                        pipeline: [
                                            {
                                                $match: {
                                                    user: new mongoose_1.Types.ObjectId(userId),
                                                },
                                            },
                                        ],
                                    },
                                },
                                { $unwind: { path: "$cartQuantity", preserveNullAndEmptyArrays: true } },
                                {
                                    $addFields: {
                                        cartQuantity: "$cartQuantity.quantity",
                                        isInWishList: {
                                            $cond: [
                                                {
                                                    $toBool: { $in: ["$_id", allWishListArray] },
                                                },
                                                true,
                                                false,
                                            ],
                                        },
                                        isInCart: {
                                            $cond: [
                                                {
                                                    $toBool: { $in: ["$_id", allCartItemArray] },
                                                },
                                                true,
                                                false,
                                            ],
                                        },
                                    },
                                },
                                {
                                    $sort: { createdAt: 1 },
                                },
                                {
                                    $skip: chunk * limit,
                                },
                                {
                                    $limit: limit + 1,
                                },
                            ], false))];
                    case 3:
                        products = _d.sent();
                        totalLength = products.length;
                        if (totalLength > Number(limit))
                            products.pop();
                        return [2 /*return*/, {
                                data: products,
                                isLastChunk: !(totalLength > Number(limit)),
                            }];
                }
            });
        });
    };
    /**
     * search product
     */
    ProductLogic.prototype.searchProducts = function (_a) {
        var searchText = _a.searchText, limit = _a.limit, chunk = _a.chunk, type = _a.type;
        return __awaiter(this, void 0, void 0, function () {
            var query, productsData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = {
                            $or: [
                                { title: { $regex: searchText, $options: "i" } },
                                { description: { $regex: searchText, $options: "i" } },
                                { shortDescription: { $regex: searchText, $options: "i" } },
                            ],
                            type: type,
                        };
                        !type && delete query.type;
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: product_model_1.ProductModel,
                                query: query,
                                limit: limit,
                                chunk: chunk,
                                populate: "category color memory",
                            })];
                    case 1:
                        productsData = _b.sent();
                        return [2 /*return*/, productsData];
                }
            });
        });
    };
    /**
     * product filter
     * filter by category, price, rating, discount
     */
    ProductLogic.prototype.productFilter = function (_a) {
        var _b, _c, _d, _e, _f, _g;
        var filter = _a.filter, sortBy = _a.sortBy, _h = _a.limit, limit = _h === void 0 ? 100 : _h, _j = _a.chunk, chunk = _j === void 0 ? 0 : _j, type = _a.type, userId = _a.userId, makeId = _a.makeId, modelId = _a.modelId, colorId = _a.colorId, memoryId = _a.memoryId;
        return __awaiter(this, void 0, void 0, function () {
            var filterJSON, queryOne, queryTwo, sorting, wishListData, _k, allWishListArray, cartItemData, _l, allCartItemArray, productsData, totalLength;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        filterJSON = JSON.parse(filter);
                        queryOne = {
                            type: type,
                            condition: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.condition,
                            device: (filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.device) && {
                                $in: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.device.map(function (item) { return new mongoose_1.Types.ObjectId(item); }),
                            },
                            make: (filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.make) && {
                                $in: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.make.map(function (item) { return new mongoose_1.Types.ObjectId(item); }),
                            },
                            model: (filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.model) && {
                                $in: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.model.map(function (item) { return new mongoose_1.Types.ObjectId(item); }),
                            },
                            color: (filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.color) && {
                                $in: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.color.map(function (item) { return new mongoose_1.Types.ObjectId(item); }),
                            },
                            memory: (filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.memory) && {
                                $in: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.memory.map(function (item) { return new mongoose_1.Types.ObjectId(item); }),
                            },
                            category: (filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.category) && {
                                $in: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.category.map(function (item) { return new mongoose_1.Types.ObjectId(item); }),
                            },
                            salePrice: (filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.price) && {
                                $gte: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.price[0],
                                $lte: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.price[1],
                            },
                        };
                        !type && delete queryOne.type;
                        !(filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.condition) && delete queryOne.condition;
                        (!(filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.category) || !((_b = filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.category) === null || _b === void 0 ? void 0 : _b.length)) &&
                            delete queryOne.category;
                        (!(filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.device) || !((_c = filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.device) === null || _c === void 0 ? void 0 : _c.length)) &&
                            delete queryOne.device;
                        (!(filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.make) || !((_d = filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.make) === null || _d === void 0 ? void 0 : _d.length)) && delete queryOne.make;
                        (!(filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.model) || !((_e = filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.model) === null || _e === void 0 ? void 0 : _e.length)) && delete queryOne.model;
                        (!(filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.color) || !((_f = filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.color) === null || _f === void 0 ? void 0 : _f.length)) && delete queryOne.color;
                        (!(filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.memory) || !((_g = filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.memory) === null || _g === void 0 ? void 0 : _g.length)) &&
                            delete queryOne.memory;
                        !(filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.price) && delete queryOne.salePrice;
                        queryTwo = {
                            rating: (filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.rating) && {
                                $gte: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.rating[0],
                                $lte: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.rating[1],
                            },
                            discount: (filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.discount) && {
                                $gte: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.discount[0],
                                $lte: filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.discount[1],
                            },
                        };
                        !(filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.rating) && delete queryTwo.rating;
                        !(filterJSON === null || filterJSON === void 0 ? void 0 : filterJSON.discount) && delete queryTwo.discount;
                        sorting = { _id: 1 };
                        //sorting
                        switch (sortBy === null || sortBy === void 0 ? void 0 : sortBy.toLowerCase()) {
                            case "popularity":
                                sorting = { rating: -1 };
                                break;
                            case "latest":
                                sorting = { createdAt: -1 };
                                break;
                            case "high-to-low":
                                sorting = { salePrice: -1 };
                                break;
                            case "low-to-high":
                                sorting = { salePrice: 1 };
                                break;
                            case "default":
                                sorting = { _id: 1 };
                                break;
                            default:
                                throw new Error("Invalid sortBy, sortBy must be  popularity, latest, high-to-low, low-to-high and default");
                        }
                        if (!userId) return [3 /*break*/, 2];
                        return [4 /*yield*/, wishlist_model_1.WishListModel.find({
                                user: userId,
                            }).populate("product")];
                    case 1:
                        _k = _m.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _k = [];
                        _m.label = 3;
                    case 3:
                        wishListData = _k;
                        allWishListArray = userId
                            ? wishListData.map(function (wishList) { return new mongoose_1.Types.ObjectId(wishList.product); })
                            : [];
                        if (!userId) return [3 /*break*/, 5];
                        return [4 /*yield*/, cartItem_model_1.CartItemModel.find({
                                user: userId,
                            }).populate("product")];
                    case 4:
                        _l = _m.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _l = [];
                        _m.label = 6;
                    case 6:
                        cartItemData = _l;
                        allCartItemArray = userId
                            ? cartItemData.map(function (wishList) { return new mongoose_1.Types.ObjectId(wishList.product); })
                            : [];
                        return [4 /*yield*/, product_model_1.ProductModel.aggregate([
                                { $match: queryOne },
                                {
                                    $lookup: {
                                        from: "cartitems",
                                        localField: "_id",
                                        foreignField: "product",
                                        as: "cartQuantity",
                                        pipeline: [
                                            {
                                                $match: {
                                                    user: new mongoose_1.Types.ObjectId(userId),
                                                },
                                            },
                                        ],
                                    },
                                },
                                { $unwind: { path: "$cartQuantity", preserveNullAndEmptyArrays: true } },
                                {
                                    $addFields: {
                                        rating: {
                                            $cond: [
                                                { $toBool: "$reviews.stars" },
                                                { $toInt: { $divide: ["$reviews.stars", "$reviews.total"] } },
                                                0,
                                            ],
                                        },
                                        discount: {
                                            $multiply: [
                                                { $divide: [{ $subtract: ["$mrp", "$salePrice"] }, "$mrp"] },
                                                100,
                                            ],
                                        },
                                        cartQuantity: "$cartQuantity.quantity",
                                        isInWishList: {
                                            $cond: [
                                                {
                                                    $toBool: { $in: ["$_id", allWishListArray] },
                                                },
                                                true,
                                                false,
                                            ],
                                        },
                                        isInCart: {
                                            $cond: [
                                                {
                                                    $toBool: { $in: ["$_id", allCartItemArray] },
                                                },
                                                true,
                                                false,
                                            ],
                                        },
                                    },
                                },
                                { $match: queryTwo },
                                { $sort: sorting },
                                {
                                    $skip: chunk * limit,
                                },
                                {
                                    $limit: limit + 1,
                                },
                                {
                                    $lookup: {
                                        from: "colors",
                                        localField: "color",
                                        foreignField: "_id",
                                        as: "color",
                                    },
                                },
                                { $unwind: { path: "$color", preserveNullAndEmptyArrays: true } },
                                {
                                    $lookup: {
                                        from: "memories",
                                        localField: "memory",
                                        foreignField: "_id",
                                        as: "memory",
                                    },
                                },
                                { $unwind: { path: "$memory", preserveNullAndEmptyArrays: true } },
                            ])];
                    case 7:
                        productsData = _m.sent();
                        totalLength = productsData.length;
                        if (totalLength > Number(limit))
                            productsData.pop();
                        return [2 /*return*/, {
                                data: productsData,
                                isLastChunk: !(totalLength > Number(limit)),
                            }];
                }
            });
        });
    };
    /**
     * get all products ids
     * @param type
     * @returns array of product ids
     * @throws Error
     *
     * @description
     * get all products ids to get static site pages for products pages
     */
    ProductLogic.prototype.getAllProductsIds = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var query, productsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            type: type,
                        };
                        !type && delete query.type;
                        return [4 /*yield*/, product_model_1.ProductModel.find(query, { _id: 1 })];
                    case 1:
                        productsData = _a.sent();
                        return [2 /*return*/, productsData.map(function (product) { return product._id.toString(); })];
                }
            });
        });
    };
    /**
     * add product stock in store to inform admin
     */
    ProductLogic.prototype.addProductStock = function (_a) {
        var productId = _a.productId, stock = _a.stock, storeId = _a.storeId;
        return __awaiter(this, void 0, void 0, function () {
            var productsStockData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log({
                            productId: productId,
                            stock: stock,
                            storeId: storeId,
                        });
                        return [4 /*yield*/, productStock_model_1.ProductStockModel.findOneAndUpdate({
                                product: productId,
                                store: storeId,
                            }, {
                                product: productId,
                                stock: stock,
                                store: storeId,
                            })];
                    case 1:
                        productsStockData = _b.sent();
                        if (!!productsStockData) return [3 /*break*/, 3];
                        return [4 /*yield*/, new productStock_model_1.ProductStockModel({
                                product: productId,
                                stock: stock,
                                store: storeId,
                            }).save()];
                    case 2:
                        productsStockData = _b.sent();
                        _b.label = 3;
                    case 3:
                        console.log({ productsStockData: productsStockData });
                        return [2 /*return*/, productsStockData];
                }
            });
        });
    };
    /**
     * remove product stock in store to inform admin
     */
    ProductLogic.prototype.removeProductStock = function (_a) {
        var productStockId = _a.productStockId;
        return __awaiter(this, void 0, void 0, function () {
            var productsStockData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, productStock_model_1.ProductStockModel.findByIdAndDelete(productStockId)];
                    case 1:
                        productsStockData = _b.sent();
                        if (!productsStockData)
                            throw new Error("product stock not found");
                        return [2 /*return*/, productsStockData];
                }
            });
        });
    };
    /**
     * get values from an products array
     */
    ProductLogic.prototype.getProductsValues = function (productIds) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, product_model_1.ProductModel.aggregate([
                            {
                                $match: {
                                    _id: {
                                        $in: productIds,
                                    },
                                },
                            },
                            {
                                $group: {
                                    _id: "total",
                                    totalMrp: { $sum: "$mrp" },
                                    totalSalePrice: { $sum: "$salePrice" },
                                },
                            },
                        ])];
                    case 1:
                        data = _c.sent();
                        return [2 /*return*/, {
                                totalMrp: (_a = data[0]) === null || _a === void 0 ? void 0 : _a.totalMrp,
                                totalSalePrice: (_b = data[0]) === null || _b === void 0 ? void 0 : _b.totalSalePrice,
                            }];
                }
            });
        });
    };
    return ProductLogic;
}(media_logic_1.default));
exports.default = ProductLogic;
