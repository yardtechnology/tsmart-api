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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var blog_controller_1 = __importDefault(require("../controllers/blog.controller"));
var authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
var Blog = /** @class */ (function (_super) {
    __extends(Blog, _super);
    function Blog() {
        var _this = _super.call(this) || this;
        _this.router = (0, express_1.Router)();
        _this.BlogController = new blog_controller_1.default();
        _this.createBlogRoute();
        _this.updateBlogRoute();
        _this.getAllBlogsRoute();
        _this.deleteBlogRoute();
        _this.getBlogRoute();
        _this.addCommentRoute();
        _this.getCommentsRoute();
        _this.deleteCommentRoute();
        return _this;
    }
    //create blog
    Blog.prototype.createBlogRoute = function () {
        this.router.post("/blog", _super.prototype.isAdmin, this.BlogController.validateCreateBlogFields, this.BlogController.createBlogController);
    };
    //update blog
    Blog.prototype.updateBlogRoute = function () {
        this.router.put("/blog/:blogId", _super.prototype.isAdmin, this.BlogController.validateUpdateBlogFields, this.BlogController.updateBlogController);
    };
    //get blog
    Blog.prototype.getBlogRoute = function () {
        this.router.get("/blog/:blogId", this.BlogController.getBlogByIdController);
    };
    //add comment
    Blog.prototype.addCommentRoute = function () {
        this.router.post("/blog/:blogId/comment", this.isAuthenticated, this.BlogController.addCommentController);
    };
    //delete comment
    Blog.prototype.deleteCommentRoute = function () {
        this.router.delete("/blog/:blogId/comment/:commentId", this.isAuthenticated, this.BlogController.deleteCommentController);
    };
    //get comments
    Blog.prototype.getCommentsRoute = function () {
        this.router.get("/blogs/comments", this.isAuthenticated, this.BlogController.validateGetBlogCommentsFields, this.BlogController.getCommentsController);
    };
    //get all blogs
    Blog.prototype.getAllBlogsRoute = function () {
        this.router.get("/blogs", this.BlogController.getAllBlogsController);
    };
    //delete blog
    Blog.prototype.deleteBlogRoute = function () {
        this.router.delete("/blog/:blogId", _super.prototype.isAdmin, this.BlogController.deleteBlogController);
    };
    return Blog;
}(authenticate_middleware_1.default));
exports.default = Blog;
