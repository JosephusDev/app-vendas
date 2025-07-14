import { z } from 'zod';

export const ItemVendaSchema = z.object({
  id: z.string().optional(), // O MongoDB gera o ID automaticamente
  vendaId: z.string({
    message: 'O ID da venda é obrigatória'
  }),
  produtoId: z.string({
    message: 'O ID do produto é obrigatório'
  }),
  quantidade: z.number({
    message: 'A quantidade é obrigatória'
  }),
  total: z.number({
    message: 'O total é obrigatório'
  }),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
});
