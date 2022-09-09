import { Router } from "express";
import { createCredentials, deleteCredential, everyCredential, oneCredential } from "../controllers/credentialsController";
import { validateSchema } from "../middlewares/schemaValidator";
import { validateToken } from "../middlewares/validateToken";
import { credentialsSchema } from "../schemas/credentialsSchema";

const credentialsRouter = Router();

credentialsRouter.post("/credentials/insert", validateSchema(credentialsSchema), validateToken, createCredentials);
credentialsRouter.get("/credentials/:id", validateToken, oneCredential);
credentialsRouter.get("/credentials", validateToken, everyCredential);
credentialsRouter.delete("/credentials/:id", validateToken, deleteCredential)
export default credentialsRouter;
