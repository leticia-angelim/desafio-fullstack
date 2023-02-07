import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Client } from "../entities/client.entity";
import { AppError } from "../errors/appError";

const ensureClientExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOneBy({
    email,
  });

  if (!client) {
    throw new AppError("Invalid email or password", 403);
  }

  return next();
};

export default ensureClientExistsMiddleware;
