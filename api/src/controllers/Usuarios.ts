import { Request, Response } from 'express'
import {
  create, 
  getAll, 
  getUnique, 
  remove, 
  update
} from '../models/Usuarios'
import { Usuario } from '@prisma/client'
import { UsuarioSchema } from '../schemas/Usuario'
import {z} from "zod"

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const usuario = await create(UsuarioSchema.parse(req.body))
    res.status(201).json(usuario)
  } catch (error) {
    if(error instanceof z.ZodError){
      res.status(400).json({ message: error?.errors[0]?.message})
    }else{
      res.status(500).json({ message: 'Error creating', error })
    }
  }
}

export const login = async (req: Request<{}, {}, Pick<Usuario, "usuario" | "senha">>, res: Response) => {
  try {
    const { usuario, senha } = req.body
    const data = await getUnique(usuario, senha)
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ message: 'Error logging', error })
  }
}
export const carregarTodos = async (req: Request, res: Response) => {
  try {
    const usuarios = await getAll()
    res.status(200).json(usuarios)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching', error })
  }
}

export const atualizar = async (req: Request, res: Response) => {
  try {
    const usuarios = await update(req.params.id, req.body)
    res.status(200).json(usuarios)
  } catch (error) {
    res.status(400).json({ message: 'Error updating', error })
  }
}

export const eliminar = async (req: Request, res: Response) => {
  try {
    await remove(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Error deleting', error })
  }
}
