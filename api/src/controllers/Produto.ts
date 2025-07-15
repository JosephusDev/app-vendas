import { Request, Response } from 'express'
import {
  amountCollectedPerProduct,
  create, 
  getAll, 
  getUnique, 
  remove, 
  update
} from '../models/Produto'
import { ProdutoSchema } from '../schemas/Produto'
import {z} from "zod"

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const produto = await create(ProdutoSchema.parse(req.body))
    res.status(201).json(produto)
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
    const produtos = await getAll()
    res.status(200).json(produtos)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching', error })
  }
}

export const carregarProdutosPorTotalVendido = async (req: Request, res: Response) => {
  try {
    const { menos_vendidos } = req.query
    const produtos = await amountCollectedPerProduct({
      menos_vendidos: menos_vendidos === 'true'
    })
    res.status(200).json(produtos)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching', error })
  }
}

export const atualizar = async (req: Request, res: Response) => {
  try {
    const produto = await update(req.params.id, req.body)
    res.status(200).json(produto)
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
