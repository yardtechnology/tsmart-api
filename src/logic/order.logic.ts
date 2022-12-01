import {
  ColorSchema,
  DevicesSchema,
  EvaluationPriceSchema,
  MakeSchema,
  MemorySchema,
} from "../models";
import { AddressModel } from "../models/address.model";
import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";
import { StoreModel } from "../models/store.model";
import { UserModel } from "../models/user.model";
import AddressType from "../types/address";
import BankType from "../types/bank";
import OrderType, { OrderStatus } from "../types/order";
import { createOTP } from "./../helper/core.helper";
import { ModelModel } from "./../models/model.model";
import { ServicePriceModel } from "./../models/servicePrice.model";
import EvaluationLogic from "./evaluation.logic";
import MediaLogic from "./media.logic";
// import NotificationLogic from "./notification.logic";
import fs from "fs/promises";
import { Types } from "mongoose";
import path from "path";
import puppeteer from "puppeteer";
import MailController from "../controllers/mail.controller";
import InvoiceLogic from "./invoice.logic";

class OrderLogic extends MediaLogic {
  public _orderId: string | undefined;
  constructor(id?: string) {
    super();
    this._orderId = id;
  }

  /** place store service order */
  public async placeInStoreServiceOrder({
    userId,
    storeId,
    serviceTime,
    serviceIds,
    modelId,
    makeId,
    deviceId,
  }: {
    userId: string;
    storeId: string;
    serviceTime: Date;
    serviceIds: string[];
    modelId: string;
    makeId: string;
    deviceId: string;
  }): Promise<OrderType> {
    return new Promise(async (resolve, reject) => {
      try {
        // get user data
        const userData = await UserModel.findById(userId).select(
          "_id displayName email phoneNumber countryCode avatar"
        );
        if (!userData) throw new Error("User not found");
        // get product data
        const storeData = await StoreModel.findById(storeId).select(
          "_id displayName email phoneNumber countryCode imageURL about address"
        );
        if (!storeData) throw new Error("Store not found");
        const scheduledTime = new Date(serviceTime);
        const makeData = await MakeSchema.findById(makeId);
        if (!makeData) throw new Error("make not found");
        //check model if exist or not
        const modelData = await ModelModel.findById(modelId);
        if (!modelData) throw new Error("model not found");
        //check device if exist or not
        const deviceData = await DevicesSchema.findById(deviceId);
        if (!deviceData) throw new Error("device not found");
        //remove duplicate service ids
        const uniqServiceIds = new Set([...serviceIds]);
        let servicePriceDetails = [];
        for (const servicePriceId of Array.from(uniqServiceIds)) {
          const servicePriceData = await ServicePriceModel.findById(
            servicePriceId
          ).populate("service");
          if (!servicePriceData)
            throw new Error(`${servicePriceId} is not a valid servicePrice id`);

          servicePriceDetails.push(servicePriceData);
        }
        const priceDetails = servicePriceDetails.reduce(
          (prev: { salePrice: number; mrp: number }, curr) => {
            return (prev = {
              salePrice: prev.salePrice + curr?.salePrice,
              mrp: prev.mrp + curr?.mrp,
            });
          },
          { salePrice: 0, mrp: 0 }
        );
        const orderData = await new OrderModel({
          user: userData,
          store: storeData,
          userID: userId,
          storeID: storeId,
          scheduledTime,
          service: JSON.parse(JSON.stringify(servicePriceDetails)),
          type: "REPAIR",
          price: priceDetails?.salePrice,
          mrp: priceDetails?.mrp,
          status: "INITIATED",
          serviceType: "IN_STOR",
          make: makeData,
          makeId: makeData?._id,
          model: modelData,
          modelId: modelData?._id,
          device: deviceData,
          deviceId: deviceData?._id,
          startOTP: {
            otp: createOTP(4),
          },
        }).save();
        resolve(orderData);
      } catch (error) {
        reject(error);
      }
    });
  }
  /** place mail in service order */
  public async placeMailInServiceOrder({
    userId,
    addressId,
    serviceIds,
    modelId,
    makeId,
    deviceId,
  }: {
    userId: string;
    addressId: string;
    serviceIds: string[];
    modelId: string;
    makeId: string;
    deviceId: string;
  }): Promise<OrderType> {
    return new Promise(async (resolve, reject) => {
      try {
        // get user data
        const userData = await UserModel.findById(userId).select(
          "_id displayName email phoneNumber countryCode avatar"
        );
        if (!userData) throw new Error("User not found");
        // get product data
        const storeData = await StoreModel.findOne({ type: "HUB" }).select(
          "_id displayName email phoneNumber countryCode imageURL about address"
        );
        if (!storeData) throw new Error("Hub not found");
        // get delivery address data
        const deliveryAddressData = await AddressModel.findById(
          addressId
        ).select(
          "_id name landmark email phoneNumber countryCode street city state country zip type"
        );
        if (!deliveryAddressData) throw new Error("Delivery address not found");
        const makeData = await MakeSchema.findById(makeId);
        if (!makeData) throw new Error("make not found");
        //check model if exist or not
        const modelData = await ModelModel.findById(modelId);
        if (!modelData) throw new Error("model not found");
        //check device if exist or not
        const deviceData = await DevicesSchema.findById(deviceId);
        if (!deviceData) throw new Error("device not found");
        //remove duplicate service ids
        const uniqServiceIds = new Set([...serviceIds]);
        let servicePriceDetails = [];
        for (const servicePriceId of Array.from(uniqServiceIds)) {
          const servicePriceData = await ServicePriceModel.findById(
            servicePriceId
          ).populate("service");
          if (!servicePriceData)
            throw new Error(`${servicePriceId} is not a valid servicePrice id`);

          servicePriceDetails.push(servicePriceData);
        }
        const priceDetails = servicePriceDetails.reduce(
          (prev: { salePrice: number; mrp: number }, curr) => {
            return (prev = {
              salePrice: prev.salePrice + curr?.salePrice,
              mrp: prev.mrp + curr?.mrp,
            });
          },
          { salePrice: 0, mrp: 0 }
        );
        const orderData = await new OrderModel({
          user: userData,
          store: storeData,
          address: deliveryAddressData,
          userID: userId,
          storeID: storeData?._id,
          service: JSON.parse(JSON.stringify(servicePriceDetails)),
          type: "REPAIR",
          price: priceDetails?.salePrice,
          mrp: priceDetails?.mrp,
          status: "INITIATED",
          serviceType: "MAIL_IN",
          make: makeData,
          makeId: makeData?._id,
          model: modelData,
          modelId: modelData?._id,
          device: deviceData,
          deviceId: deviceData?._id,
        }).save();
        resolve(orderData);
      } catch (error) {
        reject(error);
      }
    });
  }
  /** place call out service order */
  public async placeCallOutOrder({
    userId,
    address,
    serviceIds,
    modelId,
    makeId,
    deviceId,
    scheduledTime,
  }: {
    userId: string;
    address: Partial<AddressType>;
    serviceIds: string[];
    modelId: string;
    makeId: string;
    deviceId: string;
    scheduledTime: Date;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        // get user data
        const userData = await UserModel.findById(userId).select(
          "_id displayName email phoneNumber countryCode avatar"
        );
        if (!userData) throw new Error("User not found");
        //remove duplicate service ids
        const uniqServiceIds = new Set([...serviceIds]);
        let servicePriceDetails = [];
        for (const servicePriceId of Array.from(uniqServiceIds)) {
          const servicePriceData = await ServicePriceModel.findById(
            servicePriceId
          ).populate("service");
          if (!servicePriceData)
            throw new Error(`${servicePriceId} is not a valid servicePrice id`);

          servicePriceDetails.push(servicePriceData);
        }
        const priceDetails = servicePriceDetails.reduce(
          (prev: { salePrice: number; mrp: number }, curr) => {
            return (prev = {
              salePrice: prev.salePrice + curr?.salePrice,
              mrp: prev.mrp + curr?.mrp,
            });
          },
          { salePrice: 0, mrp: 0 }
        );
        const scheduledTimeData = new Date(scheduledTime);
        const makeData = await MakeSchema.findById(makeId);
        if (!makeData) throw new Error("make not found");
        //check model if exist or not
        const modelData = await ModelModel.findById(modelId);
        if (!modelData) throw new Error("model not found");
        //check device if exist or not
        const deviceData = await DevicesSchema.findById(deviceId);
        if (!deviceData) throw new Error("device not found");
        const orderData = await new OrderModel({
          user: userData,
          address,
          userID: userId,
          service: JSON.parse(JSON.stringify(servicePriceDetails)),
          type: "REPAIR",
          price: priceDetails?.salePrice,
          mrp: priceDetails?.mrp,
          status: "INITIATED",
          serviceType: "CALL_OUT",
          make: makeData,
          makeId: makeData?._id,
          model: modelData,
          modelId: modelData?._id,
          device: deviceData,
          deviceId: deviceData?._id,
          scheduledTime: scheduledTimeData,
        }).save();
        resolve(orderData);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * order product
   */
  public async orderProduct({
    userId,
    productId,
    quantity,
    billingId,
    shippedTo,
    status,
  }: {
    userId: string;
    productId: string;
    quantity: number;
    billingId?: string;
    shippedTo: string;
    status: "PENDING" | "INITIATED";
  }) {
    const userData = await UserModel.findById(userId).select(
      "_id email country phoneNumber role age "
    );
    if (!userData) throw new Error("User not found");
    const productData = await ProductModel.findById(productId);
    if (!productData) throw new Error("Product not found");
    const storeData = await StoreModel.findById(productData.store);
    if (!storeData) throw new Error("Store not found");
    const deliveryAddressData = await AddressModel.findById(shippedTo);
    if (!deliveryAddressData) throw new Error("Delivery address not found");
    const orderData = await new OrderModel({
      user: userData,
      userID: userData._id,
      store: storeData,
      storeID: storeData?._id,
      product: productData,
      type: productData?.type === "ACCESSORY" ? "ACCESSORY" : "REFURBISH",
      quantity: quantity,
      billing: billingId,
      address: deliveryAddressData,
      status: status,
      price: productData.salePrice * Number(quantity),
      mrp: productData.mrp * Number(quantity),
    }).save();
    //TODO: add order notifications

    return orderData;
  }

  /**
   * update order status and ETA update
   */
  public async updateOrderStatus({
    orderId,
    status,
    eta,
  }: {
    orderId: string;
    status?: OrderStatus;
    eta?: Date;
  }): Promise<OrderType> {
    return new Promise(async (resolve, reject) => {
      try {
        const orderData = await OrderModel.findByIdAndUpdate(orderId, {
          status,
          ETA: eta,
        });
        if (!orderData) throw new Error("Order not found");

        resolve(orderData);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**get order details */
  public async getOrderDetails(orderId: string): Promise<OrderType> {
    const orderData: OrderType | null = null;

    // = await OrderModel.findById(
    //   orderId
    // ).populate([
    //   {
    //     path: "service",
    //     populate: {
    //       path: "service",
    //     },
    //   },
    //   {
    //     path: "billing",
    //   },
    // ]);
    const orderData2 = await OrderModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(orderId),
        },
      },
      {
        $lookup: {
          from: "billings",
          localField: "billing",
          foreignField: "_id",
          as: "billing",
        },
      },
      {
        $unwind: {
          path: "$billing",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "billings",
          localField: "extraBilling",
          foreignField: "_id",
          as: "extraBilling",
        },
      },
      {
        $unwind: {
          path: "$extraBilling",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "technicianID",
          foreignField: "technician",
          as: "isReview",
          let: { userID: "$userID" },
          pipeline: [
            {
              $match: {
                user: "$$userID",
              },
            },
          ],
        },
      },
      {
        $addFields: {
          isReview: { $gte: [{ $size: "$isReview" }, 1] },
        },
      },
    ]);

    if (!orderData2[0]) {
      throw new Error("order not found");
    }
    return orderData2[0];
  }
  /**update order details */
  public async updateOrderDetails({
    orderId,
    faceVideo,
    startImage,
    endImage,
  }: {
    orderId: string;
    faceVideo: any;
    startImage: any;
    endImage: any;
  }): Promise<OrderType> {
    const faceVideoData =
      faceVideo && !Array.isArray(faceVideo)
        ? await super.uploadMedia(faceVideo, `${orderId}`)
        : undefined;
    const startImageData =
      startImage && !Array.isArray(startImage)
        ? await super.uploadMedia(startImage, `${orderId}`)
        : undefined;
    const endImageData =
      endImage && !Array.isArray(endImage)
        ? await super.uploadMedia(endImage, `${orderId}`)
        : undefined;
    const orderData: OrderType | null = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        faceVideo: faceVideoData?.url,
        faceVideoPath: faceVideoData?.path,
        startImage: startImageData?.url,
        startImagePATH: startImageData?.path,
        endImage: endImageData?.url,
        endImagePATH: endImageData?.path,
        "startOTP.otp": faceVideo ? createOTP(4) : undefined,
        "endOTP.otp": endImage ? createOTP(4) : undefined,
      }
    );
    if (!orderData) {
      throw new Error("order not found");
    }
    return orderData;
  }

