import { z } from "zod";

const title = z
  .string()
  .min(4, {
    message: "O título precisa ter pelo menos 4 caracteres",
  })
  .max(96, {
    message: "O título precisa ter no máximo 96 caracteres",
  });

const subtitle = z
  .string()
  .min(8, {
    message: "O subtítulo precisa ter pelo menos 8 caracteres",
  })
  .max(128, {
    message: "O subtítulo precisa ter no máximo 128 caracteres",
  });

const content = z
  .string()
  .min(16, {
    message: "O conteúdo precisa ter pelo menos 16 caracteres",
  })
  .max(960, {
    message: "O conteúdo precisa ter no máximo 960 caracteres",
  });

export const createNotepadSchema = z.object({
  title,
  subtitle,
  content,
});
