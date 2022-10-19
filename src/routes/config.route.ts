import { Router } from "express";
import { ConfigController, ConfigControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class ConfigRoutes extends AuthenticateMiddleware {
  public router: Router;
  private configController: ConfigController;
  constructor() {
    super();
    this.router = Router();
    this.configController = new ConfigController();
    this.routes();
  }
  private routes() {
    // create
    this.router.put(
      "/config/",
      super.isAuthenticated,
      ConfigControllerValidation.create,
      this.configController.createAndUpdate
    );
    // get all
    this.router.get(
      "/config",
      super.isAuthenticated,
      this.configController.getAll
    );
  }
}
