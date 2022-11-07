import { Router } from "express";
import { ModelController, ModelControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class ModelRoutes extends AuthenticateMiddleware {
  public router: Router;
  private modelController: ModelController;

  constructor() {
    super();
    this.router = Router();
    this.modelController = new ModelController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/model/create-and-update",
      super.isAuthenticated,
      ModelControllerValidation.createAndUpdate,
      this.modelController.createAndUpdate
    );
    // get all
    this.router.get(
      "/model",
      super.isAuthenticated,
      ModelControllerValidation.getAll,
      this.modelController.getAll
    );
    // remove serviceType
    this.router.put(
      "/model/remove-service-type/:modelId",
      super.isAuthenticated,
      ModelControllerValidation.removeServiceType,
      this.modelController.removeServiceType
    );
  }
}
