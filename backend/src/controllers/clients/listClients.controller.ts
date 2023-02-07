import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import listClientsService from "../../services/clients/listClients.service";

const listClientsController = async (req: Request, res: Response) => {
  const clients = await listClientsService();

  return res.status(200).json(instanceToPlain(clients));
};

export default listClientsController;
