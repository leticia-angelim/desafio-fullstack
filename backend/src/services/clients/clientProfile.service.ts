import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClient } from "../../interfaces/client.interface";

const clientProfileService = async (id: string): Promise<IClient> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOne({
    where: {
      id,
    },
    relations: {
      contacts: true,
    },
  });

  return findClient!;
};

export default clientProfileService;
