import prisma from '../config/prisma'
import { Cliente } from '@prisma/client'

export const create = async (data: Omit<Cliente, 'id' | 'created_at' | 'updated_at'>) => {
  return await prisma.cliente.create({ data })
}

export const getAll = async () => {
  return await prisma.cliente.findMany({
    orderBy: {
      nome: 'asc'
    }
  })
}

export const getUnique = async (id: string) => {
  return await prisma.cliente.findUnique({ where: { id } });
}

export const update = async (id: string, data: Partial<Cliente>) => {
  return await prisma.cliente.update({ where: { id }, data })
}

export const remove = async (id: string) => {
  return await prisma.cliente.delete({ where: { id } })
}