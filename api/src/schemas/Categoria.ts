import { z } from 'zod';

export const CategoriaSchema = z.object({
  descricao: z.string()
    .min(3, { message: 'A categoria precisa ter no mínimo 3 caracteres.' })
    .max(30, { message: 'A categoria pode ter no máximo 30 caracteres.' })
    .trim()
    .transform((str) => 
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    )
});
