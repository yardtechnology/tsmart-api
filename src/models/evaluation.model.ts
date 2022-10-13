import { Model, model, Schema } from "mongoose";
import { EVALUATION_TYPE } from "../types";

const evaluationSchema = new Schema<EVALUATION_TYPE, Model<EVALUATION_TYPE>>(
  {
    image: {
      type: String,
    },
    imagePATH: {
      type: String,
    },
    title: {
      type: String,
      unique: true,
      index: true,
      require: [true, "Device title is required."],
    },
  },
  { timestamps: true }
);
const EvaluationSchema = model<EVALUATION_TYPE, Model<EVALUATION_TYPE>>(
  "Evaluation",
  evaluationSchema
);
export default EvaluationSchema;
