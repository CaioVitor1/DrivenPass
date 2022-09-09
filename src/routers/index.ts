import { Router } from "express";
import credentialsRouter from "./credentialsRouter";
import usersRouter from "./usersRouter";


const router = Router();
router.use(usersRouter);
router.use(credentialsRouter)
export default router;