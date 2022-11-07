import { model, Model, Schema } from "mongoose";
import { SALE_PRICE_TYPE } from "../types";

const salePriceSchema = new Schema<SALE_PRICE_TYPE, Model<SALE_PRICE_TYPE>>(
  {
    price: Number,
    model: {
      type: Schema.Types.ObjectId,
      ref: "Model",
    },
    memory: {
      type: Schema.Types.ObjectId,
      ref: "Memory",
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: "Color",
    },
  },
  { timestamps: true }
);

const SalePriceModel = model<SALE_PRICE_TYPE, Model<SALE_PRICE_TYPE>>(
  "SalePrice",
  salePriceSchema
);

export default SalePriceModel;
