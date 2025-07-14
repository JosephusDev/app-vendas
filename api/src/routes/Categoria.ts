import { Router } from 'express'
import {
  cadastrar,
  carregarTodos,
  atualizar,
  eliminar,
  carregarDescricoes
} from '../controllers/Categoria'

const router = Router()

router.get('/', carregarTodos)
router.post('/', cadastrar)
router.get('/descricao', carregarDescricoes)
router.put('/:id', atualizar)
router.delete('/:id', eliminar)

export default router
