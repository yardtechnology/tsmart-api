import { Model, model, Schema } from "mongoose";
import { JOIN_OUR_TEAM_TYPE } from "../types";

const joinOurTeamSchema = new Schema<
  JOIN_OUR_TEAM_TYPE,
  Model<JOIN_OUR_TEAM_TYPE>
>(
  {
    fullName: {
      type: String,
      required: [true, " fullName is required."],
    },
    phoneNumber: {
      type: String,
      require: [true, "phoneNumber title is required."],
    },
    email: {
      type: String,
      require: [true, "email title is required."],
    },
    address: {
      type: String,

      require: [true, "address title is required."],
    },
    city: {
      type: String,
      required: [true, "city is required."],
    },
    postalPin: {
      type: String,
      required: [true, "postalPin is required."],
    },
    resume: {
      type: String,
    },
    resumePATH: {
      type: String,
    },
    rightToWorkInUk: {
      type: Boolean,
    },
    commuteIntoCentralLondon: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
const JoinOurTeamSchema = model<JOIN_OUR_TEAM_TYPE, Model<JOIN_OUR_TEAM_TYPE>>(
  "JoinOurTeam",
  joinOurTeamSchema
);
export default JoinOurTeamSchema;
