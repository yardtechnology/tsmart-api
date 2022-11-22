import { Router } from "express";
import { DeviceController, DeviceControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class DeviceRoutes extends AuthenticateMiddleware {
  public router: Router;
  private deviceController: DeviceController;

  constructor() {
    super();
    this.router = Router();
    this.deviceController = new DeviceController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/device/create-and-update",
      super.isAuthenticated,
      DeviceControllerValidation.createAndUpdate,
      this.deviceController.createAndUpdate
    );
    // get all
    this.router.get(
      "/device",
      // super.isAuthenticated,
      DeviceControllerValidation.getAll,
      this.deviceController.getAll
    );
    // update
    this.router.put(
      "/device/remove-type/:deviceId",
      super.isAuthenticated,
      DeviceControllerValidation.removeServiceType,
      this.deviceController.removeServiceType
    );
    this.router.delete(
      "/device/delete/:deviceId",
      super.isAuthenticated,
      DeviceControllerValidation.delete,
      this.deviceController.delete
    );
  }
}
