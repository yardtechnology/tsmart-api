import { AddressModel } from "../models/address.model";
import { OrderModel } from "../models/order.model";
import { StoreModel } from "../models/store.model";
import { UserModel } from "../models/user.model";
import OrderType, { OrderStatus } from "../types/order";
import { ServicePriceModel } from "./../models/servicePrice.model";
// import NotificationLogic from "./notification.logic";

class OrderLogic {
  public _orderId: string | undefined;
  constructor(id?: string) {
    this._orderId = id;
  }

  /** place store service order */
  public async placeInStoreServiceOrder({
    userId,
    storeId,
    serviceTime,
    serviceIds,
  }: {
    userId: string;
    storeId: string;
    serviceTime: Date;
    serviceIds: string[];
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
        //remove duplicate service ids
        const uniqServiceIds = new Set([...serviceIds]);
        const servicePriceDetails = await ServicePriceModel.find({
          _id: { $in: serviceIds },
        });
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
          service: uniqServiceIds,
          type: "BUY",
          price: priceDetails?.salePrice,
          mrp: priceDetails?.mrp,
          status: "INITIATED",
          serviceType: "IN_STOR",
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
  }: {
    userId: string;
    addressId: string;
    serviceIds: string[];
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
        //remove duplicate service ids
        const uniqServiceIds = new Set([...serviceIds]);
        const servicePriceDetails = await ServicePriceModel.find({
          _id: { $in: serviceIds },
        });
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
          service: uniqServiceIds,
          type: "BUY",
          price: priceDetails?.salePrice,
          mrp: priceDetails?.mrp,
          status: "INITIATED",
          serviceType: "MAIL_IN",
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
    latitude,
    longitude,
    street,
    serviceIds,
  }: {
    userId: string;
    latitude: number;
    longitude: number;
    street: string;
    serviceIds: string[];
  }): Promise<OrderType> {
    return new Promise(async (resolve, reject) => {
      try {
        // get user data
        const userData = await UserModel.findById(userId).select(
          "_id displayName email phoneNumber countryCode avatar"
        );
        if (!userData) throw new Error("User not found");
        //remove duplicate service ids
        const uniqServiceIds = new Set([...serviceIds]);
        const servicePriceDetails = await ServicePriceModel.find({
          _id: { $in: serviceIds },
        });
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
          address: {
            latitude,
            longitude,
            street,
          },
          userID: userId,
          service: uniqServiceIds,
          type: "BUY",
          price: priceDetails?.salePrice,
          mrp: priceDetails?.mrp,
          status: "INITIATED",
          serviceType: "CALL_OUT",
        }).save();
        resolve(orderData);
      } catch (error) {
        reject(error);
      }
    });
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
    const orderData: OrderType | null = await OrderModel.findById(
      orderId
    ).populate([
      {
        path: "service",
        populate: {
          path: "service",
        },
      },
    ]);
    if (!orderData) {
      throw new Error("order not found");
    }
    return orderData;
  }
}

export default OrderLogic;
