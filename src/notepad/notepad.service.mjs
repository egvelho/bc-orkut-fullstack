import { promises as fsp } from "fs";

export async function createNotepad(path, notepad) {
  const notepadStr = JSON.stringify(notepad, null, 2);
  await fsp.writeFile(path, notepadStr);
}

export async function readNotepad(path) {
  const notepadBuffer = await fsp.readFile(path);
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
  await fsp.unlink(path);
}
