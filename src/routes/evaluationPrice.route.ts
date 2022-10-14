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
      "/evaluation-price/",
      super.isAuthenticated,
      EvaluationPriceControllerValidation.create,
      this.evaluationPriceController.create
    );
    // get all
    this.router.get(
      "/evaluation-price",
      super.isAuthenticated,

      this.evaluationPriceController.getAll
    );
    // update
    this.router.put(
      "/evaluation-price/:evaluationPriceId",
      super.isAuthenticated,
      EvaluationPriceControllerValidation.update,
      this.evaluationPriceController.update
    );
    // delete
    this.router.delete(
      "/evaluation-price/:evaluationPriceId",
      super.isAuthenticated,
      EvaluationPriceControllerValidation.delete,
      this.evaluationPriceController.deleteData
    );
  }
}
