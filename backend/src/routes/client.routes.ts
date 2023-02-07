import { Router } from "express";

import ensureEmailAlreadyExistsMiddleware from "../middlewares/ensureEmailAlreadyExists.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

import createClientController from "../controllers/clients/createClient.controller";
import listClientsController from "../controllers/clients/listClients.controller";
import clientProfileController from "../controllers/clients/clientProfile.controller";
import updateClientController from "../controllers/clients/updateClient.controller";
import deleteClientController from "../controllers/clients/deleteClient.controller";

const clientRoutes = Router();

clientRoutes.post(
  "",
  ensureEmailAlreadyExistsMiddleware,
  createClientController
);
clientRoutes.get("", ensureAuthMiddleware, listClientsController);
clientRoutes.get("/profile", ensureAuthMiddleware, clientProfileController);
clientRoutes.patch("/:id", ensureAuthMiddleware, updateClientController);
clientRoutes.delete("/:id", ensureAuthMiddleware, deleteClientController);

export default clientRoutes;
