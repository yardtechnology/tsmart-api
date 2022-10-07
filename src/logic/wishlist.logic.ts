import { Types } from "mongoose";
import paginationHelper, {
  PaginationResult,
} from "../helper/pagination.helper";
import { CartItemModel } from "../models/cartItem.model";
import { WishListModel } from "../models/wishlist.model";
import WishListType from "../types/wishlist";

class WishListLogic {
  /**
   * add to wishlist
   * @param Props { user: string, product: string }
   * @returns Promise<WishListType>
   */
  public add(Props: {
    userId?: string;
    productId: string;
  }): Promise<WishListType> {
    return new Promise<WishListType>(async (resolve, reject) => {
      try {
        const userData: WishListType | null = await new WishListModel({
          user: Props.userId,
          product: Props.productId,
        }).save();
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * remove from wishlist
   * @param {string} wishListId
   * @returns Promise<WishListType>
   */
  public remove(productId: string): Promise<WishListType> {
    return new Promise<WishListType>(async (resolve, reject) => {
      try {
        const wishlist = await WishListModel.findOneAndDelete({
          product: productId,
        });
        if (!wishlist) throw new Error("Wishlist not found");
        resolve(wishlist);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * get one users wishlist
   * @param {string} userId
   */
  public getAll({
    userId,
    limit,
    chunk,
  }: {
    userId?: string;
    limit?: number;
    chunk?: number;
  }): Promise<PaginationResult<WishListType>> {
    return new Promise(async (resolve, reject) => {
      try {
        const wishlist = await paginationHelper<WishListType>({
          model: WishListModel,
          query: { user: userId },
          limit,
          chunk,
          populate: ["product"],
          sort: { createdAt: -1 },
        });
        if (!wishlist) throw new Error("Wishlist not found");
        resolve(wishlist);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * get one users wishlist
   * @param {string} userId
   */
  public getAllWishlistOptimized({
    userId,
    limit = 100,
    chunk = 0,
  }: {
    userId?: string;
    limit?: number;
    chunk?: number;
  }): Promise<PaginationResult<WishListType>> {
    return new Promise(async (resolve, reject) => {
      try {
        const cartItemData: { product: string }[] = await CartItemModel.find({
          user: userId,
        }).populate("product");
        //store all wishlist product ids in an array
        const allCartItemArray: any = cartItemData.map(
          (wishList) => new Types.ObjectId(wishList.product)
        );
        const wishlists = await WishListModel.aggregate([
          {
            $match: {
              user: new Types.ObjectId(userId),
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $unwind: {
              path: "$product",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              "product.isInCart": {
                $cond: [
                  {
                    $toBool: { $in: ["$product._id", allCartItemArray] },
                  },
                  true,
                  false,
                ],
              },
            },
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $skip: chunk * limit,
          },
          {
            $limit: limit + 1,
          },
        ]);
        const totalLength = wishlists.length;
        if (totalLength > Number(limit)) wishlists.pop();
        resolve({
          data: wishlists,
          isLastChunk: !(totalLength > Number(limit)),
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default WishListLogic;
