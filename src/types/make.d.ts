import { Document } from "mongoose";

export default interface MakeType extends Document {
  name: string;
  description: string;
  logo: {
    url: string;
    path: string;
  };
}
