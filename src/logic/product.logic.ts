import { Request } from "express";
import { Types } from "mongoose";
import paginationHelper, {
  PaginationResult,
} from "../helper/pagination.helper";
import { CartItemModel } from "../models/cartItem.model";
import { ProductModel } from "../models/product.model";
import { ProductStockModel } from "../models/productStock.model";
import { WishListModel } from "../models/wishlist.model";
import { ImageType } from "../types/core";
import { ProductType } from "../types/product";
import MediaLogic from "./media.logic";

class ProductLogic extends MediaLogic {
  private _productId: string | undefined;

  constructor(productId?: string) {
    super();
    this._productId = productId;
  }

  /** create a product */
  public createAProduct(req: Request): Promise<ProductType> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log({ req: req.body });
        // upload product image
        const displayImageFile = req.files?.displayImage;
        const filePath = `product`;
        const displayImageData: any | undefined =
          displayImageFile && !Array.isArray(displayImageFile)
            ? await super.uploadMedia(displayImageFile, filePath)
            : undefined;

        // upload product images
        const imagesFile = req.files?.images;
        const imageFilePath = `product`;
        const imagesData: ImageType | ImageType[] | undefined =
          imagesFile &&
          (Array.isArray(imagesFile)
            ? await super.uploadMultipleMedia(imagesFile, imageFilePath)
            : await super.uploadMedia(imagesFile, imageFilePath));

        // save product data to database
        const productData = await new ProductModel({
          title: req.body?.title,
          shortDescription: req.body?.shortDescription,
          description: req.body?.description,
          mrp: req.body?.mrp,
          salePrice: req.body?.salePrice,
          displayImage: displayImageData,
          category: req.body?.category,
          store: req.body?.storeId,
          isFeatured: req.body?.isFeatured,
          isActive: req.body?.isActive,
          stock: req.body?.stock,
          memory: req.body?.memory,
          color: req.body?.color,
          condition: req.body?.condition,
          type: req.body?.type,
          images: imagesData,
          device: req.body?.device,
          make: req.body?.make,
          model: req.body?.model,
        }).save();

        await ProductModel.findByIdAndUpdate(productData?._id, {
          variantOf: productData?._id,
        });

