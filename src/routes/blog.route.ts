import { Router } from "express";
import BlogController from "../controllers/blog.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Blog extends AuthenticateMiddleware {
  public router: Router;
  private BlogController: BlogController;

  constructor() {
    super();
    this.router = Router();
    this.BlogController = new BlogController();
    this.createBlogRoute();
    this.updateBlogRoute();
    this.getAllBlogsRoute();
    this.deleteBlogRoute();
    this.getBlogRoute();
    this.addCommentRoute();
    this.getCommentsRoute();
    this.deleteCommentRoute();
  }

  //create blog
  private createBlogRoute(): void {
    this.router.post(
      "/blog",
      super.isAdmin,
      this.BlogController.validateCreateBlogFields,
      this.BlogController.createBlogController
    );
  }

  //update blog
  private updateBlogRoute(): void {
    this.router.put(
      "/blog/:blogId",
      super.isAdmin,
      this.BlogController.validateUpdateBlogFields,
      this.BlogController.updateBlogController
    );
  }
  //get blog
  private getBlogRoute(): void {
    this.router.get("/blog/:blogId", this.BlogController.getBlogByIdController);
  }
  //add comment
  private addCommentRoute(): void {
    this.router.post(
      "/blog/:blogId/comment",
      this?.isAuthenticated,
      this.BlogController.addCommentController
    );
  }
  //delete comment
  private deleteCommentRoute(): void {
    this.router.delete(
      "/blog/:blogId/comment/:commentId",
      this?.isAuthenticated,
      this.BlogController.deleteCommentController
    );
  }
  //get comments
  private getCommentsRoute(): void {
    this.router.get(
      "/blogs/comments",
      this?.isAuthenticated,
      this?.BlogController.validateGetBlogCommentsFields,
      this.BlogController.getCommentsController
    );
  }

  //get all blogs
  private getAllBlogsRoute(): void {
    this.router.get("/blogs", this.BlogController.getAllBlogsController);
  }

  //delete blog
  private deleteBlogRoute(): void {
    this.router.delete(
      "/blog/:blogId",
      super.isAdmin,
      this.BlogController.deleteBlogController
    );
  }
}

export default Blog;
