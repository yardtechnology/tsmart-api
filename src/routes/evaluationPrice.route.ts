import { Router } from "express";
import {
  EvaluationPriceController,
  EvaluationPriceControllerValidation,
} from "../controllers";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

export default class EvaluationRoutes extends AuthenticateMiddleware {
  public router: Router;
  private evaluationPriceController: EvaluationPriceController;

  constructor() {
    super();
    this.router = Router();
    this.evaluationPriceController = new EvaluationPriceController();
    this.routes();
  }
  private routes() {
    // create
    this.router.post(
      "/evaluationPrice/",
      super.isAuthenticated,
      EvaluationPriceControllerValidation.create,
      this.evaluationPriceController.create
    );
    // get all
    this.router.get(
      "/evaluationPrice",
      super.isAuthenticated,

      this.evaluationPriceController.getAll
    );
    // update
    this.router.put(
      "/evaluationPrice/:evaluationId",
      super.isAuthenticated,
      EvaluationPriceControllerValidation.update,
      this.evaluationPriceController.update
    );
    // delete
    this.router.delete(
      "/evaluationPrice/:evaluationPriceId",
      super.isAuthenticated,
      EvaluationPriceControllerValidation.delete,
      this.evaluationPriceController.deleteData
    );
  }
}
