import { Request, Response, NextFunction } from "express";
import { IClientRequest } from "../interfaces/client.interface";
import { Client } from "../entities/client.entity";
import { AppError } from "../errors/appError";
import AppDataSource from "../data-source";

const ensureEmailAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email }: IClientRequest = req.body;
  const clientRepository = AppDataSource.getRepository(Client);
  const clientExist = await clientRepository.findOneBy({ email });

  if (clientExist) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export default ensureEmailAlreadyExistsMiddleware;
