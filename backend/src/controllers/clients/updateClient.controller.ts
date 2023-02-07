import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IClientUpdate } from "../../interfaces/client.interface";
import updateClientService from "../../services/clients/updateClient.service";

const updateClientController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const client: IClientUpdate = req.body;
  const idLoggedClient: string = req.client.id;

  const updatedClient = await updateClientService(id, client, idLoggedClient);

  return res.status(200).json(instanceToPlain(updatedClient));
};

export default updateClientController;
