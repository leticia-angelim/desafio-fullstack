import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

import { IContactRequest } from "../interfaces/contact.interface";
import { Contact } from "../entities/contact.entity";
import AppDataSource from "../data-source";

const ensureContactPhoneAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone }: IContactRequest = req.body;
  const contactRepository = AppDataSource.getRepository(Contact);
  const contactExist = await contactRepository.findOneBy({ phone });

  if (contactExist) {
    throw new AppError("A contact with this phone number already exists", 409);
  }

  return next();
};

export default ensureContactPhoneAlreadyExistsMiddleware;
