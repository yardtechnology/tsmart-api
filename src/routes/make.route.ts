import { Router } from "express";
import { MakeController, MakeControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class MakeRoutes extends AuthenticateMiddleware {
  public router: Router;
  private makeController: MakeController;

  constructor() {
    super();
    this.router = Router();
    this.makeController = new MakeController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/make/create-and-update",
      super.isAuthenticated,
      MakeControllerValidation.createAndUpdate,
      this.makeController.createAndUpdate
    );
    // get all
    this.router.get(
      "/make",
      // super.isAuthenticated,
      MakeControllerValidation.getAll,
      this.makeController.getAll
    );
    // remove serviceType
    this.router.put(
      "/make/remove-service-type/:makeId",
      // super.isAuthenticated,
      MakeControllerValidation.removeServiceType,
      this.makeController.removeServiceType
    );
  }
}