        // send response to client
        resolve(productData);
      } catch (error) {
        // send error to client
        reject(error);
      }
    });
  }

  /** get product variants */
  public getVariants(Id?: string): Promise<ProductType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        // get product variants
        const productData: ProductType[] = await ProductModel.find({
          variantOf: Id || this._productId,
        }).populate("category");

        // send response to client
        resolve(productData);
      } catch (error) {
        // send error to client
        reject(error);
      }
    });
  }

  /** product info */
  public getProductInfo(Id?: string): Promise<ProductType> {
    return new Promise(async (resolve, reject) => {
      try {
        const productId = Id || this._productId;
        // get product info
        const productData: any = await ProductModel.aggregate([
          {
            $match: {
              _id: new Types.ObjectId(productId),
            },
          },
          {
            $lookup: {
              from: "stores",
              localField: "store",
              foreignField: "_id",
              as: "store",
            },
          },
          { $unwind: { path: "$store", preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            },
          },
          { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: "addresses",
              localField: "store.address",
              foreignField: "_id",
              as: "store.address",
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "variantOf",
              foreignField: "variantOf",
              as: "variants",
              pipeline: [
                {
                  $match: {
                    variantOf: { $exists: true },
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              variants: {
                $cond: [{ $toBool: { $size: "$variants" } }, "$variants", []],
              },
            },
          },
        ]);

        const mainProductData = await ProductModel.findById(productId);
        if (!mainProductData) throw new Error("Product not found");

        const variants = productData[0].variants?.length
          ? productData[0].variants
          : [mainProductData];
        // send response to client
        resolve({
          ...productData[0],
          variants,
        });
      } catch (error) {
        // send error to client
        reject(error);
      }
    });
  }

  /** product info optimized */
  public getProductInfoOptimized({
    Id,
    userId,
  }: {
    Id?: string;
    userId?: string;
  }): Promise<ProductType> {
    return new Promise(async (resolve, reject) => {
      try {
        // get all wishlist products
        const wishListData: { product: string }[] = await WishListModel.find({
          user: userId,
        }).populate("product");
        //store all wishlist product ids in an array
        const allWishListArray: any = wishListData.map(
          (wishList) => new Types.ObjectId(wishList.product)
        );
        const cartItemData: { product: string }[] = await CartItemModel.find({
          user: userId,
        }).populate("product");
        //store all wishlist product ids in an array
        const allCartItemArray: any = cartItemData.map(
          (wishList) => new Types.ObjectId(wishList.product)
        );
        const productId = Id || this._productId;
        // get product info
        const productData: any = await ProductModel.aggregate([
          {
            $match: {
              _id: new Types.ObjectId(productId),
            },
          },
          {
            $lookup: {
              from: "stores",
              localField: "store",
              foreignField: "_id",
              as: "store",
            },
          },
          { $unwind: { path: "$store", preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            },
          },
          { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: "addresses",
              localField: "store.address",
              foreignField: "_id",
              as: "store.address",
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "variantOf",
              foreignField: "variantOf",
              as: "variants",
              pipeline: [
                {
                  $match: {
                    variantOf: { $exists: true },
                  },
                },
              ],
            },
          },

          {
            $lookup: {
              from: "cartitems",
              localField: "_id",
              foreignField: "product",
              as: "cartQuantity",
              pipeline: [
                {
                  $match: {
                    user: new Types.ObjectId(userId),
                  },
                },
              ],
            },
          },
          {
            $unwind: {
              path: "$cartQuantity",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              cartQuantity: "$cartQuantity.quantity",
              isInWishList: {
                $cond: [
                  {
                    $toBool: { $in: ["$_id", allWishListArray] },
                  },
                  true,
                  false,
                ],
              },
              isInCart: {
                $cond: [
                  {
                    $toBool: { $in: ["$_id", allCartItemArray] },
                  },
                  true,
                  false,
                ],
              },
              variants: {
                $cond: [{ $toBool: { $size: "$variants" } }, "$variants", []],
              },
            },
          },
        ]);

        const mainProductData = await ProductModel.findById(productId);
        if (!mainProductData) throw new Error("Product not found");

        // send response to client
        const variants = productData[0].variants?.length
          ? productData[0].variants
          : [mainProductData];
        resolve({
          ...productData[0],
          variants,
        });
      } catch (error) {
        // send error to client
        reject(error);
      }
    });
  }

  /**
   * get all product of category
   */
  public async getAllProductOfCategory({
    categoryId,
    limit,
    chunk,
    type,
  }: {
    categoryId: string;
    limit?: number;
    chunk?: number;
    type?: string;
  }): Promise<PaginationResult<ProductType>> {
    const query = {
      category: categoryId,
      isActive: true,
      type: type,
    };
    !type && delete query.type;
    const productsData = await paginationHelper<ProductType>({
      model: ProductModel,
      query,
      limit,
      chunk,
    });
    return productsData;
  }

  /** delete product */
  public deleteProduct(Id?: string): Promise<ProductType> {
    return new Promise(async (resolve, reject) => {
      try {
        const productId = Id || this._productId;
        const ProductInfo = await ProductModel.findById(productId);
        // if product not found
        if (!ProductInfo) throw new Error("Product not found");
        // delete images of product except display image
        await super.deleteMultipleMedia(
          ProductInfo?.images?.map((image) => image.path)
        );
        //delete variants of product
        const getAllVariants = await ProductModel.find({
          variantOf: productId,
        });
        // delete images of variants except display image
        for (const variant of getAllVariants) {
          await WishListModel.deleteMany({ product: variant._id });
          await CartItemModel.deleteMany({ product: variant._id });
          await super.deleteMultipleMedia(
            variant.images.map((image) => image.path)
          );
          await ProductModel.findByIdAndDelete(variant._id);
        }
        await WishListModel.deleteMany({ product: ProductInfo._id });
        await CartItemModel.deleteMany({ product: ProductInfo._id });
        // delete product
        await ProductModel.findByIdAndDelete(productId);
        //! after discursion, product image will not be deleted

        // send response to client
        resolve(ProductInfo);
      } catch (error) {
        // send error to client
        reject(error);
      }
    });
  }

  /**
   * get all display products
   * @param {number} limit
   * @param {number} chunk
   */
  public getAllDisplayProducts({
    limit,
    chunk,
    type,
  }: {
    limit?: number;
    chunk?: number;
    type?: string;
  }): Promise<PaginationResult<ProductType>> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = {
          type: type,
        };
        !query.type && delete query.type;
        // get all display products
        const productData = await paginationHelper<ProductType>({
          model: ProductModel,
          query,
          sort: { createdAt: -1 },
          limit,
          chunk,
          populate: ["category"],
        });

        // send response to client
        resolve(productData);
      } catch (error) {
        // send error to client
        reject(error);
      }
    });
  }

  /**
   * get all featured products
   */
  public async getAllFeaturedProducts({
    limit,
    chunk,
    type,
    isFeatured,
  }: {
    limit?: number;
    chunk?: number;
    type?: string;
    isFeatured?: boolean;
  }): Promise<PaginationResult<ProductType>> {
    const query = {
      isFeatured: isFeatured,
      type: type,
    };
    !type && delete query.type;
    !isFeatured && delete query.isFeatured;
    // get all featured products
    const productData = await paginationHelper<ProductType>({
      model: ProductModel,
      query,
      limit,
      chunk,
      populate: ["category"],
    });

    // send response to client
    return productData;
  }

  /**
   * get all product optimized
   */
  public async getAllProductsOptimized({
    limit = 100,
    chunk = 0,
    type,
    userId,
    isFeatured,
    categoryId,
  }: {
    limit?: number;
    chunk?: number;
    userId: string;
    type?: any;
    isFeatured?: boolean;
    categoryId?: Types.ObjectId;
  }): Promise<
    PaginationResult<ProductType & { isInWishList: boolean; isInCart: boolean }>
  > {
    // get all wishlist products
    const wishListData: { product: string }[] = await WishListModel.find({
      user: userId,
    }).populate("product");
    //store all wishlist product ids in an array
    const allWishListArray: any = wishListData.map(
      (wishList) => new Types.ObjectId(wishList.product)
    );
    const cartItemData: { product: string }[] = await CartItemModel.find({
      user: userId,
    }).populate("product");
    //store all wishlist product ids in an array
    const allCartItemArray: any = cartItemData.map(
      (wishList) => new Types.ObjectId(wishList.product)
    );
    const query = {
      type: type,
      isFeatured: isFeatured,
      category: categoryId,
    };
    !type && delete query.type;
    !isFeatured && delete query.isFeatured;
    !categoryId && delete query.category;
    const products = await ProductModel.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "cartitems",
          localField: "_id",
          foreignField: "product",
          as: "cartQuantity",
          pipeline: [
            {
              $match: {
                user: new Types.ObjectId(userId),
              },
            },
          ],
        },
      },
      { $unwind: { path: "$cartQuantity", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          cartQuantity: "$cartQuantity.quantity",
          isInWishList: {
            $cond: [
              {
                $toBool: { $in: ["$_id", allWishListArray] },
              },
              true,
              false,
            ],
          },
          isInCart: {
            $cond: [
              {
                $toBool: { $in: ["$_id", allCartItemArray] },
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
    const totalLength = products.length;
    if (totalLength > Number(limit)) products.pop();
    return {
      data: products,
      isLastChunk: !(totalLength > Number(limit)),
    };
  }

  /**
   * search product
   */
  public async searchProducts({
    searchText,
    limit,
    chunk,
    type,
  }: {
    searchText: string;
    limit?: number;
    chunk?: number;
    type?: string;
  }): Promise<PaginationResult<ProductType>> {
    const query = {
      $or: [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
        { shortDescription: { $regex: searchText, $options: "i" } },
      ],
      type: type,
    };
    !type && delete query.type;
    const productsData = await paginationHelper<ProductType>({
      model: ProductModel,
      query,
      limit,
      chunk,
      populate: ["category"],
    });
    return productsData;
  }

  /**
   * product filter
   * filter by category, price, rating, discount
   */

  public async productFilter({
    filter,
    sortBy,
    limit = 100,
    chunk = 0,
    type,
    userId,
    makeId,
    modelId,
    colorId,
    memoryId,
  }: {
    filter: string;
    sortBy: string;
    limit?: number;
    chunk?: number;
    type?: string;
    userId?: string;
    makeId?: string;
    modelId?: string;
    colorId?: string;
    memoryId?: string;
  }): Promise<
    PaginationResult<ProductType & { discount: number; rating: number }>
  > {
    console.log({ filter });
    const filterJSON = JSON.parse(filter);
    console.log({ filterJSON });
    const queryOne = {
      type: type,
      make: makeId,
      model: modelId,
      color: colorId,
      memory: memoryId,
      category: filterJSON?.category && {
        $in: filterJSON?.category.map(
          (item: string) => new Types.ObjectId(item)
        ),
      },
      salePrice: filterJSON?.price && {
        $gte: filterJSON?.price[0],
        $lte: filterJSON?.price[1],
      },
    };
    !type && delete queryOne.type;
    !filterJSON?.makeId && delete queryOne.make;
    !filterJSON?.modelId && delete queryOne.model;
    !filterJSON?.colorId && delete queryOne.color;
    !filterJSON?.memoryId && delete queryOne.memory;
    (!filterJSON?.category || !filterJSON?.category?.length) &&
      delete queryOne.category;
    !filterJSON?.price && delete queryOne.salePrice;
    const queryTwo = {
      rating: filterJSON?.rating && {
        $gte: filterJSON?.rating[0],
        $lte: filterJSON?.rating[1],
      },
      discount: filterJSON?.discount && {
        $gte: filterJSON?.discount[0],
        $lte: filterJSON?.discount[1],
      },
    };
    !filterJSON?.rating && delete queryTwo.rating;

    let sorting: any = { _id: 1 };
    //sorting
    switch (sortBy?.toLowerCase()) {
      case "popularity":
        sorting = { rating: -1 };
        break;
      case "latest":
        sorting = { createdAt: -1 };
        break;
      case "high-to-low":
        sorting = { salePrice: -1 };
        break;
      case "low-to-high":
        sorting = { salePrice: 1 };
        break;
      case "default":
        sorting = { _id: 1 };
        break;

      default:
        throw new Error(
          "Invalid sortBy, sortBy must be  popularity, latest, high-to-low, low-to-high and default"
        );
    }
    console.log({ queryOne });
    // get all wishlist products
    const wishListData: { product: string }[] = userId
      ? await WishListModel.find({
          user: userId,
        }).populate("product")
      : [];
    //store all wishlist product ids in an array
    const allWishListArray: any = userId
      ? wishListData.map((wishList) => new Types.ObjectId(wishList.product))
      : [];
    const cartItemData: { product: string }[] = userId
      ? await CartItemModel.find({
          user: userId,
        }).populate("product")
      : [];
    //store all wishlist product ids in an array
    const allCartItemArray: any = userId
      ? cartItemData.map((wishList) => new Types.ObjectId(wishList.product))
      : [];
    const productsData = await ProductModel.aggregate([
      { $match: queryOne },
      {
        $lookup: {
          from: "cartitems",
          localField: "_id",
          foreignField: "product",
          as: "cartQuantity",
          pipeline: [
            {
              $match: {
                user: new Types.ObjectId(userId),
              },
            },
          ],
        },
      },
      { $unwind: { path: "$cartQuantity", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          rating: {
            $cond: [
              { $toBool: "$reviews.stars" },
              { $toInt: { $divide: ["$reviews.stars", "$reviews.total"] } },
              0,
            ],
          },
          discount: {
            $multiply: [
              { $divide: [{ $subtract: ["$mrp", "$salePrice"] }, "$mrp"] },
              100,
            ],
          },
          cartQuantity: "$cartQuantity.quantity",
          isInWishList: {
            $cond: [
              {
                $toBool: { $in: ["$_id", allWishListArray] },
              },
              true,
              false,
            ],
          },
          isInCart: {
            $cond: [
              {
                $toBool: { $in: ["$_id", allCartItemArray] },
              },
              true,
              false,
            ],
          },
        },
      },
      { $match: queryTwo },
      { $sort: sorting },
      {
        $skip: chunk * limit,
      },
      {
        $limit: limit + 1,
      },
    ]);
    const totalLength = productsData.length;
    if (totalLength > Number(limit)) productsData.pop();

    return {
      data: productsData,
      isLastChunk: !(totalLength > Number(limit)),
    };
  }

  /**
   * get all products ids
   * @param type
   * @returns array of product ids
   * @throws Error
   *
   * @description
   * get all products ids to get static site pages for products pages
   */
  public async getAllProductsIds(type?: string): Promise<string[]> {
    const query = {
      type: type,
    };
    !type && delete query.type;
    const productsData = await ProductModel.find(query, { _id: 1 });
    return productsData.map((product) => product._id.toString());
  }
  /**
   * add product stock in store to inform admin
   */
  public async addProductStock({
    productId,
    stock,
    storeId,
  }: {
    productId: string;
    stock: number;
    storeId: string;
  }) {
    const productsStockData = await new ProductStockModel({
      product: productId,
      stock,
      store: storeId,
    }).save();
    return productsStockData;
  }

  /**
   * get values from an products array
   */
  public async getProductsValues(productIds: string[]) {
    const data = await ProductModel.aggregate([
      {
        $match: {
          _id: productIds.map((productId) => new Types.ObjectId(productId)),
        },
      },
      {
        $group: {
          _id: "total",
          totalMrp: { $sum: "$mrp" },
          totalSalePrice: { $sum: "$salePrice" },
        },
      },
    ]);
    return {
      totalMrp: data[0].totalMrp,
      totalSalePrice: data[0].totalSalePrice,
    };
  }
}

export default ProductLogic;
