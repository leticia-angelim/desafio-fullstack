import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IContactRequest } from "../../interfaces/contact.interface";
import createContactService from "../../services/contacts/createContact.service";

const createContactController = async (req: Request, res: Response) => {
  const clientId: string = req.client.id;
  const contact: IContactRequest = req.body;
  const createdContact = await createContactService(clientId, contact);

  return res.status(201).json(instanceToPlain(createdContact));
};

export default createContactController;
