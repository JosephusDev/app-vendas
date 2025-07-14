import { Router } from 'express'
import {
  cadastrar,
  carregarTodos,
  atualizar,
  eliminar,
  carregarUnico
} from '../controllers/Cliente'

const router = Router()

router.get('/', carregarTodos)
router.post('/', cadastrar)
router.get('/:id', carregarUnico)
router.put('/:id', atualizar)
router.delete('/:id', eliminar)

export default router
