import { Router } from "express";
import ServiceController from "../controllers/service.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Service extends AuthenticateMiddleware {
  public router: Router;
  private serviceController: ServiceController;

  constructor() {
    super();
    this.router = Router();
    this.serviceController = new ServiceController();
    this.createServiceRoute();
    this.updateServiceRoute();
    this.getServiceRoute();
    this.getAllServiceRoute();
    this.deleteServiceRoute();
  }

  // create user
  private createServiceRoute(): void {
    this.router.post(
      "/service",
      super.isAuthenticated,
      this.serviceController.validateCreateServiceFields,
      this.serviceController.createService
    );
  }

  // update service
  private updateServiceRoute(): void {
    this.router.put(
      "/service/:serviceId",
      super.isAuthenticated,
      this.serviceController.updateService
    );
  }

  // get service
  private getServiceRoute(): void {
    this.router.get("/service/:serviceId", this.serviceController.getService);
  }

  // get my categories
  private getAllServiceRoute(): void {
    this.router.get("/services", this.serviceController.getAllService);
  }

  // delete service
  private deleteServiceRoute(): void {
    this.router.delete(
      "/service/:serviceId",
      super.isAuthenticated,
      this.serviceController.deleteService
    );
  }
}

export default Service;
