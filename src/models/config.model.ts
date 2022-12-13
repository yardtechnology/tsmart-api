import { Model, model, Schema } from "mongoose";
import { CONFIG_TYPE } from "../types";

const configSchema = new Schema<CONFIG_TYPE, Model<CONFIG_TYPE>>(
  {
    tax: {
      type: Number,
    },
    storeAndroid: {
      message: {
        type: String,
      },
      version: {
        type: String,
      },
      title: {
        type: String,
      },
      isDismissible: {
        type: Boolean,
      },
    },
    storeIos: {
      message: {
        type: String,
      },
      version: {
        type: String,
      },
      title: {
        type: String,
      },
      isDismissible: {
        type: Boolean,
      },
    },
    customerIos: {
      message: {
        type: String,
      },
      version: {
        type: String,
      },
      title: {
        type: String,
      },
      isDismissible: {
        type: Boolean,
      },
    },
    customerAndroid: {
      message: {
        type: String,
      },
      version: {
        type: String,
      },
      title: {
        type: String,
      },
      isDismissible: {
        type: Boolean,
      },
    },
    technicianAndroid: {
      message: {
        type: String,
      },
      version: {
        type: String,
      },
      title: {
        type: String,
      },
      isDismissible: {
        type: Boolean,
      },
    },
    technicianIos: {
      message: {
        type: String,
      },
      version: {
        type: String,
      },
      title: {
        type: String,
      },
      isDismissible: {
        type: Boolean,
      },
    },
    mailInInstauration: String,
    aboutUs: String,
    privacyPolicy: String,
    termsAndConditions: String,
    shoppingPolicy: String,
    mailInstructions: String,
    ourWarranty: String,
    storeRange: Number,
    orderCancelTime: Number,
    newsLatterEmails: [],
    technicianSearchRange: Number,
  },
  { timestamps: true }
);
const ConfigSchema = model<CONFIG_TYPE, Model<CONFIG_TYPE>>(
  "Config",
  configSchema
);
export default ConfigSchema;
