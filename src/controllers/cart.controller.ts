import { NextFunction, Response } from "express";
import { body } from "express-validator";
import CartLogic from "../logic/cart.logic";
import { ProductModel } from "../models/product.model";
import { AuthRequest } from "../types/core";

class Cart extends CartLogic {
  /** add product to cart */
  public async addToCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const productInfo = await ProductModel.findById(req.body.product);
      if (!productInfo) throw new Error("Product not found");
      await super.addProductToCart(req);
      const cartItems =
        req.currentUser && (await super.getCartItems(req.currentUser?._id));

      res.status(200).json({
        status: "SUCCESS",
        message: "Product added to cart successfully",
        data: cartItems,
      });
    } catch (error) {
      next(error);
    }
  }

  /** remove product from cart */
  public async removeFromCart(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("remove", req.body);
      await super.removeProductFromCart(req);
      const cartItems =
        req.currentUser && (await super.getCartItems(req.currentUser?._id));

      res.status(200).json({
        status: "SUCCESS",
        message: "Product removed from cart successfully",
        data: cartItems,
      });
    } catch (error) {
      next(error);
    }
  }

  /** delete product from cart */
  public async deleteFromCart(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      switch (req.query.idOf?.toString().toUpperCase()) {
        case "PRODUCT":
          if (!req.params.cartItemId) {
            throw new Error("No product id provided");
          }
          await super.deleteProductFromCartByProductId(
            req.params.cartItemId.toString()
          );
          break;

        default:
          await super.deleteProductFromCart(req.params.cartItemId.toString());
          break;
      }
      const cartItems =
        req.currentUser && (await super.getCartItems(req.currentUser?._id));

      res.status(200).json({
        status: "SUCCESS",
        message: "Product deleted from cart successfully",
        data: cartItems,
      });
    } catch (error) {
      next(error);
    }
  }

  /** get cart items */
  public async getCartInfo(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const cartItems =
        req.currentUser && (await super.getCartItems(req.currentUser?._id));
      res.status(200).json({
        status: "SUCCESS",
        message: "Cart items retrieved successfully",
        data: cartItems,
      });
    } catch (error) {
      next(error);
    }
  }

  //TODO: ORDER CART ITEM

  public validateOrderCartItemsFields = [
    body("addressId")
      .not()
      .isEmpty()
      .withMessage("AddressId is required")
      .isString()
      .withMessage("AddressId must be a string"),
  ];
}

export default Cart;
