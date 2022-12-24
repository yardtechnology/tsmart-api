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
var helper_1 = require("../helper");
var blog_model_1 = require("../models/blog.model");
var comment_model_1 = require("../models/comment.model");
var media_logic_1 = __importDefault(require("./media.logic"));
var BlogLogic = /** @class */ (function (_super) {
    __extends(BlogLogic, _super);
    function BlogLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlogLogic.prototype.createBlog = function (_a) {
        var title = _a.title, description = _a.description, author = _a.author, posterFile = _a.posterFile, tags = _a.tags, article = _a.article;
        return __awaiter(this, void 0, void 0, function () {
            var filePath, poster, _b, blogData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        filePath = "blog";
                        if (!(posterFile && !Array.isArray(posterFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, posterFile, filePath)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = undefined;
                        _c.label = 3;
                    case 3:
                        poster = _b;
                        return [4 /*yield*/, new blog_model_1.BlogModel({
                                title: title,
                                description: description,
                                author: author,
                                poster: poster === null || poster === void 0 ? void 0 : poster.url,
                                posterPath: poster === null || poster === void 0 ? void 0 : poster.path,
                                tags: tags,
                                article: article,
                            }).save()];
                    case 4:
                        blogData = _c.sent();
                        return [2 /*return*/, blogData];
                }
            });
        });
    };
    BlogLogic.prototype.updateBlog = function (_a) {
        var blogId = _a.blogId, title = _a.title, description = _a.description, author = _a.author, posterFile = _a.posterFile, tags = _a.tags, article = _a.article;
        return __awaiter(this, void 0, void 0, function () {
            var filePath, poster, _b, blogData, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        filePath = "blog";
                        if (!(posterFile && !Array.isArray(posterFile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.uploadMedia.call(this, posterFile, filePath)];
                    case 1:
                        _b = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = undefined;
                        _d.label = 3;
                    case 3:
                        poster = _b;
                        return [4 /*yield*/, blog_model_1.BlogModel.findByIdAndUpdate(blogId, {
                                title: title,
                                description: description,
                                author: author,
                                poster: poster === null || poster === void 0 ? void 0 : poster.url,
                                posterPath: poster === null || poster === void 0 ? void 0 : poster.path,
                                tags: tags,
                                article: article,
                            })];
                    case 4:
                        blogData = _d.sent();
                        _c = (poster === null || poster === void 0 ? void 0 : poster.path) &&
                            (blogData === null || blogData === void 0 ? void 0 : blogData.posterPATH);
                        if (!_c) return [3 /*break*/, 6];
                        return [4 /*yield*/, _super.prototype.deleteMedia.call(this, blogData === null || blogData === void 0 ? void 0 : blogData.posterPATH)];
                    case 5:
                        _c = (_d.sent());
                        _d.label = 6;
                    case 6:
                        _c;
                        return [2 /*return*/, blogData];
                }
            });
        });
    };
    BlogLogic.prototype.getBlog = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var blogData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blog_model_1.BlogModel.findById(id)];
                    case 1:
                        blogData = _a.sent();
                        return [2 /*return*/, blogData];
                }
            });
        });
    };
    //add comment
    BlogLogic.prototype.addComment = function (_a) {
        var blogId = _a.blogId, userId = _a.userId, comment = _a.comment;
        return __awaiter(this, void 0, void 0, function () {
            var commentData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new comment_model_1.CommentSchema({
                            blog: blogId,
                            user: userId,
                            comment: comment,
                        }).save()];
                    case 1:
                        commentData = _b.sent();
                        return [2 /*return*/, commentData];
                }
            });
        });
    };
    //delete comment
    BlogLogic.prototype.deleteComment = function (_a) {
        var commentId = _a.commentId;
        return __awaiter(this, void 0, void 0, function () {
            var commentData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1.CommentSchema.findByIdAndDelete(commentId)];
                    case 1:
                        commentData = _b.sent();
                        return [2 /*return*/, commentData];
                }
            });
        });
    };
    //get comment
    BlogLogic.prototype.getComments = function (_a) {
        var blogId = _a.blogId, commentId = _a.commentId, limit = _a.limit, chunk = _a.chunk;
        return __awaiter(this, void 0, void 0, function () {
            var query, commentData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = { blogId: blogId, commentId: commentId };
                        !blogId && delete query.blogId;
                        !commentId && delete query.commentId;
                        return [4 /*yield*/, (0, helper_1.paginationHelper)({
                                model: comment_model_1.CommentSchema,
                                query: query,
                                chunk: chunk,
                                limit: limit,
                                sort: { createdAt: -1 },
                                populate: [
                                    {
                                        path: "user",
                                        select: "avatar displayName",
                                    },
                                ],
                            })];
                    case 1:
                        commentData = _b.sent();
                        return [2 /*return*/, commentData];
                }
            });
        });
    };
    BlogLogic.prototype.deleteBlog = function (blogId) {
        return __awaiter(this, void 0, void 0, function () {
            var blogData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comment_model_1.CommentSchema.deleteMany({ blog: blogId })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, blog_model_1.BlogModel.findByIdAndDelete(blogId)];
                    case 2:
                        blogData = _a.sent();
                        return [2 /*return*/, blogData];
                }
            });
        });
    };
    return BlogLogic;
}(media_logic_1.default));
exports.default = BlogLogic;
