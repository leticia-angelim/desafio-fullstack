import { Router } from "express";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureContactPhoneAlreadyExistsMiddleware from "../middlewares/ensureContactPhoneAlreadyExists.middleware";

import createContactController from "../controllers/contacts/createContact.controller";
import listContactsController from "../controllers/contacts/listContacts.controller";
import updateContactController from "../controllers/contacts/updateContact.controller";
import deleteContactController from "../controllers/contacts/deleteContact.controller";

const contactRoutes = Router();

contactRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureContactPhoneAlreadyExistsMiddleware,
  createContactController
);
contactRoutes.get("", ensureAuthMiddleware, listContactsController);
contactRoutes.patch("/:id", ensureAuthMiddleware, updateContactController);
contactRoutes.delete("/:id", ensureAuthMiddleware, deleteContactController);

export default contactRoutes;
