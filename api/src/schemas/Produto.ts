import { z } from 'zod';

export const ProdutoSchema = z.object({
  id: z.string().optional(), // O MongoDB gera o ID automaticamente
  nome: z.string().trim().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  descricao: z.string().trim().min(5, { message: 'A descrição precisa ter no mínimo 5 caracteres.' }),
  preco: z.number().positive({ message: 'O preço deve ser um número positivo.' }),
  quantidade: z.number().int().positive({ message: 'A quantidade deve ser um número inteiro não negativo.' }),
  iva: z.number().min(0, { message: 'O IVA deve ser um número positivo ou zero.' }).max(100, { message: 'O IVA deve ser no máximo 100.' }),
  categoria: z.string({ message: 'A categoria é obrigatória.' }),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
});
