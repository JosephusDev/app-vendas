import prisma from '../config/prisma'
import { Venda } from '@prisma/client'

export const create = async (data: Omit<Venda, 'id' | 'status' | 'dataVenda' | 'created_at' | 'updated_at'>) => {
  return await prisma.venda.create({ data })
}

export const getAll = async () => {
  const vendas = await prisma.venda.findMany({
    select: {
      id: true,
      clienteId: true,
      dataVenda: true,
      status: true,
      usuarioId: true,
      cliente: {
        select: {
          nome: true
        }
      },
      usuario: {
        select: {
          nome: true
        }
      },
      itens: {
        select: {
          total: true
        }
      }
    },
    orderBy: {
      dataVenda: 'asc',
    },
  });

  // Calcular o total arrecadado por venda
  const vendasComTotais = vendas.map(venda => {
    const totalArrecadado = venda.itens.reduce((acc, item) => acc + item.total, 0);
    return {
      ...venda,
      total_geral: totalArrecadado,
    };
  });

  // Calcular o total geral
  const total_arrecadado = vendasComTotais.reduce((acc, venda) => acc + venda.total_geral, 0);

  return {
    vendas: vendasComTotais,
    total_arrecadado,
  };
};

export const getAllWithTotalAmounted = async () => {
  const vendas = await prisma.venda.findMany({
    select: {
      id: true,
      clienteId: true,
      dataVenda: true,
      status: true,
      usuarioId: true,
      cliente: {
        select: {
          nome: true
        }
      },
      usuario: {
        select: {
          nome: true
        }
      },
      itens: {
        select: {
          total: true
        }
      }
    },
    where: {
      status: 'CONCLUIDA',
    },
    orderBy: {
      dataVenda: 'asc',
    },
  });

  // Calcular o total arrecadado por venda
  const vendasComTotais = vendas.map(venda => {
    const totalArrecadado = venda.itens.reduce((acc, item) => acc + item.total, 0);
    return {
      ...venda,
      total_geral: totalArrecadado,
    };
  });

  // Calcular o total geral
  const total_arrecadado = vendasComTotais.reduce((acc, venda) => acc + venda.total_geral, 0);

  return {
    vendas: vendasComTotais,
    total_arrecadado,
  };
};


export const getUnique = async (id: string) => {
  return await prisma.venda.findUnique({ 
    where: { id },
    include: {
      cliente: {
        select: {
          nome: true
        }
      },
      usuario: {
        select: {
          nome: true
        }
      }
    }
  });
}

export const update = async (id: string, data: Partial<Venda>) => {
  return await prisma.venda.update({ where: { id }, data })
}

export const remove = async (id: string) => {
  return await prisma.venda.delete({ where: { id } })
}