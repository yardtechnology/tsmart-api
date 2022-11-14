import { BadRequest } from "http-errors";
import { Admin } from "../config";
import { UserModel } from "../models/user.model";
import USER_TYPE from "../types/user";

// import NotificationLogic from "./notification.logic";

export default class NotificationLogic {
  async pushNotification({
    title,
    body,
    imageUrl,

    userIds,
    users,
    data,
  }: {
    title: string;
    body: string;
    imageUrl?: string;
    userIds?: string[];
    users?: USER_TYPE[];
    data?: object;
  }) {
    try {
      if (!users && !userIds)
        throw new BadRequest(
          "NotificationFunction users or userIds is required."
        );
      const usersDetails =
        users ||
        (await UserModel.find({ _id: { $in: userIds } }).select("fcmTokens"));
      const args: any = data
        ? data
        : {
            screen: "Notification",
          };
      const tokens: any[] = usersDetails.map((user) => {
        if (user?.fcmTokens) return Object.values(user.fcmTokens);
        return [];
      });
      const tempStr = tokens.flat();
      const makeStString = tempStr.filter(
        (item) => item !== undefined
      ) as string[];
      if (makeStString?.length) {
        await Admin.messaging().sendMulticast({
          tokens: makeStString,
          notification: {
            title,
            body,
            imageUrl,
          },
          data: args,
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
