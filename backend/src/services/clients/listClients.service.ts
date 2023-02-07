import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClient } from "../../interfaces/client.interface";

const listClientsService = async (): Promise<IClient[]> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const clients = clientRepository.find();

  return clients;
};

export default listClientsService;
