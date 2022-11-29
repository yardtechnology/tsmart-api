import { NextFunction, Response } from "express";
import WishListLogic from "../logic/wishlist.logic";
import { AuthRequest } from "../types/core";

class WishList extends WishListLogic {
  // add to wishlist
  public async addToWishList(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { productId } = req.body;
      const wishlist = await super.add({
        userId: req.currentUser?._id,
        productId,
      });
      res.status(200).json({
        status: "SUCCESS",
        message: "Product added to wishlist",
        data: wishlist,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  /**
   * remove from wishlist
   * @param req
   * @param res
   * @param next
   */
  public async removeFromWishList(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { productId } = req.params;
      const wishlist = await super.remove(productId);
      res.status(200).json({
        status: "SUCCESS",
        message: "Product removed from wishlist",
        data: wishlist,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }

  /**
   * get my wishlist
   * @param req
   * @param res
   * @param next
   */
  public async getMyWishList(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let wishlist;
      switch (req.query?.resData) {
        case "optimized":
          wishlist = await super.getAllWishlistOptimized({
            userId: req.currentUser?._id,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
          });
          break;

        default:
          wishlist = await super.getAll({
            userId: req.currentUser?._id,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            chunk: req.query.chunk ? Number(req.query.chunk) : undefined,
          });
          break;
      }
      res.status(200).json({
        status: "SUCCESS",
        message: "Wishlist retrieved successfully",
        data: wishlist,
      });
    } catch (error) {
      // send error to client
      next(error);
    }
  }
}

export default WishList;
