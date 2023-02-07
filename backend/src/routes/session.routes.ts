import { Router } from "express";
import ensureIsActiveMiddleware from "../middlewares/ensureIsActive.middleware";
import createSessionController from "../controllers/session/createSession.controller";

const sessionRoutes = Router();

sessionRoutes.post("", ensureIsActiveMiddleware, createSessionController);

export default sessionRoutes;
