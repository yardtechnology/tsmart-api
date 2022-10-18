import { Router } from "express";
import { CouponController, CouponControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class CouponRoutes extends AuthenticateMiddleware {
  public router: Router;
  private couponController: CouponController;

  constructor() {
    super();
    this.router = Router();
    this.couponController = new CouponController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/coupon/",
      super.isAuthenticated,
      CouponControllerValidation.create,
      this.couponController.create
    );
    // get all
    this.router.get(
      "/coupon",
      CouponControllerValidation.getAll,
      super.isAuthenticated,

      this.couponController.getAll
    );
    // update
    this.router.put(
      "/coupon/:couponId",
      super.isAuthenticated,
      CouponControllerValidation.update,
      this.couponController.update
    );
    // delete
    this.router.delete(
      "/coupon/:couponId",
      super.isAuthenticated,
      CouponControllerValidation.delete,
      this.couponController.deleteData
    );
  }
}
