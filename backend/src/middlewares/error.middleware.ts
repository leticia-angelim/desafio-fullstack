import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal server error",
  });
};
