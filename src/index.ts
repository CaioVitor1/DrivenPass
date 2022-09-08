import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import "express-async-errors";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());


const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server com TS rodando na porta: ${PORT}`);
});
