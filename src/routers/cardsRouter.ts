import { Router } from "express";
import { createCard, deleteCard, everyCard, oneCard } from "../controllers/cardsController";
import { validateSchema } from "../middlewares/schemaValidator";
import { validateToken } from "../middlewares/validateToken";
import { cardsSchema } from "../schemas/cardsSchema";

const cardsRouter = Router();

cardsRouter.post("/card/insert", validateSchema(cardsSchema), validateToken, createCard );
cardsRouter.get("/card/:id", validateToken, oneCard);
cardsRouter.get("/card", validateToken, everyCard);
cardsRouter.delete("/card/:id", validateToken, deleteCard)
export default cardsRouter;
