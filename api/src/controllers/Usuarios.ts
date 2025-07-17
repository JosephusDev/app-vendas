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
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const data = UsuarioSchema.parse(req.body)
    const passwordHashed = bcrypt.hashSync(data.senha, 10)
    const usuario = await create({
      ...data,
      senha: passwordHashed
    })
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
    const data = await getUnique(usuario)
    if (!data) {
      res.status(400).json({ message: 'User not found.' })
      return
    }
    const passwordMatch = bcrypt.compareSync(senha, data.senha)
    if (!passwordMatch) {
      res.status(400).json({ message: 'Password does not match.' })
      return
    }
    if (!process.env.JWT_SECRET) {
      res.status(400).json({ message: 'JWT Secret key is missing.' })
      return
    }
    const token = jwt.sign({ id: data?.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })
    res.status(200).json({data, token})
  } catch (error) {
    if(error instanceof z.ZodError){
      res.status(400).json({ message: error?.errors[0]?.message})
    }else{
      res.status(400).json({ message: 'Error logging', error })
    }
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
    const data = UsuarioSchema.parse(req.body)
    if (data.senha) {
			const passwordHash = bcrypt.hashSync(data.senha, 10)
			data.senha = passwordHash
		}
    const usuarios = await update(req.params.id, data)
    res.status(200).json(usuarios)
  } catch (error) {
    if(error instanceof z.ZodError){
      res.status(400).json({ message: error?.errors[0]?.message})
    }else{
      res.status(400).json({ message: 'Error updating', error })
    }
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
