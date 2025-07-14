import prisma from '../config/prisma'
import { Usuario } from '@prisma/client'

export const create = async (data: Omit<Usuario, 'id' | 'created_at' | 'updated_at'>) => {
  return await prisma.usuario.create({ data })
}

export const getAll = async () => {
  return await prisma.usuario.findMany({
    where: {
      nivel: {
        not: 'ADMIN'
      }
    },
    orderBy: {
      nome: 'asc'
    }
  })
}

export const getUnique = async (usuario: string, senha: string) => {
  return await prisma.usuario.findFirst({ where: { usuario, senha } })
}

export const update = async (id: string, data: Partial<Usuario>) => {
  return await prisma.usuario.update({ where: { id }, data })
}

export const remove = async (id: string) => {
  return await prisma.usuario.delete({ where: { id } })
}
