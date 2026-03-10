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
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Clientes
      </h2>

      <div className="bg-white p-4 rounded shadow mb-6">

        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do cliente"
          className="border p-2 mr-2"
        />

        <button
          onClick={criarCliente}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Novo Cliente
        </button>

      </div>

      <div className="bg-white p-4 rounded shadow">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Nome</th>
            </tr>
          </thead>

          <tbody>

            {clientes.map((cliente) => (

              <tr key={cliente.id} className="border-b">
                <td className="p-2">{cliente.nome}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}