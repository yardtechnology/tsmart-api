import { NextFunction, Response } from "express";
import { body, param, query } from "express-validator";
import { InternalServerError, NotFound } from "http-errors";
import { fieldValidateError } from "../helper";
import paginationHelper from "../helper/pagination.helper";
import { MemorySchema } from "../models";
import { AuthRequest } from "../types/core";

class MemoryController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      fieldValidateError(req);
      // const { Memory, hashCode } = req.body;

      const createMemory = await MemorySchema.create(req.body);
      if (!createMemory)
        throw new InternalServerError(
          "Something went wrong, Memory is not created."
        );
      res.json({
        status: "SUCCESS",
        message: "Memory created successfully.",
        data: createMemory,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { memoryId } = req.params;
      const { ram, internal } = req.body;

      fieldValidateError(req);

      const arg: any = {};
      internal && (arg.internal = internal);
      ram && (arg.ram = ram);

      const updateMemory = await MemorySchema.findByIdAndUpdate(memoryId, arg, {
        runValidators: true,
      });
      if (!updateMemory)
        throw new InternalServerError(
          "Something went wrong, Memory is not updated."
        );
      res.json({
        status: "SUCCESS",
        message: "Memory updated successfully",
        data: updateMemory,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, chunk, memoryId } = req.query;
      const query: any = {};
      memoryId && (query._id = memoryId);
      const getAllData = await paginationHelper({
        model: MemorySchema,
        query,
        chunk: chunk ? Number(chunk) : undefined,
        limit: limit ? Number(limit) : undefined,
        select: "",
        sort: {
          createdAt: -1,
        },
      });
      res.json({
        status: "SUCCESS",
        message: "All Memory found successfully.s",
        data: memoryId ? getAllData?.data?.[0] : getAllData,
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { memoryId } = req.params;
      fieldValidateError(req);
      const deleteMemory = await MemorySchema.findByIdAndDelete(memoryId);
      if (!deleteMemory) throw new NotFound("Memory not found.");
      //   delete Memory image

      res.json({
        status: "SUCCESS",
        message: "Memory deleted successfully",
        data: deleteMemory,
      });
    } catch (error) {
      next(error);
    }
  }
}
export const MemoryControllerValidation = {
  create: [
    body("ram").not().isEmpty().withMessage("ram is required."),
    body("internal").not().isEmpty().withMessage("internal is required."),
  ],
  delete: [
    param("memoryId")
      .not()
      .isEmpty()
      .withMessage("memoryId is required.")
      .isMongoId()
      .withMessage("memoryId most be mongoose id."),
  ],
  getAll: [
    query("memoryId").not().isEmpty().withMessage("memoryId is required."),
  ],
  update: [
    param("memoryId")
      .not()
      .isEmpty()
      .withMessage("MemoryId is required.")
      .isMongoId()
      .withMessage("MemoryId most be mongoose Id."),
    body("ram")
      .optional()
      .isLength({ min: 1 })
      .withMessage("ram must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("ram must be at most 250 character."),
    body("internal")
      .optional()
      .isLength({ min: 1 })
      .withMessage("internal must be at least 1 character.")
      .isLength({ max: 250 })
      .withMessage("internal must be at most 250 character."),
  ],
};

export default MemoryController;
