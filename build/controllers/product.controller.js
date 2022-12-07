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
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var mongoose_1 = require("mongoose");
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var product_logic_1 = __importDefault(require("../logic/product.logic"));
var user_logic_1 = __importDefault(require("../logic/user.logic"));
var product_model_1 = require("../models/product.model");
var productStock_model_1 = require("../models/productStock.model");
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** fields validators for the product creation request */
        _this.validateCreateProductFields = [
            (0, express_validator_1.body)("title")
                .not()
                .isEmpty()
                .withMessage("title must be required.")
                .isLength({ min: 3 })
                .withMessage("title must be at least 3 characters long")
                .isLength({ max: 20 })
                .withMessage("title must be at most 20 characters long"),
            (0, express_validator_1.body)("shortDescription")
                .not()
                .isEmpty()
                .withMessage("shortDescription must be required.")
                .isLength({ min: 8 })
                .withMessage("Short description must be at least 8 characters long")
                .isLength({ max: 250 })
                .withMessage("Short description must be at most 250 characters long"),
            (0, express_validator_1.body)("description")
                .optional()
                .isLength({ min: 11 })
                .withMessage("Description must be at least 11 characters long")
                .isLength({ max: 1600 })
                .withMessage("Description must be at most 1600 characters long"),
            (0, express_validator_1.body)("stock").isNumeric().withMessage("Stock must be a number"),
            (0, express_validator_1.body)("salePrice").isNumeric().withMessage("Sale price must be a number"),
            (0, express_validator_1.body)("mrp").isNumeric().withMessage("MRP must be a number"),
            (0, express_validator_1.body)("condition")
                .optional()
                .isIn(["GOOD", "BETTER", "BEST"])
                .withMessage("Condition must be GOOD, BETTER, BEST"),
            (0, express_validator_1.body)("type")
                .optional()
                .isIn(["REFURBISHED", "ACCESSORY"])
                .withMessage("type must be REFURBISHED, ACCESSORY"),
            (0, express_validator_1.body)("device")
                .if(function (value, _a) {
                var req = _a.req;
                return req.body.type === "REFURBISHED";
            })
                .not()
                .isEmpty()
                .withMessage("device is required.")
                .isMongoId()
                .withMessage("device must be mongoes id."),
            (0, express_validator_1.body)("make")
                .if(function (value, _a) {
                var req = _a.req;
                return req.body.type === "REFURBISHED";
            })
                .not()
                .isEmpty()
                .withMessage("make is required.")
                .isMongoId()
                .withMessage("make must be mongoes id."),
            (0, express_validator_1.body)("model")
                .if(function (value, _a) {
                var req = _a.req;
                return req.body.type === "REFURBISHED";
            })
                .not()
                .isEmpty()
                .withMessage("model is required.")
                .isMongoId()
                .withMessage("model must be mongoes id."),
            (0, express_validator_1.body)("storeId")
                .not()
                .isEmpty()
                .withMessage("storeId is required.")
                .isMongoId()
                .withMessage("storeId must be mongoes id."),
        ];
        /** fields validators for the product variant creation request */
        _this.validateCreateProductVariantFields = [
            (0, express_validator_1.body)("title")
                .isLength({ min: 3 })
                .withMessage("title must be at least 3 characters long")
                .isLength({ max: 20 })
                .withMessage("title must be at most 20 characters long"),
            (0, express_validator_1.body)("shortDescription")
                .isLength({ min: 3 })
                .withMessage("Short description must be at least 8 characters long")
                .isLength({ max: 250 })
                .withMessage("Short description must be at most 51 characters long"),
            (0, express_validator_1.body)("description")
                .optional()
                .isLength({ min: 11 })
                .withMessage("Description must be at least 11 characters long")
                .isLength({ max: 501 })
                .withMessage("Description must be at most 501 characters long"),
            (0, express_validator_1.body)("stock").isNumeric().withMessage("Stock must be a number"),
            (0, express_validator_1.body)("salePrice").isNumeric().withMessage("Sale price must be a number"),
            (0, express_validator_1.body)("mrp").isNumeric().withMessage("MRP must be a number"),
            (0, express_validator_1.body)("variantOf", "variantOf is required")
                .custom(function (value) {
                if (!mongoose_1.Types.ObjectId.isValid(value)) {
                    return false;
                }
                return true;
            })
                .withMessage("Invalid id provided for field variantOf"),
            (0, express_validator_1.body)("condition")
                .optional()
                .isIn(["GOOD", "BETTER", "BEST"])
                .withMessage("Condition must be GOOD, BETTER, BEST"),
            (0, express_validator_1.body)("type")
                .optional()
                .isIn(["REFURBISHED", "ACCESSORY"])
                .withMessage("type must be REFURBISHED, ACCESSORY"),
        ];
        /** fields validators for the product update request */
        _this.validateCreateProductUpdateFields = [
            (0, express_validator_1.body)("title")
                .optional()
                .isLength({ min: 3 })
                .withMessage("title must be at least 3 characters long")
                .isLength({ max: 20 })
                .withMessage("title must be at most 20 characters long"),
            (0, express_validator_1.body)("shortDescription")
                .optional()
                .isLength({ min: 3 })
                .withMessage("Short description must be at least 8 characters long")
                .isLength({ max: 250 })
                .withMessage("Short description must be at most 51 characters long"),
            (0, express_validator_1.body)("description")
                .optional()
                .isLength({ min: 11 })
                .withMessage("Description must be at least 11 characters long")
                .isLength({ max: 501 })
                .withMessage("Description must be at most 501 characters long"),
            (0, express_validator_1.body)("stock").optional().isNumeric().withMessage("Stock must be a number"),
            (0, express_validator_1.body)("salePrice")
                .optional()
                .isNumeric()
                .withMessage("Sale price must be a number"),
            (0, express_validator_1.body)("variantOf")
                .optional()
                .custom(function (value) {
                if (!mongoose_1.Types.ObjectId.isValid(value)) {
                    return false;
                }
                return true;
            })
                .withMessage("Invalid id provided for field variantOf"),
            (0, express_validator_1.body)("type")
                .optional()
                .isIn(["REFURBISHED", "ACCESSORY"])
                .withMessage("type must be REFURBISHED, ACCESSORY"),
            (0, express_validator_1.body)("device")
                .optional()
                .exists()
                .isMongoId()
                .withMessage("device must be mongoes id."),
            (0, express_validator_1.body)("make")
                .optional()
                .exists()
                .isMongoId()
                .withMessage("make must be mongoes id."),
            (0, express_validator_1.body)("model")
                .optional()
                .exists()
                .isMongoId()
                .withMessage("model must be mongoes id."),
        ];
        /** fields validators for the product stock add request */
        _this.validateCreateProductStockAddFields = [
            (0, express_validator_1.body)("stock")
                .not()
                .isEmpty()
                .withMessage("stock is required")
                .isInt({ min: 0 })
                .withMessage("stock must be at least 0"),
        ];
        return _this;
    }
    // create product
    Product.prototype.createProduct = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var productData, userData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        productData = null;
                        return [4 /*yield*/, new user_logic_1.default((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a._id).getUserData()];
                    case 1:
                        userData = _b.sent();
                        // add store id to product data
                        req.body.storeId = userData === null || userData === void 0 ? void 0 : userData.store;
                        return [4 /*yield*/, _super.prototype.createAProduct.call(this, req)];
                    case 2:
                        // save product data to database
                        productData = _b.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product created successfully",
                            data: productData,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // add variant to product
    Product.prototype.addVariant = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        return __awaiter(this, void 0, void 0, function () {
            var variantOf, displayImageFile, filePath, displayImageData, _x, imagesFile, imageFilePath, imagesData, _y, _z, categoryData, error_2;
            return __generator(this, function (_0) {
                switch (_0.label) {
                    case 0:
                        _0.trys.push([0, 10, , 11]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        variantOf = req.body.variantOf;
                        displayImageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.displayImage;
                        filePath = "product";
                        if (!(displayImageFile && !Array.isArray(displayImageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, displayImageFile, filePath)];
                    case 1:
                        _x = _0.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _x = undefined;
                        _0.label = 3;
                    case 3:
                        displayImageData = _x;
                        imagesFile = (_b = req.files) === null || _b === void 0 ? void 0 : _b.images;
                        imageFilePath = "product";
                        _y = imagesFile;
                        if (!_y) return [3 /*break*/, 8];
                        if (!Array.isArray(imagesFile)) return [3 /*break*/, 5];
                        return [4 /*yield*/, _super.prototype.uploadMultipleMedia.call(this, imagesFile, imageFilePath)];
                    case 4:
                        _z = _0.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imagesFile, imageFilePath)];
                    case 6:
                        _z = _0.sent();
                        _0.label = 7;
                    case 7:
                        _y = (_z);
                        _0.label = 8;
                    case 8:
                        imagesData = _y;
                        return [4 /*yield*/, new product_model_1.ProductModel({
                                title: (_c = req.body) === null || _c === void 0 ? void 0 : _c.title,
                                shortDescription: (_d = req.body) === null || _d === void 0 ? void 0 : _d.shortDescription,
                                description: (_e = req.body) === null || _e === void 0 ? void 0 : _e.description,
                                mrp: (_f = req.body) === null || _f === void 0 ? void 0 : _f.mrp,
                                salePrice: (_g = req.body) === null || _g === void 0 ? void 0 : _g.salePrice,
                                displayImage: displayImageData,
                                category: (_h = req.body) === null || _h === void 0 ? void 0 : _h.category,
                                store: (_j = req.body) === null || _j === void 0 ? void 0 : _j.store,
                                isFeatured: (_k = req.body) === null || _k === void 0 ? void 0 : _k.isFeatured,
                                isActive: (_l = req.body) === null || _l === void 0 ? void 0 : _l.isActive,
                                stock: (_m = req.body) === null || _m === void 0 ? void 0 : _m.stock,
                                variantOf: (_o = req.body) === null || _o === void 0 ? void 0 : _o.variantOf,
                                memory: (_p = req.body) === null || _p === void 0 ? void 0 : _p.memory,
                                color: (_q = req.body) === null || _q === void 0 ? void 0 : _q.color,
                                condition: (_r = req.body) === null || _r === void 0 ? void 0 : _r.condition,
                                type: (_s = req.body) === null || _s === void 0 ? void 0 : _s.type,
                                images: imagesData,
                                moq: (_t = req.body) === null || _t === void 0 ? void 0 : _t.moq,
                                device: (_u = req === null || req === void 0 ? void 0 : req.body) === null || _u === void 0 ? void 0 : _u.device,
                                make: (_v = req === null || req === void 0 ? void 0 : req.body) === null || _v === void 0 ? void 0 : _v.make,
                                model: (_w = req === null || req === void 0 ? void 0 : req.body) === null || _w === void 0 ? void 0 : _w.model,
                                //
                            }).save()];
                    case 9:
                        categoryData = _0.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product variant created successfully",
                            data: categoryData,
                        });
                        return [3 /*break*/, 11];
                    case 10:
                        error_2 = _0.sent();
                        // send error to client
                        next(error_2);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // update product
    Product.prototype.updateProduct = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        return __awaiter(this, void 0, void 0, function () {
            var displayImageFile, filePath, displayImageData, _y, imagesFile, imageFilePath, imagesData, _z, _0, updatedProduct, _1, error_3;
            return __generator(this, function (_2) {
                switch (_2.label) {
                    case 0:
                        _2.trys.push([0, 12, , 13]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        displayImageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.displayImage;
                        filePath = "product";
                        if (!(displayImageFile && !Array.isArray(displayImageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, displayImageFile, filePath)];
                    case 1:
                        _y = _2.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _y = undefined;
                        _2.label = 3;
                    case 3:
                        displayImageData = _y;
                        imagesFile = (_b = req.files) === null || _b === void 0 ? void 0 : _b.images;
                        imageFilePath = "product";
                        _z = imagesFile;
                        if (!_z) return [3 /*break*/, 8];
                        if (!Array.isArray(imagesFile)) return [3 /*break*/, 5];
                        return [4 /*yield*/, _super.prototype.uploadMultipleMedia.call(this, imagesFile, imageFilePath)];
                    case 4:
                        _0 = _2.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imagesFile, imageFilePath)];
                    case 6:
                        _0 = _2.sent();
                        _2.label = 7;
                    case 7:
                        _z = (_0);
                        _2.label = 8;
                    case 8:
                        imagesData = _z;
                        return [4 /*yield*/, product_model_1.ProductModel.findByIdAndUpdate(req.params.productId, {
                                title: (_c = req.body) === null || _c === void 0 ? void 0 : _c.title,
                                shortDescription: (_d = req.body) === null || _d === void 0 ? void 0 : _d.shortDescription,
                                description: (_e = req.body) === null || _e === void 0 ? void 0 : _e.description,
                                mrp: (_f = req.body) === null || _f === void 0 ? void 0 : _f.mrp,
                                salePrice: (_g = req.body) === null || _g === void 0 ? void 0 : _g.salePrice,
                                displayImage: displayImageData,
                                category: (_h = req.body) === null || _h === void 0 ? void 0 : _h.category,
                                store: (_j = req.body) === null || _j === void 0 ? void 0 : _j.store,
                                isFeatured: (_k = req.body) === null || _k === void 0 ? void 0 : _k.isFeatured,
                                isActive: (_l = req.body) === null || _l === void 0 ? void 0 : _l.isActive,
                                stock: (_m = req.body) === null || _m === void 0 ? void 0 : _m.stock,
                                variantOf: (_o = req.body) === null || _o === void 0 ? void 0 : _o.variantOf,
                                memory: (_p = req.body) === null || _p === void 0 ? void 0 : _p.memory,
                                color: (_q = req.body) === null || _q === void 0 ? void 0 : _q.color,
                                condition: (_r = req.body) === null || _r === void 0 ? void 0 : _r.condition,
                                type: (_s = req.body) === null || _s === void 0 ? void 0 : _s.type,
                                $addToSet: {
                                    images: imagesData,
                                },
                                moq: (_t = req.body) === null || _t === void 0 ? void 0 : _t.moq,
                                device: (_u = req === null || req === void 0 ? void 0 : req.body) === null || _u === void 0 ? void 0 : _u.device,
                                make: (_v = req === null || req === void 0 ? void 0 : req.body) === null || _v === void 0 ? void 0 : _v.make,
                                model: (_w = req === null || req === void 0 ? void 0 : req.body) === null || _w === void 0 ? void 0 : _w.model,
                            })];
                    case 9:
                        updatedProduct = _2.sent();
                        if (!updatedProduct)
                            throw new Error("Product not found");
                        // remove old images from cloud storage
                        _1 = (displayImageData === null || displayImageData === void 0 ? void 0 : displayImageData.path) &&
                            ((_x = updatedProduct.displayImage) === null || _x === void 0 ? void 0 : _x.path);
                        if (!_1) 
                        // remove old images from cloud storage
                        return [3 /*break*/, 11];
                        return [4 /*yield*/, _super.prototype.deleteMedia.call(this, updatedProduct.displayImage.path)];
                    case 10:
                        _1 = (_2.sent());
                        _2.label = 11;
                    case 11:
                        // remove old images from cloud storage
                        _1;
                        //TODO: remove old images from cloud storage
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product updated successfully",
                            data: updatedProduct,
                        });
                        return [3 /*break*/, 13];
                    case 12:
                        error_3 = _2.sent();
                        // send error to client
                        next(error_3);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    // get product variants
    Product.prototype.getProductVariants = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var variants, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _super.prototype.getVariants.call(this, req.params.productId)];
                    case 1:
                        variants = _a.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product variants fetched successfully",
                            data: variants,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        // send error to client
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** delete a product */
    Product.prototype.deleteAProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var product, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _super.prototype.deleteProduct.call(this, req.params.productId)];
                    case 1:
                        product = _a.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product deleted successfully",
                            data: product,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        // send error to client
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**get all display products */
    Product.prototype.getAllProduct = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var storeId, products, error_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        storeId = req.query.storeId;
                        products = void 0;
                        if (!((_a = req.query) === null || _a === void 0 ? void 0 : _a.userId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.getAllProductsOptimized.call(this, {
                                limit: req.query.limit ? Number(req.query.limit) : undefined,
                                chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                                type: req.query.type
                                    ? req.query.type.toString().toUpperCase()
                                    : undefined,
                                userId: (_b = req.query) === null || _b === void 0 ? void 0 : _b.userId,
                            })];
                    case 1:
                        products = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, _super.prototype.getAllDisplayProducts.call(this, {
                            limit: req.query.limit ? Number(req.query.limit) : undefined,
                            chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                            type: req.query.type
                                ? req.query.type.toString().toUpperCase()
                                : undefined,
                            storeId: storeId ? String(storeId) : undefined,
                        })];
                    case 3:
                        products = _c.sent();
                        _c.label = 4;
                    case 4:
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "All products fetched successfully",
                            data: products,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _c.sent();
                        // send error to client
                        next(error_6);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // async product information
    Product.prototype.getProductDetails = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var productId, userId, findProduct, productVariant, productList, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        productId = req.params.productId;
                        userId = (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id;
                        return [4 /*yield*/, product_model_1.ProductModel.findById(productId).select("type")];
                    case 1:
                        findProduct = _b.sent();
                        if (!(findProduct === null || findProduct === void 0 ? void 0 : findProduct.type))
                            throw new http_errors_1.NotFound("No product found.");
                        productVariant = (findProduct === null || findProduct === void 0 ? void 0 : findProduct.type) === "ACCESSORY"
                            ? [
                                {
                                    $lookup: {
                                        from: "products",
                                        foreignField: "variantOf",
                                        localField: "_id",
                                        as: "colorVariants",
                                        pipeline: [
                                            // color look up
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
                                            // color lookup end
                                            // memory lookup
                                            // {},
                                            // memory lookup end
                                            {
                                                $group: {
                                                    _id: "$color",
                                                    id: {
                                                        $first: "$_id",
                                                    },
                                                    count: {
                                                        $sum: 1,
                                                    },
                                                    package: {
                                                        $push: {
                                                            _id: "$_id",
                                                            color: "$color",
                                                            memory: "$memory",
                                                            condition: "$condition",
                                                        },
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    color: "$_id.color",
                                                    hashCode: "$_id.hashCode",
                                                    _id: "$_id._id",
                                                    firstId: "$id",
                                                    count: 1,
                                                    package: 1,
                                                },
                                            },
                                        ],
                                    },
                                },
                            ]
                            : [
                                // memory look up
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
                                // memory lookup end
                                // color variants
                                {
                                    $lookup: {
                                        from: "products",
                                        localField: "model",
                                        foreignField: "model",
                                        as: "colorVariants",
                                        pipeline: [
                                            // color look up
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
                                            // color lookup end
                                            // memory lookup
                                            // {},
                                            // memory lookup end
                                            {
                                                $group: {
                                                    _id: "$color",
                                                    id: {
                                                        $first: "$_id",
                                                    },
                                                    count: {
                                                        $sum: 1,
                                                    },
                                                    package: {
                                                        $push: {
                                                            _id: "$_id",
                                                            color: "$color",
                                                            memory: "$memory",
                                                            condition: "$condition",
                                                        },
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    color: "$_id.color",
                                                    hashCode: "$_id.hashCode",
                                                    _id: "$_id._id",
                                                    firstId: "$id",
                                                    count: 1,
                                                    package: 1,
                                                },
                                            },
                                        ],
                                    },
                                },
                                // condition variants
                                {
                                    $lookup: {
                                        from: "products",
                                        localField: "model",
                                        foreignField: "model",
                                        as: "conditionVariants",
                                        pipeline: [
                                            // color look up
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
                                            // color lookup end
                                            // memory look up
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
                                            // memory lookup end
                                            {
                                                $group: {
                                                    _id: "$condition",
                                                    id: {
                                                        $first: "$_id",
                                                    },
                                                    count: {
                                                        $sum: 1,
                                                    },
                                                    package: {
                                                        $push: {
                                                            _id: "$_id",
                                                            color: "$color",
                                                            memory: "$memory",
                                                            condition: "$condition",
                                                        },
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    condition: "$_id",
                                                    firstId: "$id",
                                                    count: 1,
                                                    package: 1,
                                                },
                                            },
                                        ],
                                    },
                                },
                                // memory variant
                                {
                                    $lookup: {
                                        from: "products",
                                        localField: "model",
                                        foreignField: "model",
                                        as: "memoryVariants",
                                        pipeline: [
                                            // color look up
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
                                            // color lookup end
                                            // memory look up
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
                                            // memory lookup end
                                            {
                                                $group: {
                                                    _id: "$memory",
                                                    id: {
                                                        $first: "$_id",
                                                    },
                                                    count: {
                                                        $sum: 1,
                                                    },
                                                    package: {
                                                        $push: {
                                                            _id: "$_id",
                                                            color: "$color",
                                                            memory: "$memory",
                                                            condition: "$condition",
                                                        },
                                                    },
                                                },
                                            },
                                            {
                                                $project: {
                                                    internal: "$_id.internal",
                                                    ram: "$_id.ram",
                                                    _id: "$_id._id",
                                                    firstId: "$id",
                                                    count: 1,
                                                    package: 1,
                                                },
                                            },
                                        ],
                                    },
                                },
                            ];
                        return [4 /*yield*/, product_model_1.ProductModel.aggregate(__spreadArray(__spreadArray([
                                {
                                    $match: {
                                        _id: new mongoose_1.Types.ObjectId(productId),
                                    },
                                },
                                // product in cart or not check
                                {
                                    $lookup: {
                                        from: "cartitems",
                                        localField: "_id",
                                        foreignField: "product",
                                        as: "isInCart",
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
                                    $addFields: {
                                        isInCart: {
                                            $gte: [{ $size: "$isInCart" }, 1],
                                        },
                                    },
                                },
                                // product in whish list
                                {
                                    $lookup: {
                                        from: "wishlists",
                                        localField: "_id",
                                        foreignField: "product",
                                        as: "isInWishList",
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
                                    $addFields: {
                                        isInWishList: {
                                            $gte: [{ $size: "$isInWishList" }, 1],
                                        },
                                    },
                                },
                                // color look up
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
                                }
                            ], productVariant, true), [
                                // MAKE LOOKUP
                                {
                                    $lookup: {
                                        from: "makes",
                                        localField: "make",
                                        foreignField: "_id",
                                        as: "make",
                                        pipeline: [
                                            {
                                                $project: {
                                                    title: 1,
                                                    image: 1,
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$make",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "devices",
                                        localField: "device",
                                        foreignField: "_id",
                                        as: "device",
                                        pipeline: [
                                            {
                                                $project: {
                                                    title: 1,
                                                    image: 1,
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$device",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "models",
                                        localField: "model",
                                        foreignField: "_id",
                                        as: "model",
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
                                        path: "$model",
                                        preserveNullAndEmptyArrays: true,
                                    },
                                },
                            ], false))];
                    case 2:
                        productList = _b.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "Product details fetched successfully",
                            data: (productList === null || productList === void 0 ? void 0 : productList[0]) || {},
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _b.sent();
                        next(error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get all featured products
    Product.prototype.getAllFeaturedProductsController = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var products, error_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        products = void 0;
                        if (!((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.getAllProductsOptimized.call(this, {
                                limit: req.query.limit ? Number(req.query.limit) : undefined,
                                chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                                userId: (_b = req.query) === null || _b === void 0 ? void 0 : _b.userId,
                                type: req.query.type
                                    ? req.query.type.toString().toUpperCase()
                                    : undefined,
                                isFeatured: true,
                            })];
                    case 1:
                        // get all wishlist products
                        products = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, _super.prototype.getAllFeaturedProducts.call(this, {
                            limit: req.query.limit ? Number(req.query.limit) : undefined,
                            chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                            type: req.query.type
                                ? req.query.type.toString().toUpperCase()
                                : undefined,
                            isFeatured: true,
                        })];
                    case 3:
                        products = _c.sent();
                        _c.label = 4;
                    case 4:
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "All featured products fetched successfully",
                            data: products,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_8 = _c.sent();
                        // send error to client
                        next(error_8);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //search products
    Product.prototype.searchProductsController = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var products, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.query.searchText)
                            throw new Error("Search text is required");
                        return [4 /*yield*/, _super.prototype.searchProducts.call(this, {
                                searchText: req.query.searchText,
                                limit: req.query.limit ? Number(req.query.limit) : undefined,
                                chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                                type: req.query.type
                                    ? req.query.type.toString().toUpperCase()
                                    : undefined,
                            })];
                    case 1:
                        products = _a.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Products fetched successfully",
                            data: products,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        // send error to client
                        next(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //product filter
    Product.prototype.filterProductsController = function (req, res, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var products, error_10;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 3]);
                        if (!req.query.filter)
                            throw new Error("Filter is required");
                        return [4 /*yield*/, _super.prototype.productFilter.call(this, {
                                userId: (_a = req.query) === null || _a === void 0 ? void 0 : _a.userId,
                                makeId: (_b = req.query) === null || _b === void 0 ? void 0 : _b.makeId,
                                modelId: (_c = req.query) === null || _c === void 0 ? void 0 : _c.modelId,
                                colorId: (_d = req.query) === null || _d === void 0 ? void 0 : _d.colorId,
                                memoryId: (_e = req.query) === null || _e === void 0 ? void 0 : _e.memoryId,
                                filter: req.query.filter,
                                sortBy: req.query.sortBy,
                                limit: req.query.limit ? Number(req.query.limit) : undefined,
                                chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                                type: req.query.type
                                    ? req.query.type.toString().toUpperCase()
                                    : undefined,
                            })];
                    case 1:
                        products = _f.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Products fetched successfully",
                            data: products,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _f.sent();
                        // send error to client
                        next(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //delete product image
    Product.prototype.deleteProductImageController = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var productData, product, error_11;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, product_model_1.ProductModel.findById(req.params.productId)];
                    case 1:
                        productData = _c.sent();
                        if (!productData)
                            throw new Error("Product not found");
                        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.imagePath))
                            throw new Error("Image path is required");
                        return [4 /*yield*/, new media_logic_1.default().deleteMedia((_b = req.body) === null || _b === void 0 ? void 0 : _b.imagePath)];
                    case 2:
                        product = _c.sent();
                        return [4 /*yield*/, product_model_1.ProductModel.findByIdAndUpdate(req.params.productId, {
                                images: productData.images.filter(function (image) { var _a; return (image === null || image === void 0 ? void 0 : image.path) !== ((_a = req.body) === null || _a === void 0 ? void 0 : _a.imagePath); }),
                            })];
                    case 3:
                        _c.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product image deleted successfully",
                            data: product,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_11 = _c.sent();
                        // send error to client
                        next(error_11);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //get all products ids for static site generation
    Product.prototype.getAllProductsIdsController = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var products, error_12;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _super.prototype.getAllProductsIds.call(this, req.query.type ? (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.toString()) === null || _c === void 0 ? void 0 : _c.toUpperCase() : undefined)];
                    case 1:
                        products = _d.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Products fetched successfully",
                            data: products,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _d.sent();
                        // send error to client
                        next(error_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //add product stock
    Product.prototype.addProductsStockController = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var products, error_13;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.addProductStock.call(this, {
                                productId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.productId,
                                stock: (_b = req.body) === null || _b === void 0 ? void 0 : _b.stock,
                                storeId: (_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.store,
                            })];
                    case 1:
                        products = _d.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product stock added successfully",
                            data: products,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _d.sent();
                        // send error to client
                        next(error_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //remove product stock
    Product.prototype.removeProductsStockController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var products, error_14;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.removeProductStock.call(this, {
                                productStockId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.productStockId,
                            })];
                    case 1:
                        products = _b.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product stock removed successfully",
                            data: products,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_14 = _b.sent();
                        // send error to client
                        next(error_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get product stock
    Product.prototype.getProductStocksController = function (req, res, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var products, error_15;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: productStock_model_1.ProductStockModel,
                                query: { store: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.store },
                                limit: ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number((_c = req.query) === null || _c === void 0 ? void 0 : _c.limit) : undefined,
                                chunk: ((_d = req.query) === null || _d === void 0 ? void 0 : _d.chunk) ? Number((_e = req.query) === null || _e === void 0 ? void 0 : _e.chunk) : undefined,
                                populate: "product",
                                sort: { createdAt: -1 },
                            })];
                    case 1:
                        products = _f.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Product stock fetched successfully",
                            data: products,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_15 = _f.sent();
                        // send error to client
                        next(error_15);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get stores stocks
    Product.prototype.getStoresStocksController = function (req, res, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var products, error_16;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: productStock_model_1.ProductStockModel,
                                query: { product: (_a = req.params) === null || _a === void 0 ? void 0 : _a.productId },
                                limit: ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number((_c = req.query) === null || _c === void 0 ? void 0 : _c.limit) : undefined,
                                chunk: ((_d = req.query) === null || _d === void 0 ? void 0 : _d.chunk) ? Number((_e = req.query) === null || _e === void 0 ? void 0 : _e.chunk) : undefined,
                                populate: "product store color memory category",
                                sort: { createdAt: -1 },
                            })];
                    case 1:
                        products = _f.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Stores stocks fetched successfully",
                            data: products,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_16 = _f.sent();
                        // send error to client
                        next(error_16);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.productTemp = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var hubId, updateData, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hubId = "633e661162ad6ca32d956bcf";
                        return [4 /*yield*/, product_model_1.ProductModel.updateMany({ store: "633e661162ad6ca32d956bcf" }, { store: "63906b028141dbe3da16dafe" })];
                    case 1:
                        updateData = _a.sent();
                        res.json({ data: updateData });
                        return [3 /*break*/, 3];
                    case 2:
                        error_17 = _a.sent();
                        next(error_17);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Product;
}(product_logic_1.default));
exports.default = Product;
