import { NextFunction, Response } from "express";
import { extractToken } from "../helper/jwt.helper";
import JWT from "../logic/jwt.logic";
import { AuthRequest } from "../types/core";

class AuthenticateMiddleware extends JWT {
  // is user authenticated
  public async isAuthenticated(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (req) {
        // extract token from header
        const decoded = await extractToken(req);
        req.currentUser = {
          _id: decoded._id,
          email: decoded.email,
          role: decoded.role,
          store: decoded.store,
        };
        next();
      } else {
        throw new Error("User is not authenticated");
      }
    } catch (error) {
      const err = error as Error;
      res.status(401).json({
        status: "FAIL",
        error: err.message,
      });
    }
  }

  public async authenticateOrUnAuthenticate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (req) {
        // extract token from header
        if (req.headers.authorization) {
          const decoded = await extractToken(req);
          req.currentUser = {
            _id: decoded._id,
            email: decoded.email,
            role: decoded.role,
            store: decoded.store,
          };
        }

        next();
      } else {
        throw new Error("User is not authenticated");
      }
    } catch (error) {
      const err = error as Error;
      res.status(401).json({
        status: "FAIL",
        error: err.message,
      });
    }
  }

  // is manager authenticated
  public async isManager(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (req) {
        // extract token from header
        const decoded = await extractToken(req);
        if (!decoded) throw new Error("User is not authenticated");
        if (decoded.role !== "MANAGER" && decoded.role !== "ADMIN") {
          return res.status(403).json({
            status: "FAIL",
            error: "User is not a manager",
          });
        }
        if (!decoded.store) {
          return res.status(403).json({
            status: "FAIL",
            error: `${decoded?.role || "Manager"} is not assigned to any store`,
          });
        }
        req.currentUser = {
          _id: decoded._id,
          email: decoded.email,
          role: decoded.role,
          store: decoded.store,
        };
        next();
      } else {
        throw new Error("User is not authenticated");
      }
    } catch (error) {
      const err = error as Error;
      res.status(401).json({
        status: "FAIL",
        error: err.message,
      });
    }
  }

  // is admin authenticated
  public async isAdmin(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      if (req) {
        // extract token from header
        const decoded = await extractToken(req);
        if (decoded.role !== "ADMIN") {
          return res.status(403).json({
            status: "FAIL",
            error: "User is not an admin",
          });
        } else {
          req.currentUser = {
            _id: decoded._id,
            email: decoded.email,
            role: decoded.role,
            store: decoded.store,
          };
          next();
        }
      } else {
        throw new Error("User is not authenticated");
      }
    } catch (error) {
      const err = error as Error;
      res.status(401).json({
        status: "FAIL",
        error: err.message,
      });
    }
  }

  // is admin
}

export default AuthenticateMiddleware;
