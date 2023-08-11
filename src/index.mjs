import express from "express";
import * as notepadService from "./notepad/notepad.service.mjs";

const port = 8080;
const host = "0.0.0.0";
const app = express();

app.use(express.json());

app.get("/notepads/:id", async (req, res) => {
  const notepadId = req.params.id;
  const notepad = await notepadService.readNotepad(
    `data/notepads/${notepadId}.json`
  );
  res.status(200).json(notepad);
});

app.post("/notepads", async (req, res) => {
  const notepad = req.body;
  const path = `data/notepads/${notepad.id}.json`;
  await notepadService.createNotepad(path, notepad);
  res.status(201).json(notepad);
});

app.delete("/notepads/:id", async (req, res) => {
  const notepadId = req.params.id;
  const path = `data/notepads/${notepadId}.json`;
  const notepad = await notepadService.readNotepad(path);
  await notepadService.deleteNotepad(path);
  res.status(200).json(notepad);
});

app.patch("/notepads/:id", async (req, res) => {
  const notepadId = req.params.id;
  const partialNotepad = req.body;
  const path = `data/notepads/${notepadId}.json`;
  await notepadService.updateNotepad(path, partialNotepad);
  const notepad = await notepadService.readNotepad(path);
  res.status(200).json(notepad);
});

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
