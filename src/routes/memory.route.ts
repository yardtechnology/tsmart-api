import { Router } from "express";
import { MemoryController, MemoryControllerValidation } from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class memoryRoutes extends AuthenticateMiddleware {
  public router: Router;
  private memoryController: MemoryController;

  constructor() {
    super();
    this.router = Router();
    this.memoryController = new MemoryController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/memory/",
      super.isAuthenticated,
      MemoryControllerValidation.create,
      this.memoryController.create
    );
    // get all
    this.router.get(
      "/memory",
      MemoryControllerValidation.getAll,
      super.isAuthenticated,

      this.memoryController.getAll
    );
    // update
    this.router.put(
      "/memory/:memoryId",
      super.isAuthenticated,
      MemoryControllerValidation.update,
      this.memoryController.update
    );
    // delete
    this.router.delete(
      "/memory/:memoryId",
      super.isAuthenticated,
      MemoryControllerValidation.delete,
      this.memoryController.delete
    );
  }
}
