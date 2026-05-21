import React from "react";

type Props = {
  nome: string;
  preco: string;
  setNome: (v: string) => void;
  setPreco: (v: string) => void;
  onSubmit: (e?: any) => void;
  onCancel?: () => void;
  editando?: number | null;
};

export default function ProdutoForm({ nome, preco, setNome, setPreco, onSubmit, editando }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
      <button type="submit">{editando ? "Atualizar" : "Cadastrar"}</button>
    </form>
  );
}
