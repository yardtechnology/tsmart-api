import { AddressModel } from "../models/address.model";
import { OrderModel } from "../models/order.model";
import { StoreModel } from "../models/store.model";
import { UserModel } from "../models/user.model";
import OrderType from "../types/order";
// import NotificationLogic from "./notification.logic";

class OrderLogic {
  public _orderId: string | undefined;
  constructor(id?: string) {
    this._orderId = id;
  }

  /** place order */
  public async placeStoreServiceOrder({
    userId,
    storeId,
    addressId,
    serviceTime,
    serviceIds,
  }: {
    userId: string;
    storeId: string;
    addressId: string;
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
        // get delivery address data
        const deliveryAddressData = await AddressModel.findById(
          addressId
        ).select(
          "_id name landmark email phoneNumber countryCode street city state country zip type"
        );
        const scheduledTime = new Date(serviceTime);
        if (!deliveryAddressData) throw new Error("Delivery address not found");
        const orderData = await new OrderModel({
          user: userData,
          store: storeData,
          address: deliveryAddressData,
          userID: userId,
          storeID: storeId,
          scheduledTime,
          service: serviceIds,
          type: "BUY",
          status: "INITIATED",
        }).save();
        resolve(orderData);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default OrderLogic;
