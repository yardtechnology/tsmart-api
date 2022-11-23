import { Router } from "express";
import ServicePriceController, {
  ServicePriceControllerValidation,
} from "../controllers/servicePrice.controller";
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
      "/service-price/total-price",
      // super.isManager,
      super.isAuthenticated,
      ServicePriceControllerValidation.createServicePrice,
      this.servicePriceController.createServicePrice
    );
    this.router.post(
      "/service-price",
      // super.isManager,
      super.isAuthenticated,
      ServicePriceControllerValidation.createServicePrice,
      this.servicePriceController.createServicePrice
    );

    this.router.put(
      "/service-price/:servicePriceId",
      super.isAuthenticated,
      this.servicePriceController.updateServicePrice
    );
    this.router.get(
      "/service-prices/:model",
      super.isAuthenticated,
      ServicePriceControllerValidation.getAllServicePrice,
      this.servicePriceController.getAllServicePrice
    );
    this.router.get(
      "/service-price/one/:servicePriceId",
      this.servicePriceController.getServicePrice
    );

    this.router.post(
      "/service-price/summery",
      super.isAuthenticated,
      ServicePriceControllerValidation.serviceSummery,
      this.servicePriceController.serviceSummery
    );

    this.router.delete(
      "/service-price/:servicePriceId",
      super.isAuthenticated,
      this.servicePriceController.deleteServicePrice
    );
  }
}

export default ServicePrice;
