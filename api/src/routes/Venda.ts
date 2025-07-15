import { Router } from 'express'
import {
  carregarTodos,
  atualizar,
  cadastrar,
  eliminar,
  carregarUnico,
  carregarTodosComTotal
} from '../controllers/Venda'

const router = Router()


router.get('/total', carregarTodosComTotal)
router.get('/:id', carregarUnico)
router.get('/', carregarTodos)
router.post('/', cadastrar)
router.put('/:id', atualizar)
router.delete('/:id', eliminar)

export default router
