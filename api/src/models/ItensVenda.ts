import prisma from '../config/prisma'
import { VendaItem } from '@prisma/client'

export const create = async (data: Omit<VendaItem, 'id' | 'created_at' | 'updated_at'>) => {
  const stock = await prisma.produto.findUnique({
    where: {
      id: data.produtoId
    },
    select: {
      quantidade: true
    }
  })
  if (stock?.quantidade! < data.quantidade) {
    throw new Error('Quantidade insuficiente')
  }
  return await prisma.$transaction([
    prisma.vendaItem.create({ data }),
    prisma.produto.update({
      data: {
        quantidade: {
          decrement: data.quantidade
        }
      },
      where: {
        id: data.produtoId
      }
    })
  ]);
};

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
  const stock = await prisma.produto.findUnique({
    where: {
      id: data.produtoId
    },
    select: {
      quantidade: true
    }
  })
  if (stock?.quantidade! < data.quantidade!) {
    throw new Error('Quantidade insuficiente')
  }
  const item = await prisma.vendaItem.findUnique({
    where: {
      id
    },
    select: {
      quantidade: true
    }
  })
  if (item?.quantidade! > data.quantidade!) {
    await prisma.$transaction([
        prisma.produto.update({
          data: {
            quantidade: {
              increment: item?.quantidade! - data.quantidade!
            }
          },
          where: {
            id: data.produtoId
          }
        }),
        prisma.vendaItem.update({ where: { id }, data })
    ])
  }
  else if (item?.quantidade! < data.quantidade!) {
    await prisma.$transaction([
        prisma.produto.update({
          data: {
            quantidade: {
              decrement: data.quantidade! - item?.quantidade!
            }
          },
          where: {
            id: data.produtoId
          }
        }),
        prisma.vendaItem.update({ where: { id }, data })
    ])
  }
}

export const remove = async (id: string) => {
  const data = await prisma.vendaItem.findUnique({
    where: {
      id
    },
    include: {
      produto: true,
      venda: true
    }
  })
  return await prisma.$transaction([
    prisma.produto.update({
      data: {
        quantidade: {
          increment: data?.quantidade
        }
      },
      where: {
        id: data?.produtoId
      }
    }),
    prisma.vendaItem.delete({ where: { id } })
  ])
}
