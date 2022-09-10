import { Router } from "express";
import { createSafeNotes, deleteSafeNote, everySafeNote, oneSafeNote } from "../controllers/safeNoteController";
import { validateSchema } from "../middlewares/schemaValidator";
import { validateToken } from "../middlewares/validateToken";
import { safeNoteSchema } from "../schemas/safeNoteSchema";


const safeNoteRouter = Router();

safeNoteRouter.post("/safenote/insert", validateSchema(safeNoteSchema), validateToken, createSafeNotes );
safeNoteRouter.get("/safeNote/:id", validateToken, oneSafeNote);
safeNoteRouter.get("/safeNotes", validateToken, everySafeNote);
safeNoteRouter.delete("/safeNote/:id", validateToken, deleteSafeNote)
export default safeNoteRouter;
