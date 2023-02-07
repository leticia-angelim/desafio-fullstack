import { Request, Response } from "express";
import deleteClientService from "../../services/clients/deleteClient.service";

const deleteClientController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const idLoggedClient: string = req.client.id;

  await deleteClientService(id, idLoggedClient);

  return res.status(204).send();
};

export default deleteClientController;
