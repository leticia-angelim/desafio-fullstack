import { Request, Response } from "express";
import listContactsService from "../../services/contacts/listContacts.service";

const listContactsController = async (req: Request, res: Response) => {
  const clientId: string = req.client.id;
  const contacts = await listContactsService(clientId);

  return res.status(200).json(contacts);
};

export default listContactsController;
