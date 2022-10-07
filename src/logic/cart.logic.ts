import { Types } from "mongoose";
import { CartItemModel } from "../models/cartItem.model";
import CartItemType from "../types/cartItem";
import { AuthRequest } from "../types/core";

class CartLogic {
  public _cartId: string | undefined;
  constructor(id?: string) {
    this._cartId = id;
  }

  /** add product to cart */
  public async addProductToCart(req: AuthRequest): Promise<CartItemType> {
    return new Promise(async (resolve, reject) => {
      try {
        // check if quantity is greater than 0
        if (Number(req.body.quantity) <= 0)
          throw new Error("Quantity must be greater than 0");

        const cartItem = await CartItemModel.findOneAndUpdate(
          {
            user: req.currentUser?._id,
            product: req.body.product,
          },
          {
            product: req.body.product,
            $inc: { quantity: Number(req.body?.quantity) },
            user: req.currentUser?._id,
          },
          {
            new: true,
            upsert: true,
          }
        );
        resolve(cartItem);
      } catch (error) {
        reject(error);
      }
    });
  }

  /** get cart items */
  public async getCartItems(userId?: string): Promise<{
    subTotal: number;
    totalItem: number;
    products: CartItemType[];
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const cartItems = await CartItemModel.aggregate([
          { $match: { user: new Types.ObjectId(userId) } },
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $project: {
              _id: 1,
              product: 1,
              quantity: 1,
              total: { $multiply: ["$product.salePrice", "$quantity"] },
            },
          },
          {
            $group: {
              _id: null,
              subTotal: {
                $sum: { $multiply: ["$product.salePrice", "$quantity"] },
              },
              mrp: {
                $sum: { $multiply: ["$product.mrp", "$quantity"] },
              },
              totalItem: { $sum: 1 },
              products: {
                $push: {
                  product: "$product",
                  quantity: "$quantity",
                  total: "$total",
                  _id: "$_id",
                },
              },
            },
          },
          {
            $addFields: {
              discount: { $subtract: ["$mrp", "$subTotal"] },
            },
          },
          { $project: { _id: 0 } },
        ]);
        if (!cartItems.length) throw new Error("No items in cart");
        resolve(cartItems[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  /** remove from cart */
  public async removeProductFromCart(req: AuthRequest): Promise<CartItemType> {
    return new Promise(async (resolve, reject) => {
      try {
        // check if quantity is smaller than 0
        if (Number(req.body.quantity) >= 0)
          throw new Error("Quantity must be less than 0");
        const cartItem = await CartItemModel.findOneAndUpdate(
          {
            user: req.currentUser?._id,
            product: req.body.product,
          },
          {
            $inc: { quantity: Number(req.body?.quantity) },
            user: req.currentUser?._id,
          },
          {
            new: true,
            upsert: true,
          }
        );
        // check if cart item is empty
        if (cartItem.quantity <= 0) {
          // delete cart item
          await CartItemModel.findByIdAndDelete(cartItem._id);
        }
        resolve(cartItem);
      } catch (error) {
        reject(error);
      }
    });
  }

  /** delete from cart */
  public async deleteProductFromCart(
    cartItemId: string
  ): Promise<CartItemType> {
    return new Promise(async (resolve, reject) => {
      try {
        const cartItem = await CartItemModel.findByIdAndDelete(cartItemId);
        if (!cartItem)
          throw new Error(
            "Unable to delete product from cart or cart item does not exist"
          );
        resolve(cartItem);
      } catch (error) {
        reject(error);
      }
    });
  }

  /** delete from cart */
  public async deleteProductFromCartByProductId(
    productId: string
  ): Promise<CartItemType> {
    return new Promise(async (resolve, reject) => {
      try {
        const cartItem = await CartItemModel.findOneAndDelete({
          product: productId,
        });
        if (!cartItem)
          throw new Error(
            "Unable to delete product from cart or cart item does not exist"
          );
        resolve(cartItem);
      } catch (error) {
        reject(error);
      }
    });
  }

  //TODO: ORDER CART ITEM
}

export default CartLogic;
