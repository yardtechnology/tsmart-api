import { model, Schema } from "mongoose";
import FAQType from "../types/faq";

const faqSchema = new Schema<FAQType>(
  {
    question: String,
    answer: String,
  },
  { timestamps: true }
);
export const FAQModel = model<FAQType>("Faq", faqSchema);
