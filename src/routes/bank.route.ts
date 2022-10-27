import { Router } from "express";
import BankController from "../controllers/bank.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Bank extends AuthenticateMiddleware {
  public router: Router;
  private bankController: BankController;

  constructor() {
    super();
    this.router = Router();
    this.bankController = new BankController();
    this.createBankRoute();
    this.getBankRoute();
    this.deleteBankRoute();
  }

  // create bank
  private createBankRoute(): void {
    this.router.post(
      "/bank",
      super.isAuthenticated,
      this.bankController.validateUpdateBankFields,
      this.bankController.createBank
    );
  }

  // get bank
  private getBankRoute(): void {
    this.router.get(
      "/bank",
      super.isAuthenticated,
      this.bankController.getBank
    );
  }

  // delete bank
  private deleteBankRoute(): void {
    this.router.delete(
      "/bank",
      super.isAuthenticated,
      this.bankController.deleteBank
    );
  }
}

export default Bank;
