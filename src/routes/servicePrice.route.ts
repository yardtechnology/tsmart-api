import { Router } from "express";
import ServicePriceController from "../controllers/servicePrice.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class ServicePrice extends AuthenticateMiddleware {
  public router: Router;
  private servicePriceController: ServicePriceController;

  constructor() {
    super();
    this.router = Router();
    this.servicePriceController = new ServicePriceController();
    this.routes();
  }

  // create service price

  private routes() {
    this.router.post(
      "/service-price",
      // super.isManager,
      super.isAuthenticated,
      this.servicePriceController.validateCreateServicePriceFields,
      this.servicePriceController.createServicePrice
    );

    this.router.put(
      "/service-price/:servicePriceId",
      super.isAuthenticated,
      this.servicePriceController.updateServicePrice
    );
    this.router.get(
      "/service-price/:servicePriceId",
      this.servicePriceController.getServicePrice
    );
    this.router.get(
      "/service-prices",
      this.servicePriceController.getAllServicePrice
    );
    this.router.get(
      "/service-prices/:modelId",
      this.servicePriceController.getServicePricesByModel
    );
    this.router.delete(
      "/service-price/:servicePriceId",
      super.isAuthenticated,
      this.servicePriceController.deleteServicePrice
    );
  }
}

export default ServicePrice;
