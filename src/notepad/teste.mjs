import * as notepadService from "./notepad.service.mjs";

const notepadExample = {
  id: 10,
  title: "Um título aqui",
  subtitle: "Um subtítulo aqui",
  content:
    "Esse aqui é o conteúdo do JSON. Ele precisa ser um pouco mais extenso do que o título e o subtítulo.",
  createdAt: "2023-08-03T22:59:17.534Z",
};

notepadService.updateNotepad("teste2.json", {
  subtitle: "Um novo subtítulo",
  content: "Um novo conteúdo",
});
notepadService.deleteNotepad("teste3.json");
notepadService.readNotepad("teste2.json");
notepadService.createNotepad("teste3.json", notepadExample);
