import { db } from "../db.mjs";
import { createNotepadSchema } from "./schemas/create-notepad.schema.mjs";

export async function listNotepads({ limit, offset }) {
  const notepads = db
    .prepare(
      /* sql */ `
    select * from notepads
      order by id desc limit ? offset ?`
    )
    .all(limit, offset);

  const { notepads_count: count } = db
    .prepare(/* sql */ `select count(id) as notepads_count from notepads`)
    .get();

  return {
    notepads,
    count,
  };
}

export async function createNotepad(data) {
  await createNotepadSchema.parseAsync(data);
  const nextNotepad = db
    .prepare(
      /* sql */ `
      insert into notepads (title, subtitle, content)
        values (?, ?, ?) returning *;`
    )
    .get(data.title, data.subtitle, data.content);
  return nextNotepad;
}

export async function readNotepad(id) {
  const notepad = db
    .prepare(/* sql */ `select * from notepads where id=?`)
    .get(id);
  return notepad;
}

export async function updateNotepad(id, data) {
  const notepad = db
    .prepare(
      /* sql */ `
      update notepads
        set title=?, subtitle=?, content=?
        where id=? returning *;`
    )
    .get(data.title, data.subtitle, data.content, id);
  return notepad;
}

export async function deleteNotepad(id) {
  const notepad = db
    .prepare(/* sql */ `delete from notepads where id=? returning *;`)
    .get(id);
  return notepad;
}
