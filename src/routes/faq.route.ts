import { Router } from "express";
import FAQController from "../controllers/faq.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class FAQ extends AuthenticateMiddleware {
  public router: Router;
  private faqController: FAQController;

  constructor() {
    super();
    this.router = Router();
    this.faqController = new FAQController();
    this.addFAQRoute();
    this.updateFAQRoute();
    this.deleteFAQRoute();
    this.getMyFAQRoute();
  }

  // add to faq
  private addFAQRoute(): void {
    this.router.post(
      "/faq",
      super.isAdmin,
      this.faqController.validateCreateFAQ,
      this.faqController.createFAQController
    );
  }
  // add to faq
  private updateFAQRoute(): void {
    this.router.put(
      "/faq/:faqId",
      super.isAdmin,
      this.faqController.validateUpdateFAQ,
      this.faqController.updateFAQController
    );
  }

  // delete faq
  private deleteFAQRoute(): void {
    this.router.delete(
      "/faq/:FAQId",
      super.isAdmin,
      this.faqController.deleteFAQController
    );
  }

  // get all faq
  private getMyFAQRoute(): void {
    this.router.get("/faqs", this.faqController.getAllFAQController);
  }
}

export default FAQ;
