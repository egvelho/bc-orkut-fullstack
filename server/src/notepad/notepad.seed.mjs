import * as notepadService from "./notepad.service.mjs";
import { faker } from "@faker-js/faker";

const defaultLimit = 10;

async function notepadSeed() {
  const limit = Number(process.argv[2]) || defaultLimit;
  console.log("Iniciando seeding...");
  console.log(`Vão ser criados ${limit} notepads`);
  for (let index = 0; index < limit; index++) {
    const notepadData = generateNotepad();
    const notepad = await notepadService.createNotepad(notepadData);
    console.log(`Criado notepad de id #${notepad.id}`);
  }
  console.log("Seeding realizado com sucesso!");
}

function generateNotepad() {
  return {
    title: faker.lorem.words(4 + Math.round(Math.random() * 4)),
    subtitle: faker.lorem.words(7 + Math.round(Math.random() * 7)),
    content: faker.lorem.paragraphs(1 + Math.round(Math.random() * 2)),
  };
}

notepadSeed();
