import { Router } from 'express'
import {
  carregarTodos,
  atualizar,
  cadastrar,
  eliminar,
  carregarUnico
} from '../controllers/Produto'

const router = Router()

router.get('/', carregarTodos)
router.post('/', cadastrar)
router.get('/:id', carregarUnico)
router.put('/:id', atualizar)
router.delete('/:id', eliminar)

export default router
