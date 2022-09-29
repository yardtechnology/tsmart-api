import JWTLogic from "../logic/jwt.logic";
import { AuthRequest, JwtDecodedType } from "../types/core";

// extract token from header
export const extractToken = (req: AuthRequest): Promise<JwtDecodedType> => {
  return new Promise(async (resolve, reject) => {
    try {
      // get token from header
      const token = req.headers.authorization;
      if (!token) throw new Error("Authentication token is required");

      // extract token from header
      const tokenParts = token.split(" ");
      const tokenValue = tokenParts[1];
      if (!tokenValue) throw new Error("Invalid authentication token");

      // verify token
      const decoded = await new JWTLogic().verifyAccessToken(tokenValue);
      if (!decoded) throw new Error("Invalid authentication token");
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
};
