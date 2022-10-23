import { Router } from "express";
import {
  NotificationController,
  NotificationControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class NotificationRoutes extends AuthenticateMiddleware {
  public router: Router;
  private NotificationController: NotificationController;

  constructor() {
    super();
    this.router = Router();
    this.NotificationController = new NotificationController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/notification/",
      super.isAuthenticated,
      NotificationControllerValidation.create,
      this.NotificationController.create
    );
    // get all
    this.router.get(
      "/notification",
      super.isAuthenticated,
      NotificationControllerValidation.getAll,
      this.NotificationController.getAll
    );
    // update
    this.router.put(
      "/notification",
      super.isAuthenticated,
      NotificationControllerValidation.update,
      this.NotificationController.update
    );
    // delete
    this.router.delete(
      "/notification",
      super.isAuthenticated,
      NotificationControllerValidation.delete,
      this.NotificationController.delete
    );
  }
}
