import { Router } from "express";
import ModelController from "../controllers/model.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Model extends AuthenticateMiddleware {
  public router: Router;
  private modelController: ModelController;

  constructor() {
    super();
    this.router = Router();
    this.modelController = new ModelController();
    this.createModelRoute();
    this.updateModelRoute();
    this.getModelRoute();
    this.getAllModelRoute();
    this.deleteModelRoute();
  }

  // create user
  private createModelRoute(): void {
    this.router.post(
      "/model",
      super.isAuthenticated,
      this.modelController.validateCreateModelFields,
      this.modelController.createModel
    );
  }

  // update model
  private updateModelRoute(): void {
    this.router.put(
      "/model/:modelId",
      super.isAuthenticated,
      this.modelController.updateModel
    );
  }

  //TODO: GET PRODUCTS BY CATEGORY

  // get model
  private getModelRoute(): void {
    this.router.get(
      "/model/:modelId",
      super.isAuthenticated,
      this.modelController.getModel
    );
  }

  // get my categories
  private getAllModelRoute(): void {
    this.router.get("/categories", this.modelController.getAllModel);
  }

  // delete model
  private deleteModelRoute(): void {
    this.router.delete(
      "/model/:modelId",
      super.isAuthenticated,
      this.modelController.deleteModel
    );
  }
}

export default Model;
