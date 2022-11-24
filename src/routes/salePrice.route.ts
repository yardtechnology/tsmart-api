import { Router } from "express";
import {
  SalePriceController,
  SalePriceControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class SalePriceRoutes extends AuthenticateMiddleware {
  public router: Router;
  private salePriceController: SalePriceController;

  constructor() {
    super();
    this.router = Router();
    this.salePriceController = new SalePriceController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/sale-price/create",
      super.isAuthenticated,
      SalePriceControllerValidation.createAndUpdate,
      this.salePriceController.create
    );
    // get all
    this.router.get(
      "/sale-price/:modelId",
      SalePriceControllerValidation.getAll,
      super.isAuthenticated,

      this.salePriceController.getAll
    );
    // delete
    this.router.delete(
      "/sale-price/:_id",
      super.isAuthenticated,
      SalePriceControllerValidation.delete,
      this.salePriceController.delete
    );
    // sale summery
    this.router.post(
      "/sale-price/sale-summery",
      super.isAuthenticated,
      SalePriceControllerValidation.saleSummery,
      this.salePriceController.saleSummery
    );
  }
}
