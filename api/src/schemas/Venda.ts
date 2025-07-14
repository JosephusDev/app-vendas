import { z } from 'zod';

export const VendaSchema = z.object({
  id: z.string().optional(), // O MongoDB gera o ID automaticamente
  clienteId: z.string({
    message: 'O ID do cliente é obrigatório'
  }),
  usuarioId: z.string({
    message: 'O ID do usuário é obrigatório'
  }),
  dataVenda: z.date({
    message: 'A data da venda é obrigatória'
  }).optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
});
