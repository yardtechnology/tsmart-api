import { Model, model, Schema } from "mongoose";
import { EVALUATION_PRICE_TYPE } from "../types";

const evaluationPriceSchema = new Schema<
  EVALUATION_PRICE_TYPE,
  Model<EVALUATION_PRICE_TYPE>
>(
  {
    price: {
      type: Number,
    },
    evaluation: {
      type: Schema.Types.ObjectId,
      ref: "Evaluation",
    },
    model: {
      type: Schema.Types.ObjectId,

      ref: "Model",
    },
  },
  { timestamps: true }
);
const EvaluationPriceSchema = model<
  EVALUATION_PRICE_TYPE,
  Model<EVALUATION_PRICE_TYPE>
>("EvaluationPrice", evaluationPriceSchema);
export default EvaluationPriceSchema;
