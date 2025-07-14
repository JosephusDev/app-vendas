import { z } from 'zod';

export const ClienteSchema = z.object({
  id: z.string().optional(), // O MongoDB gera o ID automaticamente
  nome: z.string().trim().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  email: z.string().email({ message: 'E-mail inválido.' }),
  telefone: z.string().regex(/^\d{9}$/, { message: 'O telefone precisa ter 9 dígitos.' }),
  bi: z.string(),
  updated_at: z.date().optional(),
  created_at: z.date().optional()
});
