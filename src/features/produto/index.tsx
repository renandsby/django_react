import React from "react";
import ProdutoForm from "./ProdutoForm";
import ProdutoList from "./ProdutoList";
import useProdutos from "./useProdutos";

export default function ProdutoFeature() {
  const { produtos, nome, setNome, preco, setPreco, editando, salvarProduto, editarProduto, deletarProduto } = useProdutos();

  return (
    <div style={{ padding: 30 }}>
      <h1>CRUD de Produtos</h1>
      <ProdutoForm nome={nome} preco={preco} setNome={setNome} setPreco={setPreco} onSubmit={salvarProduto} editando={editando} />
      <hr />
      <ProdutoList produtos={produtos} onEdit={editarProduto} onDelete={deletarProduto} />
    </div>
  );
}
