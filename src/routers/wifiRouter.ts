import { Router } from "express";
import { createWifi, deleteWifi, everyWifi, oneWifi } from "../controllers/wifiController";
import { validateSchema } from "../middlewares/schemaValidator";
import { validateToken } from "../middlewares/validateToken";
import { wifiSchema } from "../schemas/wifiSchema";


const wifiRouter = Router();

wifiRouter.post("/wifi/insert", validateSchema(wifiSchema), validateToken, createWifi );
wifiRouter.get("/wifi/:id", validateToken, oneWifi);
wifiRouter.get("/wifi", validateToken, everyWifi);
wifiRouter.delete("/wifi/:id", validateToken, deleteWifi)
export default wifiRouter;
