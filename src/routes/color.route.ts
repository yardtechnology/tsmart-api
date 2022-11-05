import { Router } from "express";
import { ColorController, ColorControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class colorRoutes extends AuthenticateMiddleware {
  public router: Router;
  private colorController: ColorController;

  constructor() {
    super();
    this.router = Router();
    this.colorController = new ColorController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/color/",
      super.isAuthenticated,
      ColorControllerValidation.create,
      this.colorController.create
    );
    // get all
    this.router.get(
      "/color",
      ColorControllerValidation.getAll,
      super.isAuthenticated,

      this.colorController.getAll
    );
    // update
    this.router.put(
      "/color/:colorId",
      super.isAuthenticated,
      ColorControllerValidation.update,
      this.colorController.update
    );
    // delete
    this.router.delete(
      "/color/:colorId",
      super.isAuthenticated,
      ColorControllerValidation.delete,
      this.colorController.delete
    );
  }
}
