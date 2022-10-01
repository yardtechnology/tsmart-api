import JWTLogic from "../logic/jwt.logic";
import { UserModel } from "../models/user.model";
import UserType from "../types/user";

class AuthLogic extends JWTLogic {
  // email verification
  public async verifyEmail(email: string, secret: string) {
    try {
      // find user by email
      const userData: UserType | null = await UserModel.findOne({ email });

      //   if user not fount
      if (!userData) throw new Error("User not found");

      console.log("secret: ", secret);

      // check if user exists
      if (!userData) {
        throw new Error("User not found");
      }

      // check if user is Active or not
      if (userData.status !== "INACTIVE") {
        throw new Error("Email is already verified");
      }

      // send mail to the user
      // TODO: add verify mail function

      // update user status to Active
      await UserModel.findByIdAndUpdate(userData._id, {
        status: "ACTIVE",
      });
    } catch (error) {
      // send error
      const err = error as Error;
      throw new Error(err.message);
    }
  }
}

export default AuthLogic;
