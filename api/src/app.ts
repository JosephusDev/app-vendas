import express from 'express'
import usuariosRoutes from './routes/Usuarios'
import categoriaRoutes from './routes/Categoria'
import clienteRoutes from './routes/Cliente'
import produtoRoutes from './routes/Produto'
import vendaRoutes from './routes/Venda'
import itensVendaRoutes from './routes/ItensVenda'
import cors from 'cors'

// criando um servidor http
const app = express()

// a forma como o servidor vai entender as requisições
app.use(express.json())

// com Cors podemos definir quais origens podem requisitar a API
app.use(cors())
app.use('/usuarios', usuariosRoutes)
app.use('/categoria', categoriaRoutes)
app.use('/cliente', clienteRoutes)
app.use('/produto', produtoRoutes)
app.use('/venda', vendaRoutes)
app.use('/item-venda', itensVendaRoutes)

export default app