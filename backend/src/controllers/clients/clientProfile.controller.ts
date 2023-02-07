import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import clientProfileService from "../../services/clients/clientProfile.service";

const clientProfileController = async (req: Request, res: Response) => {
  const id: string = req.client.id;
  const client = await clientProfileService(id);

  return res.status(200).json(instanceToPlain(client));
};

export default clientProfileController;
