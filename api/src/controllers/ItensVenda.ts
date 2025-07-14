import { Request, Response } from 'express'
import {
  create, 
  getAll,
  remove, 
  update
} from '../models/ItensVenda'
import {z} from "zod"
import { ItemVendaSchema } from '../schemas/ItemVenda'

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const itemVenda = await create(ItemVendaSchema.parse(req.body))
    res.status(201).json(itemVenda)
  } catch (error) {
    if(error instanceof z.ZodError){
      res.status(400).json({ message: error?.errors[0]?.message})
    }else{
      res.status(500).json({ message: 'Error creating', error })
    }
  }
}

export const carregarTodos = async (req: Request, res: Response) => {
  try {
    const id = req.params.id 
    const itens = await getAll({vendaId: id})
    res.status(200).json(itens)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching', error })
  }
}

export const atualizar = async (req: Request, res: Response) => {
  try {
    const item = await update(req.params.id, req.body)
    res.status(200).json(item)
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
