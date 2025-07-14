import prisma from '../config/prisma'
import { Categoria } from '@prisma/client'

export const create = async (data: Omit<Categoria, 'id' | 'created_at' | 'updated_at'>) => {
  return await prisma.categoria.create({ data })
}

export const getAll = async () => {
  return await prisma.categoria.findMany()
}

export const getDescriptions = async () => {
  return await prisma.categoria.findMany({
    select: {
      descricao: true
    },
    orderBy: {
      descricao: 'asc'
    }
  })
}

export const update = async (id: string, data: Partial<Categoria>) => {
  return await prisma.categoria.update({ where: { id }, data })
}

export const remove = async (id: string) => {
  return await prisma.categoria.delete({ where: { id } })
}