import { Request, Response } from 'express'
import {
  create, 
  getAll, 
  getDescriptions, 
  remove, 
  update
} from '../models/Categoria'
import { CategoriaSchema } from '../schemas/Categoria'
import {z} from "zod"
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const categoria = await create(CategoriaSchema.parse(req.body))
    res.status(201).json(categoria)
  } catch (error) {
    if(error instanceof z.ZodError){
      res.status(400).json({ message: error?.errors[0]?.message})
    }else if(error instanceof PrismaClientKnownRequestError && error.code === 'P2002'){
      res.status(400).json({ message: 'Esta categoria já existe.' })
    }
    else{
      res.status(500).json({ message: 'Error creating', error })
    }
  }
}

export const carregarDescricoes = async (req: Request, res: Response) => {
  try {
    const data = await getDescriptions();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching category', error });
  }
}

export const carregarTodos = async (req: Request, res: Response) => {
  try {
    const categoria = await getAll()
    res.status(200).json(categoria)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching', error })
  }
}

export const atualizar = async (req: Request, res: Response) => {
  try {
    const categoria = await update(req.params.id, req.body)
    res.status(200).json(categoria)
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
