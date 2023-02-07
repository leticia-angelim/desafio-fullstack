import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Client } from "../../entities/client.entity";
import { Contact } from "../../entities/contact.entity";
import { IContact, IContactRequest } from "../../interfaces/contact.interface";

const createContactService = async (
  clientId: string,
  data: IContactRequest
): Promise<IContact> => {
  const { name, email, phone } = data;

  const clientRepository = AppDataSource.getRepository(Client);
  const contactRepository = AppDataSource.getRepository(Contact);

  const client = await clientRepository.findOneBy({ id: clientId });

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  const newContact = contactRepository.create({
    name,
    email,
    phone,
    client: client,
  });

  await contactRepository.save(newContact);

  return newContact;
};

export default createContactService;
