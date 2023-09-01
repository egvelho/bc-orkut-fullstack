import { promises as fsp } from "fs";
import { db } from "../db.mjs";
import * as jsonService from "../json/json.service.mjs";
import { createNotepadSchema } from "./schemas/create-notepad.schema.mjs";
import { updateNotepadSchema } from "./schemas/update-notepad.schema.mjs";

const notepadsPath = "data/notepads";
const notepadLatestIdPath = "data/notepadsLatestId.json";

export async function listNotepads({ limit, offset }) {
  const notepadsFiles = await fsp.readdir(notepadsPath);
  const notepadsToLoad = notepadsFiles
    .sort((a, b) => {
      const idA = parseInt(a);
      const idB = parseInt(b);
      return idB - idA;
    })
    .slice(offset, limit + offset);
  const count = notepadsFiles.length;
  let notepads = [];
  for (const notepadFile of notepadsToLoad) {
    const currentNotepad = await jsonService.readJson(
      `${notepadsPath}/${notepadFile}`
    );
    notepads.push(currentNotepad);
  }
  return {
    notepads: notepads,
    count,
  };
}

export async function createNotepad(data) {
  await createNotepadSchema.parseAsync(data);
  const { notepadsLatestId } = await jsonService.readJson(notepadLatestIdPath);
  const notepadId = notepadsLatestId + 1;
  const nextNotepad = {
    createdAt: new Date().toJSON(),
    id: notepadId,
    ...data,
  };
  const path = `${notepadsPath}/${nextNotepad.id}.json`;
  await jsonService.createJson(path, nextNotepad);
  await jsonService.updateJson(notepadLatestIdPath, {
    notepadsLatestId: notepadId,
  });
  return nextNotepad;
}

export async function readNotepad(id) {
  const notepad = db
    .prepare(/* sql */ `select * from notepads where id=?`)
    .get(id);
  return notepad;
}

export async function updateNotepad(id, data) {
  await updateNotepadSchema.parseAsync(data);
  const path = `${notepadsPath}/${id}.json`;
  await jsonService.updateJson(path, data);
  const notepad = await jsonService.readJson(path);
  return notepad;
}

export async function deleteNotepad(id) {
  const path = `${notepadsPath}/${id}.json`;
  const notepad = await jsonService.readJson(path);
  await jsonService.deleteJson(path);
  return notepad;
}
