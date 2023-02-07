import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClient, IClientRequest } from "../../interfaces/client.interface";

const createClientService = async (
  client: IClientRequest
): Promise<IClient> => {
  const { name, email, password, phone } = client;

  const clientRepository = AppDataSource.getRepository(Client);

  const newClient: IClient = clientRepository.create({
    name,
    email,
    password: await hash(password, 10),
    phone,
  });

  await clientRepository.save(newClient);

  return newClient;
};

export default createClientService;
