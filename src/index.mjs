import {
  createNotepad,
  readNotepad,
  deleteNotepad,
  updateNotepad,
} from "./notepad/notepad.service.mjs";

const notepadExample = {
  id: 10,
  title: "Um título aqui",
  subtitle: "Um subtítulo aqui",
  content:
    "Esse aqui é o conteúdo do JSON. Ele precisa ser um pouco mais extenso do que o título e o subtítulo.",
  createdAt: "2023-08-03T22:59:17.534Z",
};

updateNotepad("teste2.json", {
  subtitle: "Um novo subtítulo",
  content: "Um novo conteúdo",
});
//deleteNotepad("teste3.json");
//readNotepad("teste2.json");
//createNotepad("teste3.json", notepadExample);
