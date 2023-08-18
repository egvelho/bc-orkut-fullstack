import express from "express";
import * as notepadService from "./notepad.service.mjs";

export const notepadController = express.Router();

notepadController.get("/", async (req, res) => {
  const limit = Number(req.query.limit) || 30;
  const offset = Number(req.query.offset) || 0;
  const notepads = await notepadService.listNotepads({ limit, offset });
  res.status(200).json(notepads);
});

notepadController.get("/:id", async (req, res) => {
  const notepadId = req.params.id;
  const notepad = await notepadService.readNotepad(notepadId);
  res.status(200).json(notepad);
});

notepadController.post("/", async (req, res) => {
  const notepadData = req.body;
  const notepad = await notepadService.createNotepad(notepadData);
  res.status(201).json(notepad);
});

notepadController.delete("/:id", async (req, res) => {
  const notepadId = req.params.id;
  const notepad = await notepadService.deleteNotepad(notepadId);
  res.status(200).json(notepad);
});

notepadController.patch("/:id", async (req, res) => {
  const partialNotepad = req.body;
  const notepadId = req.params.id;
  const notepad = await notepadService.updateNotepad(notepadId, partialNotepad);
  res.status(200).json(notepad);
});
