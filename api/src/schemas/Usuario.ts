import { z } from 'zod';

export const UsuarioSchema = z.object({
  id: z.string().optional(), // O MongoDB gera o ID automaticamente
  nome: z.string().trim().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  usuario: z.string().trim().min(3, { message: 'O usuário precisa ter no mínimo 3 caracteres.' }),
  senha: z.string().trim().min(6, { message: 'A senha precisa ter no mínimo 6 caracteres.' }),
  email: z.string({
    message: 'O E-mail é obrigatório'
  }).email({ message: 'E-mail inválido.' }),
  telefone: z.string({
    message: 'O telefone é obrigatório'
  }).regex(/^\d{9}$/, { message: 'O telefone precisa ter 9 dígitos.' }),
  nivel: z.enum(['ADMIN', 'USUARIO'], { message: 'Nível inválido.' }),
  updated_at: z.date().optional(),
  created_at: z.date().optional()
});