import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IClientLogin } from "../../interfaces/client.interface";
import createSessionService from "../../services/session/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const data: IClientLogin = req.body;
  const token = await createSessionService(data);

  return res.status(200).json(instanceToPlain(token));
};

export default createSessionController;
