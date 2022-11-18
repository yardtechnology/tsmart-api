import { NextFunction, Response } from "express";
import { OrderModel } from "../models/order.model";
import { AuthRequest } from "../types/core";

class UserDashboardController {
  async repairerStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const totalRepairerStatus = await OrderModel.aggregate([]);
    } catch (error) {
      next(error);
    }
  }
}

export default UserDashboardController;
