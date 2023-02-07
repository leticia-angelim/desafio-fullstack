import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";

import clientRoutes from "./routes/client.routes";
import sessionRoutes from "./routes/session.routes";
import contactRoutes from "./routes/contact.routes";

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/clients", clientRoutes);
app.use("/login", sessionRoutes);
app.use("/contacts", contactRoutes);

app.use(errorMiddleware);

app.listen(3001, () => {
  console.log("Server running");
});
