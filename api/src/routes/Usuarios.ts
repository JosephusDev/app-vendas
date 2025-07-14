import { Router } from 'express'
import {
  cadastrar,
  carregarTodos,
  atualizar,
  eliminar,
  login
} from '../controllers/Usuarios'

const router = Router()

router.get('/', carregarTodos)
router.post('/', cadastrar)
router.post('/login', login)
router.put('/:id', atualizar)
router.delete('/:id', eliminar)

export default router
