import { create } from "domain";
import fs from "fs";

export async function createNotepad(path, notepad) {
  const notepadStr = JSON.stringify(notepad, null, 2);
  await fs.promises.writeFile(path, notepadStr);
}

export async function readNotepad(path) {
  const notepadBuffer = await fs.promises.readFile(path);
  const notepadStr = notepadBuffer.toString();
  const notepad = JSON.parse(notepadStr);
  return notepad;
}

export async function updateNotepad(path, partialNotepad) {
  const oldNotepad = await readNotepad(path);
  const nextNotepad = { ...oldNotepad, ...partialNotepad };
  await createNotepad(path, nextNotepad);
}

export async function deleteNotepad(path) {
  await fs.promises.unlink(path);
}
