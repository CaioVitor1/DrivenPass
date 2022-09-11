import { Router } from "express";
import cardsRouter from "./cardsRouter";
import credentialsRouter from "./credentialsRouter";
import safeNoteRouter from "./safeNoteRouter";
import usersRouter from "./usersRouter";


const router = Router();
router.use(usersRouter);
router.use(credentialsRouter);
router.use(safeNoteRouter)
router.use(cardsRouter)
export default router;