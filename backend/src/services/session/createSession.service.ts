import {
  IClientLogin,
  IClientLoginToken,
} from "../../interfaces/client.interface";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors/appError";
import AppDataSource from "../../data-source";

import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createSessionService = async (
  data: IClientLogin
): Promise<IClientLoginToken> => {
  const { email, password } = data;
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOneBy({
    email,
  });

  if (!client) {
    throw new AppError("Invalid email or password", 403);
  }

  const passwordMatch = await compare(password, client.password);

  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    {
      email: client.email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: client.id,
    }
  );

  return { token, client };
};

export default createSessionService;