  /**
   * place sell order
   */
  public async placeSellOrder({
    userId,
    paymentMethod,
    makeId,
    modelId,
    deviceId,
    falsyEvaluatedIds,
    addressId,
    bankDetails,
    colorId,
    memoryId,
    imei,
  }: {
    userId: string;
    paymentMethod: "ONLINE" | "CHEQUE";
    makeId: string;
    modelId: string;
    deviceId: string;
    falsyEvaluatedIds: string[];
    addressId: string;
    bankDetails?: BankType;
    colorId: string;
    memoryId: string;
    imei?: string;
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log({
          userId,
          paymentMethod,
          makeId,
          modelId,
          deviceId,
          falsyEvaluatedIds,
          addressId,
          bankDetails,
          colorId,
          memoryId,
          imei,
        });
        // get user data
        const userData = await UserModel.findById(userId).select(
          "_id displayName email phoneNumber countryCode avatar"
        );
        if (!userData) throw new Error("User not found");
        //check address if exist or not
        const addressData = await AddressModel.findById(addressId);
        if (!addressData && !bankDetails?.fullName)
          throw new Error("address not found");
        //check make if exist or not
        const makeData = await MakeSchema.findById(makeId);
        if (!makeData) throw new Error("make not found");
        //check model if exist or not
        const modelData = await ModelModel.findById(modelId);
        if (!modelData) throw new Error("model not found");
        //check device if exist or not
        const deviceData = await DevicesSchema.findById(deviceId);
        if (!deviceData) throw new Error("device not found");
        //check color if exist or not
        const colorData = await ColorSchema.findById(colorId);
        if (!colorData) throw new Error("color not found");
        //check memory if exist or not
        const memoryData = await MemorySchema.findById(memoryId);
        if (!memoryData) throw new Error("memory not found");
        //remove duplicate service ids
        const uniqFalsyEvaluatedValues = await EvaluationPriceSchema.find({
          _id: { $in: falsyEvaluatedIds },
        }).populate("evaluation");

        const evaluatedPrice = await new EvaluationLogic().deviceEvaluation({
          colorId: colorData?._id,
          memoryId: memoryData?._id,
          modelId: modelData?._id,
          evaluationPriceIds: falsyEvaluatedIds,
        });
        const orderData = await new OrderModel({
          user: userData,
          address: addressData,
          userID: userId,
          evaluatedValues: JSON.parse(JSON.stringify(uniqFalsyEvaluatedValues)),
          type: "SELL",
          evaluatedPrice: evaluatedPrice?.evaluatePrice,
          status: "INITIATED",
          paymentMethod,
          make: makeData,
          makeId: makeData?._id,
          model: modelData,
          modelId: modelData?._id,
          device: deviceData,
          deviceId: deviceData?._id,
          bankDetails,
          color: colorData,
          colorId: colorData?._id,
          memory: memoryData,
          memoryId: memoryData?._id,
          imei,
        }).save();
        resolve(orderData);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * invoice send to mail
   */
  public async sendInvoiceToMail({
    orderId,
    mail,
  }: {
    orderId: string;
    mail: string;
  }) {
    const orderData = await new InvoiceLogic().getInvoiceHTML({ orderId });
    const invoiceTemplate = orderData?.invoiceHTML;
    const baseDir = path.join(__dirname, "..", "..", "uploads");
    const htmlFilePath = `${baseDir}/invoice-${orderData?.orderData?._id}.html`;
    await fs.writeFile(htmlFilePath, invoiceTemplate);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(htmlFilePath, {
      waitUntil: "networkidle0",
    });
    const pdf = await page.pdf({
      printBackground: true,
      format: "A4",
    });
    await fs.rm(htmlFilePath);
    const mailOptions = {
      from: process.env.EMAIL,
      to: mail,
      subject: `Invoice for your ride ${orderData?.orderData?._id}`,
      html: invoiceTemplate,
      attachments: [
        {
          filename: `invoice-${orderData?.orderData?._id}.pdf`,
          content: pdf,
        },
      ],
    };
    await new MailController().transporter.sendMail(mailOptions);
    await browser.close();
  }
}

export default OrderLogic;
