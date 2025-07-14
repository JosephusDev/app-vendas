import { Router } from 'express'
import {
  carregarTodos,
  atualizar,
  cadastrar,
  eliminar
} from '../controllers/ItensVenda'

const router = Router()

router.get('/:id', carregarTodos)
router.post('/', cadastrar)
router.put('/:id', atualizar)
router.delete('/:id', eliminar)

export default router
