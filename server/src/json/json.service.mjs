import { promises as fsp } from "fs";

export async function createJson(path, data) {
  const dataStr = JSON.stringify(data, null, 2);
  await fsp.writeFile(path, dataStr);
}

export async function readJson(path) {
  const dataBuffer = await fsp.readFile(path);
  const dataStr = dataBuffer.toString();
  const data = JSON.parse(dataStr);
  return data;
}

export async function updateJson(path, partialJson) {
  const oldJson = await readJson(path);
  const nextJson = { ...oldJson, ...partialJson };
  await createJson(path, nextJson);
}

export async function deleteJson(path) {
  await fsp.unlink(path);
}
