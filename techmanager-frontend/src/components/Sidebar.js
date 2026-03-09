import { Link } from "react-router-dom";

export default function Sidebar() {

// PARTE DO LOGOU
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };


  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        TechManager
      </h1>

      <nav className="flex flex-col gap-4">

        <Link to="/dashboard" className="hover:text-blue-400">
          Dashboard
        </Link>

        <Link to="/clientes" className="hover:text-blue-400">
          Clientes
        </Link>

        <Link to="/equipamentos" className="hover:text-blue-400">
          Equipamentos
        </Link>

        <Link to="/ordens" className="hover:text-blue-400">
          Ordens de Serviço
        </Link>

      </nav>

        <button
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Sair
      </button>

    </div>
  );
}