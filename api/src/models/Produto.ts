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

export const getUnique = async (id: string) => {
  return await prisma.produto.findUnique({ where: { id } });
}

export const update = async (id: string, data: Partial<Produto>) => {
  return await prisma.produto.update({ where: { id }, data })
}

export const remove = async (id: string) => {
  return await prisma.produto.delete({ where: { id } })
}