import { Router } from "express";
import {
  WarrantyController,
  WarrantyControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class WarrantyRoutes extends AuthenticateMiddleware {
  public router: Router;
  private warrantyController: WarrantyController;

  constructor() {
    super();
    this.router = Router();
    this.warrantyController = new WarrantyController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/support/",
      super.isAuthenticated,
      WarrantyControllerValidation.create,
      this.warrantyController.create
    );
    // get all
    this.router.get(
      "/support",
      super.isAuthenticated,
      WarrantyControllerValidation.getAll,
      this.warrantyController.getAll
    );

    // delete
    this.router.delete(
      "/support/:supportId",
      super.isAuthenticated,
      WarrantyControllerValidation.delete,
      this.warrantyController.delete
    );
  }
}
