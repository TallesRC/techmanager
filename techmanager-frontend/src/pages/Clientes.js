import { useEffect, useState } from "react";
import api from "../services/api";

export default function Clientes() {

  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");

  const carregarClientes = async () => {

    const res = await api.get("/clientes");

    setClientes(res.data);
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const criarCliente = async () => {

    await api.post("/clientes", { nome });

    setNome("");

    carregarClientes();
  };

  return (
    <div>

      <h2>Clientes</h2>

      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do cliente"
      />

      <button onClick={criarCliente}>
        Criar
      </button>

      <ul>
        {clientes.map((c) => (
          <li key={c.id}>{c.nome}</li>
        ))}
      </ul>

    </div>
  );
}