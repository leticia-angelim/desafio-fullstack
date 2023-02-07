import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Client } from "../../entities/client.entity";

const deleteClientService = async (
  id: string,
  idLoggedClient: string
): Promise<void> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOneBy({ id });

  if (id !== idLoggedClient) {
    throw new AppError("Not authorized", 401);
  }

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  await clientRepository.update(id, {
    isActive: false,
  });
};

export default deleteClientService;
