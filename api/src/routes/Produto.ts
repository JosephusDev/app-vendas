import { Router } from 'express'
import {
  carregarTodos,
  atualizar,
  cadastrar,
  eliminar,
  carregarUnico,
  carregarProdutosPorTotalVendido
} from '../controllers/Produto'

const router = Router()

router.get('/total', carregarProdutosPorTotalVendido)
router.get('/:id', carregarUnico)
router.get('/', carregarTodos)
router.post('/', cadastrar)
router.put('/:id', atualizar)
router.delete('/:id', eliminar)

export default router
