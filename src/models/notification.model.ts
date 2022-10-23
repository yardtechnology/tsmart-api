import { Model, model, Schema } from "mongoose";
import { NOTIFICATION_TYPE } from "../types";

const notificationSchema = new Schema<
  NOTIFICATION_TYPE,
  Model<NOTIFICATION_TYPE>
>(
  {
    icon: {
      type: String,
    },
    iconPATH: {
      type: String,
    },
    title: {
      type: String,

      require: [true, "title is required."],
    },
    description: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: [true, "user id is required."],
    },
    readStatus: {
      type: Boolean,
      default: false,
    },
    redirectLink: {
      type: String,
    },
  },
  { timestamps: true }
);
const NotificationSchema = model<NOTIFICATION_TYPE, Model<NOTIFICATION_TYPE>>(
  "Notification",
  notificationSchema
);
export default NotificationSchema;
