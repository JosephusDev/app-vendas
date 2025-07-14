import prisma from '../config/prisma'
import { VendaItem } from '@prisma/client'

export const create = async (data: Omit<VendaItem, 'id' | 'created_at' | 'updated_at'>) => {
  return await prisma.vendaItem.create({ data })
}

export const getAll = async ({vendaId}: {vendaId: string}) => { 
  const itens = await prisma.vendaItem.findMany({
    select: {
      id: true,
      vendaId: true,
      produtoId: true,
      quantidade: true,
      total: true,
      produto: {
        select: {
          nome: true
        }
      }
    },
    orderBy: {
      produto: {
        nome: 'asc'
      },
    },
    where: {
      vendaId
    }
  })
  const total_geral = await prisma.vendaItem.aggregate({
    where: {
      vendaId
    },
    _sum: {
      total: true
    }
  })
  return {
    itens,
    total_geral: total_geral._sum.total
  }
}

export const update = async (id: string, data: Partial<VendaItem>) => {
  return await prisma.vendaItem.update({ where: { id }, data })
}

export const remove = async (id: string) => {
  return await prisma.vendaItem.delete({ where: { id } })
}
