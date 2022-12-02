import MailController from "../controllers/mail.controller";
import paginationHelper, {
  PaginationResult,
} from "../helper/pagination.helper";
import { NotificationSchema } from "../models";
import { AddressModel } from "../models/address.model";
import { CartItemModel } from "../models/cartItem.model";
import { UserModel } from "../models/user.model";
import { WishListModel } from "../models/wishlist.model";
import UserType from "../types/user";
import MediaLogic from "./media.logic";

class UserLogic {
  private userId: string | undefined;
  constructor(userId?: string) {
    this.userId = userId;
  }

  // create store manager
  public createStoreManager({
    displayName,
    email,
    password,
    phoneNumber,
    store,
  }: UserType): Promise<UserType> {
    return new Promise<UserType>(async (resolve, reject) => {
      try {
        const userData: UserType | null = await new UserModel({
          displayName,
          email,
          password,
          phoneNumber,
          role: "MANAGER",
          store,
          status: "ACTIVE",
        }).save();
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  }

  // get user data
  public getUserData(id?: string): Promise<UserType> {
    return new Promise<UserType>(async (resolve, reject) => {
      try {
        const userData: UserType | null = await UserModel.findById(
          id || this.userId
        );
        if (!userData) throw new Error("User not found");
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  }

  //change users block status
  public async changeBlockStatus(
    id: string,
    blockStatus: boolean
  ): Promise<any> {
    const userData: UserType | null = await UserModel.findByIdAndUpdate(id, {
      blockStatus,
    });
    if (!userData) throw new Error("User not found");
    return userData;
  }

  //get all users
  public getAllUsers({
    chunk,
    limit,
    role = "USER",
    status,
  }: {
    chunk?: number;
    limit?: number;
    role?: string;
    status?: string;
  }): Promise<PaginationResult<UserType>> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = {
          role: role,
          status: status,
        };
        !status && delete query.status;
        const allUsers = paginationHelper<UserType>({
          model: UserModel,
          query,
          sort: { createdAt: -1 },
          chunk,
          limit,
          populate: [
            {
              path: "deviceType",
              select: "-imagePATH -type",
            },
            {
              path: "makeType",
              select: "-imagePATH -type -devices",
            },
          ],
          select: "-encrypted_password -salt -refreshTokens -verificationInfo",
        });
        resolve(allUsers);
      } catch (error) {
        reject(error);
      }
    });
  }

  //check if user is verified
  public async isUserVerified(id: string): Promise<boolean> {
    const userData: UserType | null = await UserModel.findById(id);
    if (!userData) throw new Error("User not found");
    if (userData.status !== "VERIFIED")
      throw new Error(
        "Please verify your account by providing GST number or uploading GST document"
      );
    return true;
  }

  //check is user blocked
  public async isUserBlocked(id: string): Promise<boolean> {
    const userData: UserType | null = await UserModel.findById(id);
    if (!userData) throw new Error("User not found");
    if (userData?.blockStatus === "BLOCKED") throw new Error("User is blocked");
    return true;
  }

  //delete user
  public async deleteUser(id: string): Promise<any> {
    const userId = id || this.userId;
    //find user data
    const userData = await UserModel.findById(userId);
    //if user not found
    if (!userData) throw new Error("User not found");

    //delete all cart items
    await CartItemModel.deleteMany({ user: userData._id });
    //delete all wishlist items
    await WishListModel.deleteMany({ user: userData._id });
    //delete all addresses
    await AddressModel.deleteMany({ user: userData._id });
    //delete all notifications
    await NotificationSchema.deleteMany({ user: userData._id });
    const mediaLogic = new MediaLogic();
    // delete avatar
    userData.avatarPath && mediaLogic.deleteMedia(userData?.avatarPath);
    // delete faceVideo
    userData.faceVideoPATH && mediaLogic.deleteMedia(userData?.faceVideoPATH);
    // delete faceVideo
    userData.documentPATH && mediaLogic.deleteMedia(userData?.documentPATH);

    const deletedUser: UserType | null = await UserModel.findByIdAndDelete(
      userId
    );

    new MailController().sendHtmlMail({
      to: userData?.email as string,
      subject: "Account Deleted",
      html: `
      <h1>Account Deleted</h1>
      <p>Your account has been deleted</p>
      `,
    });
    return deletedUser;
  }
}

export default UserLogic;
