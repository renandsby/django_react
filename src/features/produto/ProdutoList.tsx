import React from "react";
import { Produto } from "./types";

type Props = {
  produtos: Produto[];
  onEdit: (p: Produto) => void;
  onDelete: (id: number) => void;
};

export default function ProdutoList({ produtos, onEdit, onDelete }: Props) {
  return (
    <ul>
      {produtos.map((produto) => (
        <li key={produto.id}>
          {produto.nome} - R$ {produto.preco}
          <button onClick={() => onEdit(produto)}>Editar</button>
          <button onClick={() => onDelete(produto.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}
