import JWTLogic from "../logic/jwt.logic";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../types/core";
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

  /**
   * store REFRESH_TOKEN in users account
   * @param userId
   * @param refreshToken
   */
  public async storeRefreshToken(
    req: AuthRequest,
    userId: string,
    refreshToken: string
  ) {
    try {
      // find user by id
      const userData: UserType | null = await UserModel.findById(userId);

      //   if user not fount
      if (!userData) throw new Error("User not found");
      const userAgent: string =
        req
          ?.get("user-agent")
          ?.split(")")[0]
          .replace("(", "")
          .replace(/;/g, "")
          .replace(/ /g, "-") || "unknown-device";

      const updates: any = {
        ...userData.refreshTokens,
      };
      updates[userAgent] = refreshToken;
      await UserModel.findByIdAndUpdate(userData._id, {
        $set: {
          refreshTokens: updates,
        },
      });
    } catch (error) {
      // send error
      const err = error as Error;
      throw new Error(err.message);
    }
  }
}

export default AuthLogic;
