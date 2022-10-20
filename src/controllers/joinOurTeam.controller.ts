import { NextFunction, Response } from "express";
import { body, param } from "express-validator";
import { BadRequest, InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import MediaLogic from "../logic/media.logic";
import { JoinOurTeamSchema } from "../models";
import { AuthRequest } from "../types/core";

class JoinOurTeamController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    let resumeData: any | undefined;
    try {
      fieldValidateError(req);
      const resumeFile = req?.files?.resume;
      if (!resumeFile) throw new BadRequest("resume field is required.");
      const filePath = `JoinOurTeam`;

      resumeData =
        resumeFile && !Array.isArray(resumeFile)
          ? await new MediaLogic().uploadMedia(resumeFile, filePath)
          : undefined;
      const joinOurTeam = await JoinOurTeamSchema.create({
        ...req.body,
        resume: resumeData?.url,
        resumePATH: resumeData?.path,
      });
      if (!joinOurTeam)
        throw new InternalServerError(
          "Something went wrong, join our team is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Your message sended successfully.",
        data: joinOurTeam,
      });
    } catch (error) {
      if (resumeData?.path) {
        new MediaLogic().deleteMedia(resumeData?.path);
      }
      next(error);
    }
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk, joinOurTeamId } = req.query;

      const query: any = {};
      joinOurTeamId && (query["_id"] = joinOurTeamId);
      const getAllData = await paginationHelper({
        model: JoinOurTeamSchema,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        populate: "",
        sort: {
          createdAt: -1,
        },
      });
      res.status(200).json({
        status: "SUCCESS",
        message: joinOurTeamId
          ? "Join our team found successfully."
          : "All join our team found successfully.",
        data: joinOurTeamId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { joinOurTeamId } = req.params;
      if (!joinOurTeamId) throw new BadRequest("joinOurTeamId is required.");
      fieldValidateError(req);
      const deleteJoinOurTeam = await JoinOurTeamSchema.findByIdAndDelete(
        joinOurTeamId
      );
      //   delete device image
      deleteJoinOurTeam?.resumePATH &&
        new MediaLogic().deleteMedia(deleteJoinOurTeam?.resumePATH);
      if (!deleteJoinOurTeam) throw new NotFound("No make found for delete.");

      res.json({
        status: "SUCCESS",
        message: "join our team deleted successfully",
        data: deleteJoinOurTeam,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const JoinOurTeamControllerValidation = {
  create: [
    body("fullName")
      .not()
      .isEmpty()
      .withMessage("fullName is required.")
      .isLength({ min: 3 })
      .withMessage("fullName must be at least 3 characters long")
      .isLength({ max: 60 })
      .withMessage("fullName must be at most 60 characters long"),

    body("phoneNumber")
      .not()
      .isEmpty()
      .withMessage("phoneNumber is required.")
      .isLength({ min: 3 })
      .withMessage("phoneNumber must be at least 3 characters long")
      .isLength({ max: 20 })
      .withMessage("phoneNumber must be at most 20 characters long"),

    body("email")
      .not()
      .isEmpty()
      .withMessage("email is required.")
      .isLength({ min: 3 })
      .withMessage("email must be at least 3 characters long")
      .isLength({ max: 60 })
      .withMessage("email must be at most 60 characters long"),

    body("address")
      .not()
      .isEmpty()
      .withMessage("address is required.")
      .isLength({ min: 3 })
      .withMessage("address must be at least 3 characters long")
      .isLength({ max: 420 })
      .withMessage("address must be at most 420 characters long"),

    body("city")
      .not()
      .isEmpty()
      .withMessage("city is required.")
      .isLength({ min: 3 })
      .withMessage("city must be at least 3 characters long")
      .isLength({ max: 100 })
      .withMessage("city must be at most 100 characters long"),

    body("postalPin")
      .not()
      .isEmpty()
      .withMessage("postalPin is required.")
      .isLength({ min: 3 })
      .withMessage("postalPin must be at least 3 characters long")
      .isLength({ max: 10 })
      .withMessage("postalPin must be at most 10 characters long"),

    body("rightToWorkInUk")
      .not()
      .isEmpty()
      .withMessage("rightToWorkInUk is required.")
      .isBoolean()
      .withMessage("rightToWorkInUk must be boolean."),

    body("commuteIntoCentralLondon")
      .not()
      .isEmpty()
      .withMessage("commuteIntoCentralLondon is required.")
      .isBoolean()
      .withMessage("commuteIntoCentralLondon must be boolean."),
  ],
  getAll: [
    param("joinOurTeamId")
      .optional()
      .isMongoId()
      .withMessage("joinOurTeamId must be mongoose id."),
  ],
  delete: [
    param("joinOurTeamId")
      .not()
      .isEmpty()
      .withMessage("joinOurTeamId is required.")
      .isMongoId()
      .withMessage("joinOurTeamId must be mongoose id."),
  ],
};

export default JoinOurTeamController;
