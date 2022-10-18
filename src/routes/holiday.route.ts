import { Router } from "express";
import HolidayController from "../controllers/holiday.controller";
import AuthenticateMiddleware from "../middleware/authenticate.middleware";

class Holiday extends AuthenticateMiddleware {
  public router: Router;
  private holidayController: HolidayController;

  constructor() {
    super();
    this.router = Router();
    this.holidayController = new HolidayController();
    this.addHolidayRoute();
    this.updateHolidayRoute();
    this.deleteHolidayRoute();
    this.getMyHolidayRoute();
  }

  // add to holiday
  private addHolidayRoute(): void {
    this.router.post(
      "/holiday",
      super.isAdmin,
      this.holidayController.validateCreateHoliday,
      this.holidayController.createHolidayController
    );
  }
  // add to holiday
  private updateHolidayRoute(): void {
    this.router.put(
      "/holiday/:HolidayId",
      super.isAdmin,
      this.holidayController.validateUpdateHoliday,
      this.holidayController.updateHolidayController
    );
  }

  // delete holiday
  private deleteHolidayRoute(): void {
    this.router.delete(
      "/holiday/:HolidayId",
      super.isAdmin,
      this.holidayController.deleteHolidayController
    );
  }

  // get all holiday
  private getMyHolidayRoute(): void {
    this.router.get(
      "/holidays",
      this.holidayController.getAllHolidayController
    );
  }
}

export default Holiday;
