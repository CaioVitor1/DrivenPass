import { Router } from "express";
import { createUser, login } from "../controllers/usersController";
import { validateSchema } from "../middlewares/schemaValidator";
import { userSchema } from "../schemas/usersSchema";



const usersRouter = Router();

usersRouter.post("/signup", validateSchema(userSchema), createUser);
usersRouter.post("/signin", validateSchema(userSchema), login);


export default usersRouter;
