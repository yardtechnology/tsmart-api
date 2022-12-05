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
var helper_1 = require("../helper");
var pagination_helper_1 = __importDefault(require("../helper/pagination.helper"));
var blog_logic_1 = __importDefault(require("../logic/blog.logic"));
var blog_model_1 = require("../models/blog.model");
var Blog = /** @class */ (function (_super) {
    __extends(Blog, _super);
    function Blog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validateCreateBlogFields = [
            (0, express_validator_1.body)("title")
                .not()
                .isEmpty()
                .withMessage("Title is required")
                .isLength({ min: 3, max: 25 })
                .withMessage("Title must be between 3 and 25 characters"),
            (0, express_validator_1.body)("description")
                .optional()
                .isLength({ min: 11, max: 250 })
                .withMessage("description must be between 11 and 250 characters"),
            (0, express_validator_1.body)("author")
                .optional()
                .isLength({ min: 2, max: 21 })
                .withMessage("author must be between 2 and 21 characters"),
        ];
        _this.validateUpdateBlogFields = [
            (0, express_validator_1.body)("title")
                .optional()
                .isLength({ min: 3, max: 25 })
                .withMessage("Title must be between 3 and 25 characters"),
            (0, express_validator_1.body)("description")
                .optional()
                .isLength({ min: 11, max: 250 })
                .withMessage("description must be between 11 and 250 characters"),
            (0, express_validator_1.body)("author")
                .optional()
                .isLength({ min: 11, max: 21 })
                .withMessage("author must be between 5 and 21 characters"),
            (0, express_validator_1.body)("tags")
                .optional()
                .isArray()
                .withMessage("tags must be an array of strings"),
        ];
        _this.validateGetBlogCommentsFields = [
            (0, express_validator_1.body)("blogId")
                .optional()
                .isMongoId()
                .withMessage("blogId is not a valid id"),
            (0, express_validator_1.body)("commentId")
                .optional()
                .isMongoId()
                .withMessage("commentId is not a valid id"),
        ];
        return _this;
    }
    // create Blog
    Blog.prototype.createBlogController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, title, description, author, article, tags, blogData, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        _b = req.body, title = _b.title, description = _b.description, author = _b.author, article = _b.article, tags = _b.tags;
                        return [4 /*yield*/, _super.prototype.createBlog.call(this, {
                                title: title,
                                description: description,
                                author: author,
                                article: article,
                                tags: tags,
                                posterFile: (_a = req.files) === null || _a === void 0 ? void 0 : _a.poster,
                            })];
                    case 1:
                        blogData = _c.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Blog created successfully",
                            data: blogData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _c.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //update blog
    Blog.prototype.updateBlogController = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, title, description, author, article, tags, blogData, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        _c = req.body, title = _c.title, description = _c.description, author = _c.author, article = _c.article, tags = _c.tags;
                        return [4 /*yield*/, _super.prototype.updateBlog.call(this, {
                                blogId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.blogId,
                                title: title,
                                description: description,
                                author: author,
                                article: article,
                                tags: tags,
                                posterFile: (_b = req.files) === null || _b === void 0 ? void 0 : _b.poster,
                            })];
                    case 1:
                        blogData = _d.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Blog updated successfully",
                            data: blogData,
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
    //get all blogs
    Blog.prototype.getAllBlogsController = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var query, blogs, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        query = { type: (_c = (_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.toString()) === null || _c === void 0 ? void 0 : _c.toUpperCase() };
                        !((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.type) && delete query.type;
                        return [4 /*yield*/, (0, pagination_helper_1.default)({
                                model: blog_model_1.BlogModel,
                                query: query,
                                limit: req.query.limit,
                                chunk: req.query.chunk,
                                select: "-article",
                                sort: { createdAt: -1 },
                            })];
                    case 1:
                        blogs = _e.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Blogs found successfully",
                            data: blogs,
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
    //get blog by id
    Blog.prototype.getBlogByIdController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var blogData, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.getBlog.call(this, (_a = req.params) === null || _a === void 0 ? void 0 : _a.blogId)];
                    case 1:
                        blogData = _b.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Blog fetched successfully",
                            data: blogData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //add comment on blog
    Blog.prototype.addCommentController = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var blogData, error_5;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.addComment.call(this, {
                                blogId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.blogId,
                                comment: (_b = req.body) === null || _b === void 0 ? void 0 : _b.comment,
                                userId: (_c = req === null || req === void 0 ? void 0 : req.currentUser) === null || _c === void 0 ? void 0 : _c._id,
                            })];
                    case 1:
                        blogData = _d.sent();
                        res.json({
                            status: "SUCCESS",
                            message: "comment added successfully",
                            data: blogData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _d.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //delete comment
    Blog.prototype.deleteCommentController = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var blogData, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.deleteComment.call(this, {
                                commentId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.commentId,
                            })];
                    case 1:
                        blogData = _b.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "comment deleted successfully",
                            data: blogData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _b.sent();
                        next(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get comments
    Blog.prototype.getCommentsController = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var blogData, error_7;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        // validator error handler
                        (0, helper_1.fieldValidateError)(req);
                        return [4 /*yield*/, _super.prototype.getComments.call(this, {
                                blogId: (_a = req.query) === null || _a === void 0 ? void 0 : _a.blogId,
                                commentId: (_b = req.query) === null || _b === void 0 ? void 0 : _b.commentId,
                                limit: (_c = req.query) === null || _c === void 0 ? void 0 : _c.limit,
                                chunk: req.query.chunk,
                            })];
                    case 1:
                        blogData = _d.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "comment fetched successfully",
                            data: blogData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _d.sent();
                        next(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //delete blog
    Blog.prototype.deleteBlogController = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var blogData, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _super.prototype.deleteBlog.call(this, req.params.blogId)];
                    case 1:
                        blogData = _a.sent();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "Blog deleted successfully",
                            data: blogData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Blog;
}(blog_logic_1.default));
exports.default = Blog;
