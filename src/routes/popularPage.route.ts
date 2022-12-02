import { Router } from "express";
import {
  PopularPageController,
  PopularPageControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class PopularPageRoutes extends AuthenticateMiddleware {
  public router: Router;
  private popularPageController: PopularPageController;

  constructor() {
    super();
    this.router = Router();
    this.popularPageController = new PopularPageController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/popular-page/create-and-update",
      super.isAuthenticated,
      PopularPageControllerValidation.createAndUpdate,
      this.popularPageController.createAndUpdate
    );
  }
}
