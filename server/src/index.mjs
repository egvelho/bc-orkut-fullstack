import express from "express";
import { notepadController } from "./notepad/notepad.controller.mjs";

const port = 8080;
const host = "0.0.0.0";
const app = express();

app.use(express.json());
app.use("/notepads", notepadController);

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
