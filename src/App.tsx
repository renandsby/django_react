import { useEffect, useState } from "react";
import { api } from "./services/api";

function App() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editando, setEditando] = useState(null);

  async function carregarProdutos() {
    try {
      const response = await api.get("/produtos/");
      console.debug("GET /produtos/ response:", response.data);
      const data = response.data && response.data.results ? response.data.results : response.data;
      setProdutos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("carregarProdutos erro", err);
      setProdutos([]);
    }
  }

  async function salvarProduto(e) {
    e.preventDefault();

    const dados = {
      nome,
      preco,
    };
    console.log("salvarProduto dados", dados, "editando", editando);
    if (editando) {
      await api.put(`/produtos/${editando}/`, dados);
    } else {
      await api.post(`/produtos/`, dados);
    }

    setNome("");
    setPreco("");
    setEditando(null);
    carregarProdutos();
  }

  function editarProduto(produto) {
    setNome(produto.nome);
    setPreco(produto.preco);
    setEditando(produto.id);
  }

  async function deletarProduto(id) {
    await api.delete(`/produtos/${id}/`);
    carregarProdutos();
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>CRUD de Produtos</h1>

      <form onSubmit={salvarProduto}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <button type="submit">
          {editando ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      <hr />

      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco}

            <button onClick={() => editarProduto(produto)}>
              Editar
            </button>

            <button onClick={() => deletarProduto(produto.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;