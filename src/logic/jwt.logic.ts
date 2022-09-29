import jwt from "jsonwebtoken";

class JWTLogic {
  public async getAccessToken(payload: {}, validity?: string): Promise<string> {
    const token = jwt.sign(payload, `${process.env.JWT_ACCESS_SECRET}`, {
      expiresIn: validity || "5d",
    });
    return token;
  }

  public async getRefreshToken(
    payload: {},
    validity?: string
  ): Promise<string> {
    const token = jwt.sign(payload, `${process.env.JWT_REFRESH_SECRET}`, {
      expiresIn: validity || "7d",
    });
    return token;
  }

  public async verifyAccessToken(token: string): Promise<any> {
    return jwt.verify(token, `${process.env.JWT_ACCESS_SECRET}`);
  }
  public async verifyRefreshToken(token: string): Promise<any> {
    return jwt.verify(token, `${process.env.JWT_REFRESH_SECRET}`);
  }
}

export default JWTLogic;
