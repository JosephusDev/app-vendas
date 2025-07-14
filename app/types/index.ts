export type Categoria = {
    id: string,
    descricao: string,
}

export type Usuario = {
    id: string,
    nome: string,
    usuario: string,
    senha: string
    email: string,
    telefone: string,
    nivel: string
}

export type Cliente = {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    bi: string;
}

export type Produto = {
    id: string;
    nome: string;
    descricao: string;
    preco: string;
    iva: string;
    quantidade: string;
    categoria: string;
}

export type Venda = {
    id: string;
    dataVenda: string;
    status: string;
    usuarioId: string;
    clienteId: string;
}