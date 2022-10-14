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
    this.createServicePriceRoute();
    this.updateServicePriceRoute();
    this.getServicePriceRoute();
    this.getAllServicePriceRoute();
    this.deleteServicePriceRoute();
    this.getServicePriceByModelRoute();
  }

  // create service price
  private createServicePriceRoute(): void {
    this.router.post(
      "/service-price",
      super.isManager,
      this.servicePriceController.validateCreateServicePriceFields,
      this.servicePriceController.createServicePrice
    );
  }

  // update servicePrice
  private updateServicePriceRoute(): void {
    this.router.put(
      "/service-price/:servicePriceId",
      super.isAuthenticated,
      this.servicePriceController.updateServicePrice
    );
  }

  // get servicePrice
  private getServicePriceRoute(): void {
    this.router.get(
      "/service-price/:servicePriceId",
      this.servicePriceController.getServicePrice
    );
  }

  // get all service price
  private getAllServicePriceRoute(): void {
    this.router.get(
      "/service-prices",
      this.servicePriceController.getAllServicePrice
    );
  }

  // delete servicePrice
  private deleteServicePriceRoute(): void {
    this.router.delete(
      "/service-price/:servicePriceId",
      super.isAuthenticated,
      this.servicePriceController.deleteServicePrice
    );
  }
  // get servicePrice by make
  private getServicePriceByModelRoute(): void {
    this.router.get(
      "/service-prices/:modelId",
      this.servicePriceController.getServicePricesByModel
    );
  }
}

export default ServicePrice;
