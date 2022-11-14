import { Router } from "express";
import { VisitorController, VisitorControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class VisitorRoutes extends AuthenticateMiddleware {
  public router: Router;
  private visitorController: VisitorController;

  constructor() {
    super();
    this.router = Router();
    this.visitorController = new VisitorController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/visitor",
      super.isAuthenticated,
      VisitorControllerValidation.createAndUpdate,
      this.visitorController.createAndUpdate
    );

    // get all
    this.router.get(
      "/visitor",
      super.isAuthenticated,
      this.visitorController.getAll
    );
  }
}
