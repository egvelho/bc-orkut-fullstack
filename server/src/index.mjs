import "express-async-errors";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { ZodError } from "zod";
import { notepadController } from "./notepad/notepad.controller.mjs";

const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

function handleErrorMiddleware(err, req, res, next) {
  if (err instanceof ZodError) {
    console.error(err);
    return res.status(422).json(err);
  }

  throw err;
}

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/notepads", notepadController);
app.use(handleErrorMiddleware);

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
