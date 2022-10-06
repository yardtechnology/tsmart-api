import paginationHelper, {
  PaginationResult,
} from "../helper/pagination.helper";
import { UserModel } from "../models/user.model";
import UserType from "../types/user";

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

  //TODO : DELETE USER AND CORRESPONDING DATA
}

export default UserLogic;
