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
var media_logic_1 = __importDefault(require("../logic/media.logic"));
var category_model_1 = require("../models/category.model");
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // finds validators for the user creation request
        _this.validateCreateCategoryFields = [
            (0, express_validator_1.body)("name")
                .optional()
                .isLength({ min: 3 })
                .withMessage("Name must be at least 3 characters long")
                .isLength({ max: 20 })
                .withMessage("Name must be at most 20 characters long"),
            (0, express_validator_1.body)("description")
                .optional()
                .isLength({ min: 5 })
                .withMessage("Description must be at least 5 characters long")
                .isLength({ max: 51 })
                .withMessage("Description must be at most 51 characters long"),
            (0, express_validator_1.body)("isActive")
                .optional()
                .isBoolean()
                .withMessage("isActive must be a boolean"),
        ];
        return _this;
    }
    // create address
    Category.prototype.createCategory = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var errors, imageFile, filePath, imageData, _g, categoryData, error_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 5, , 6]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        imageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "".concat((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id);
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imageFile, filePath)];
                    case 1:
                        _g = _h.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _g = undefined;
                        _h.label = 3;
                    case 3:
                        imageData = _g;
                        return [4 /*yield*/, new category_model_1.CategoryModel({
                                name: (_c = req.body) === null || _c === void 0 ? void 0 : _c.name,
                                description: (_d = req.body) === null || _d === void 0 ? void 0 : _d.description,
                                image: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                                parentCategory: (_e = req.body) === null || _e === void 0 ? void 0 : _e.parentCategory,
                                isActive: (_f = req.body) === null || _f === void 0 ? void 0 : _f.isActive,
                            }).save()];
                    case 4:
                        categoryData = _h.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Category added successfully",
                            data: categoryData,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _h.sent();
                        // send error to client
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // update address
    Category.prototype.updateCategory = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var errors, imageFile, filePath, imageData, _h, categoryData, error_2;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 5, , 6]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            throw new Error(errors
                                .array()
                                .map(function (errors) { return errors.msg; })
                                .join()
                                .replace(/[,]/g, " and "));
                        }
                        imageFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                        filePath = "".concat((_b = req.currentUser) === null || _b === void 0 ? void 0 : _b._id);
                        if (!(imageFile && !Array.isArray(imageFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, imageFile, filePath)];
                    case 1:
                        _h = _j.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _h = undefined;
                        _j.label = 3;
                    case 3:
                        imageData = _h;
                        return [4 /*yield*/, category_model_1.CategoryModel.findByIdAndUpdate(req.params.categoryId, {
                                name: (_c = req.body) === null || _c === void 0 ? void 0 : _c.name,
                                description: (_d = req.body) === null || _d === void 0 ? void 0 : _d.description,
                                image: imageData === null || imageData === void 0 ? void 0 : imageData.url,
                                imagePath: imageData === null || imageData === void 0 ? void 0 : imageData.path,
                                isFeatured: (_e = req.body) === null || _e === void 0 ? void 0 : _e.isFeatured,
                                parentCategory: (_f = req.body) === null || _f === void 0 ? void 0 : _f.parentCategory,
                                isActive: (_g = req.body) === null || _g === void 0 ? void 0 : _g.isActive,
                            })];
                    case 4:
                        categoryData = _j.sent();
                        if (!categoryData)
                            throw new Error("Category not found");
                        // delete previous avatar
                        (imageData === null || imageData === void 0 ? void 0 : imageData.path) &&
                            (categoryData === null || categoryData === void 0 ? void 0 : categoryData.imagePath) &&
                            _super.prototype.deleteMedia.call(this, categoryData === null || categoryData === void 0 ? void 0 : categoryData.imagePath);
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Category updated successfully",
                            data: categoryData,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _j.sent();
                        // send error to client
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // get address
    Category.prototype.getCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var categoryData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, category_model_1.CategoryModel.findById(req.params.categoryId)
                                .populate("parentCategory")
                                .select("-imagePath")];
                    case 1:
                        categoryData = _a.sent();
                        if (!categoryData)
                            throw new Error("Category not found");
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Category found successfully",
                            data: categoryData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        // send error to client
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //   get all category
    Category.prototype.getAllCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, categoryData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = {
                            parentCategory: req.query.parentCategory || { $exists: false },
                        };
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: category_model_1.CategoryModel,
                                query: query,
                                select: "-imagePath",
                                sort: { createdAt: -1 },
                                populate: "parentCategory",
                                limit: req.query.limit ? Number(req.query.limit) : undefined,
                                chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
                            })];
                    case 1:
                        categoryData = _a.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "All category found successfully",
                            data: categoryData,
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
    // get address
    Category.prototype.deleteCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var categoryData, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, category_model_1.CategoryModel.findByIdAndDelete(req.params.categoryId)];
                    case 1:
                        categoryData = _a.sent();
                        if (!categoryData)
                            throw new Error("Category not found");
                        // delete previous avatar
                        (categoryData === null || categoryData === void 0 ? void 0 : categoryData.imagePath) && _super.prototype.deleteMedia.call(this, categoryData === null || categoryData === void 0 ? void 0 : categoryData.imagePath);
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Category deleted successfully",
                            data: categoryData,
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
    //TODO: GET ALL PRODUCTS BY CATEGORY
    //get all featured category
    Category.prototype.getAllFeaturedCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var allFeaturedCategory, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, category_model_1.CategoryModel.find({
                                isFeatured: true,
                            })];
                    case 1:
                        allFeaturedCategory = _a.sent();
                        // send response to client
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "All featured category found successfully",
                            data: allFeaturedCategory,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        // send error to client
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Category;
}(media_logic_1.default));
exports.default = Category;
