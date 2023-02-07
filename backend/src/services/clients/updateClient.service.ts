import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Client } from "../../entities/client.entity";
import { IClient, IClientUpdate } from "../../interfaces/client.interface";

const updateClientService = async (
  id: string,
  client: IClientUpdate,
  idLoggedClient: string
): Promise<IClient> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOneBy({ id });

  const { name, email, password, phone } = client;

  if (id !== idLoggedClient) {
    throw new AppError("Not authorized", 401);
  }

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  await clientRepository.update(id, {
    name: name ? name : findClient.name,
    email: email ? email : findClient.email,
    password: password ? await hash(password, 10) : findClient.password,
    phone: phone ? phone : findClient.phone,
  });

  const updatedClient = await clientRepository.findOneBy({
    id,
  });

  return updatedClient!;
};

export default updateClientService;
