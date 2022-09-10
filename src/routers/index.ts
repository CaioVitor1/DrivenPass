import { Router } from "express";
import credentialsRouter from "./credentialsRouter";
import safeNoteRouter from "./safeNoteRouter";
import usersRouter from "./usersRouter";


const router = Router();
router.use(usersRouter);
router.use(credentialsRouter);
router.use(safeNoteRouter)
export default router;