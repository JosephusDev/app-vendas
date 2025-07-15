import prisma from '../config/prisma'
import { Produto } from '@prisma/client'

export const create = async (data: Omit<Produto, 'id' | 'created_at' | 'updated_at'>) => {
  return await prisma.produto.create({ data })
}

export const getAll = async () => {
  return await prisma.produto.findMany({
    select: {
      id: true,
      nome: true,
      preco: true,
      quantidade: true,
      descricao: true,
      iva: true,
      categoria: true
    },
    orderBy: {
      nome: 'asc',
    },
  })
}

export const amountCollectedPerProduct = async ({
  menos_vendidos = false
}: {menos_vendidos: boolean}) => {
  const result = await prisma.vendaItem.groupBy({
    by: ['produtoId'],
    where: {
      venda: {
        status: 'CONCLUIDA'
      }
    },
    _sum: {
      total: true,
    },
    orderBy: {
      _sum: {
        total: menos_vendidos ? 'asc' : 'desc'
      }
    },
    take: 3
  });

  const products = await Promise.all(
    result.map(async (item) => {
      const produto = await prisma.produto.findUnique({
        where: { id: item.produtoId },
        select: { nome: true }
      });
      return {
        produtoId: item.produtoId,
        nome: produto?.nome,
        total: item._sum.total
      };
    })
  );
  return products
}

export const getUnique = async (id: string) => {
  return await prisma.produto.findUnique({ where: { id } });
}

export const update = async (id: string, data: Partial<Produto>) => {
  return await prisma.produto.update({ where: { id }, data })
}

export const remove = async (id: string) => {
  return await prisma.produto.delete({ where: { id } })
}