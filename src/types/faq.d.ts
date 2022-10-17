import { Document } from "mongoose";

export default interface FAQType extends Document {
  question: string;
  answer: string;
}
