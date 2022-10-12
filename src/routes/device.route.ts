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
      "/device/",
      super.isAuthenticated,
      DeviceControllerValidation.create,
      this.deviceController.create
    );
    // get all
    this.router.get(
      "/device",
      super.isAuthenticated,

      this.deviceController.getAll
    );
    // update
    this.router.put(
      "/device/:deviceId",
      super.isAuthenticated,
      DeviceControllerValidation.update,
      this.deviceController.update
    );
    // delete
    this.router.delete(
      "/device/:deviceId",
      super.isAuthenticated,
      DeviceControllerValidation.delete,
      this.deviceController.deleteData
    );
  }
}
