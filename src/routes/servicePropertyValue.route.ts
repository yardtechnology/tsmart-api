import { Router } from "express";
import {
  ServicePropertyValueController,
  ServicePropertyValueControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class ServicePropertyValueRoutes extends AuthenticateMiddleware {
  public router: Router;
  private servicePropertyValueController: ServicePropertyValueController;

  constructor() {
    super();
    this.router = Router();
    this.servicePropertyValueController = new ServicePropertyValueController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/service-property-value/",
      super.isAuthenticated,
      ServicePropertyValueControllerValidation.create,
      this.servicePropertyValueController.create
    );
    // get all
    this.router.get(
      "/service-property-value/:servicePrice/:serviceProperty",
      super.isAuthenticated,
      ServicePropertyValueControllerValidation.getAll,
      this.servicePropertyValueController.getAll
    );
    // update
    this.router.put(
      "/service-property-value/:servicePropertyValueId",
      super.isAuthenticated,
      ServicePropertyValueControllerValidation.update,
      this.servicePropertyValueController.update
    );
    // delete
    this.router.delete(
      "/service-property-value/:servicePropertyValueId",
      super.isAuthenticated,
      ServicePropertyValueControllerValidation.delete,
      this.servicePropertyValueController.delete
    );
  }
}
