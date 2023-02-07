import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Contact } from "../../entities/contact.entity";
import { IContact, IContactUpdate } from "../../interfaces/contact.interface";

const updateContactService = async (
  id: string,
  contact: IContactUpdate
): Promise<IContact> => {
  const { name, email, phone } = contact;
  const contactRepository = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOneBy({ id });

  if (!findContact) {
    throw new AppError("Contact not found", 404);
  }

  await contactRepository.update(id, {
    name: name ? name : findContact.name,
    email: email ? email : findContact.email,
    phone: phone ? phone : findContact.phone,
  });

  const updatedContact = await contactRepository.findOneBy({ id });

  return updatedContact!;
};

export default updateContactService;
