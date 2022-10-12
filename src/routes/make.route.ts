import { Router } from "express";
import { MakeController, MakeControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class MakeRoutes extends AuthenticateMiddleware {
  public router: Router;
  private makeController: MakeController;

  constructor() {
    super();
    this.router = Router();
    this.makeController = new MakeController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/make/",
      super.isAuthenticated,
      MakeControllerValidation.create,
      this.makeController.create
    );
    // get all
    this.router.get(
      "/make",
      super.isAuthenticated,

      this.makeController.getAll
    );
    // update
    this.router.put(
      "/make/:makeId",
      // super.isAuthenticated,
      MakeControllerValidation.update,
      this.makeController.update
    );
    // delete
    this.router.delete(
      "/make/:makeId",
      super.isAuthenticated,
      MakeControllerValidation.delete,
      this.makeController.deleteData
    );
  }
}
