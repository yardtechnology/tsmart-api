import { Router } from "express";
import { SupportController, SupportControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class SupportRoutes extends AuthenticateMiddleware {
  public router: Router;
  private supportController: SupportController;

  constructor() {
    super();
    this.router = Router();
    this.supportController = new SupportController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/support/",
      super.isAuthenticated,
      SupportControllerValidation.create,
      this.supportController.create
    );
    // get all
    this.router.get(
      "/support",
      super.isAuthenticated,
      SupportControllerValidation.getAll,
      this.supportController.getAll
    );

    // delete
    this.router.delete(
      "/support/:supportId",
      super.isAuthenticated,
      SupportControllerValidation.delete,
      this.supportController.delete
    );
  }
}
