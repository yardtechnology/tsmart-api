import { Router } from "express";
import { ReviewController, ReviewControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class ReviewRoutes extends AuthenticateMiddleware {
  public router: Router;
  private reviewController: ReviewController;

  constructor() {
    super();
    this.router = Router();
    this.reviewController = new ReviewController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/review/",
      super.isAuthenticated,
      ReviewControllerValidation.create,
      this.reviewController.create
    );
    // get all
    this.router.get(
      "/review",
      // super.isAuthenticated,

      this.reviewController.getAll
    );

    // delete
    this.router.delete(
      "/review/:reviewId",
      super.isAuthenticated,
      ReviewControllerValidation.delete,
      this.reviewController.deleteData
    );
  }
}
