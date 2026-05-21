import { useEffect, useState } from "react";
import * as service from "./produtoService";
import { Produto } from "./types";

export default function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editando, setEditando] = useState<number | null>(null);

  async function carregarProdutos() {
    try {
      const response: any = await service.getAll();
      const data = response.data && response.data.results ? response.data.results : response.data;
      setProdutos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("carregarProdutos erro", err);
      setProdutos([]);
    }
  }

  async function salvarProduto(e?: any) {
    if (e && e.preventDefault) e.preventDefault();
    const dados = { nome, preco };
    try {
      if (editando) await service.updateProduto(editando, dados);
      else await service.createProduto(dados);
      setNome("");
      setPreco("");
      setEditando(null);
      carregarProdutos();
    } catch (err) {
      console.error("salvarProduto erro", err);
    }
  }

  function editarProduto(produto: Produto) {
    setNome(produto.nome);
    setPreco(produto.preco);
    setEditando(produto.id);
  }

  async function deletarProduto(id: number) {
    try {
      await service.deleteProduto(id);
      carregarProdutos();
    } catch (err) {
      console.error("deletarProduto erro", err);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  return {
    produtos,
    nome,
    setNome,
    preco,
    setPreco,
    editando,
    carregarProdutos,
    salvarProduto,
    editarProduto,
    deletarProduto,
  };
}
