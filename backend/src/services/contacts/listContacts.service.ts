import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { IContact } from "../../interfaces/contact.interface";

const listContactsService = async (id: string): Promise<IContact[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contacts = await contactRepository.find({
    where: {
      client: { id },
    },
  });

  return contacts;
};

export default listContactsService;
