import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/appError";

const deleteContactService = async (id: string): Promise<void> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const findContact = await contactRepository.findOneBy({ id });

  if (!findContact) {
    throw new AppError("Contact not found", 404);
  }

  await contactRepository.delete({ id });
};

export default deleteContactService;
