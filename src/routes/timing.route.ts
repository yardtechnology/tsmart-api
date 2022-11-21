import { Router } from "express";
import { TimingController, TimingControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class TimingRoutes extends AuthenticateMiddleware {
  public router: Router;
  private timingController: TimingController;

  constructor() {
    super();
    this.router = Router();
    this.timingController = new TimingController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/timing/",
      super.isAuthenticated,
      TimingControllerValidation.createAndUpdate,
      this.timingController.createAndUpdate
    );

    // get in specific day with single store
    this.router.get(
      "/timing/:storeId",
      super.isAuthenticated,
      this.timingController.userGetStoreLeftBookingList
    );
    // get timing of specific store and
  }
}
