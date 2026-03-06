import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {

      const response = await api.post("/auth/login", {
        email,
        senha
      });

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");

    } catch (error) {

      alert("Login inválido");

    }

  }

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded shadow w-96"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          TechManager
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 border mb-6"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Entrar
        </button>

      </form>

    </div>

  );
}