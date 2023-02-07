import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IClientRequest } from "../../interfaces/client.interface";
import createClientService from "../../services/clients/createClient.service";

const createClientController = async (req: Request, res: Response) => {
  const client: IClientRequest = req.body;
  const createdUser = await createClientService(client);

  return res.status(201).json(instanceToPlain(createdUser));
};

export default createClientController;
