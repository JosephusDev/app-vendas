import { Request, Response } from 'express'
import {
  create, 
  getAll, 
  getUnique, 
  remove, 
  update
} from '../models/Venda'
import {z} from "zod"
import { VendaSchema } from '../schemas/Venda'

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const venda = await create(VendaSchema.parse(req.body))
    res.status(201).json(venda)
  } catch (error) {
    if(error instanceof z.ZodError){
      res.status(400).json({ message: error?.errors[0]?.message})
    }else{
      res.status(500).json({ message: 'Error creating', error })
    }
  }
}

export const carregarUnico = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Aqui você deve usar req.params
    const data = await getUnique(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching category', error });
  }
}

export const carregarTodos = async (req: Request, res: Response) => {
  try {
    const vendas = await getAll()
    res.status(200).json(vendas)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching', error })
  }
}

export const atualizar = async (req: Request, res: Response) => {
  try {
    const venda = await update(req.params.id, req.body)
    res.status(200).json(venda)
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
