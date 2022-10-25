import { Router } from "express";
import {
  BusinessServiceController,
  BusinessServiceControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class BusinessServiceRoutes extends AuthenticateMiddleware {
  public router: Router;
  private businessServiceController: BusinessServiceController;

  constructor() {
    super();
    this.router = Router();
    this.businessServiceController = new BusinessServiceController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/business-service/",
      super.isAuthenticated,
      BusinessServiceControllerValidation.create,
      this.businessServiceController.create
    );
    // get all
    this.router.get(
      "/business-service",
      super.isAuthenticated,
      BusinessServiceControllerValidation.getAll,
      this.businessServiceController.getAll
    );

    // delete
    this.router.delete(
      "/business-service/:businessServiceId",
      super.isAuthenticated,
      BusinessServiceControllerValidation.delete,
      this.businessServiceController.deleteData
    );
  }
}
