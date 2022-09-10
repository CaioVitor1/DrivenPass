import { Router } from "express";
import { createSafeNotes } from "../controllers/safeNoteController";
import { validateSchema } from "../middlewares/schemaValidator";
import { validateToken } from "../middlewares/validateToken";
import { safeNoteSchema } from "../schemas/safeNoteSchema";


const safeNoteRouter = Router();

safeNoteRouter.post("/safenote/insert", validateSchema(safeNoteSchema), validateToken, createSafeNotes );


export default safeNoteRouter;
