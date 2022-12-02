import { Router } from "express";
import {
  ServicePropertyController,
  ServicePropertyControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class ServicePropertyRoutes extends AuthenticateMiddleware {
  public router: Router;
  private servicePropertyController: ServicePropertyController;

  constructor() {
    super();
    this.router = Router();
    this.servicePropertyController = new ServicePropertyController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/service-property/",
      super.isAuthenticated,
      ServicePropertyControllerValidation.create,
      this.servicePropertyController.create
    );
    // get all
    this.router.get(
      "/service-property/:service",
      // super.isAuthenticated,
      ServicePropertyControllerValidation.getAll,
      this.servicePropertyController.getAll
    );
    // update
    this.router.put(
      "/service-property/:servicePropertyId",
      // super.isAuthenticated,
      ServicePropertyControllerValidation.update,
      this.servicePropertyController.update
    );
    // delete
    this.router.delete(
      "/service-property/:servicePropertyId",
      super.isAuthenticated,
      ServicePropertyControllerValidation.delete,
      this.servicePropertyController.delete
    );
  }
}
