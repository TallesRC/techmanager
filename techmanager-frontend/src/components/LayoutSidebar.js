import Sidebar from "./Sidebar";

export default function LayoutSidebar({ children }) {

  const usuario = localStorage.getItem("usuario");

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="bg-white h-16 shadow flex items-center justify-end px-6">

          <div className="font-semibold text-gray-700">
            👤 {usuario || "Usuário"}
          </div>

        </div>

        {/* CONTEÚDO */}
        <div className="p-6 overflow-auto">

          {children}

        </div>

      </div>

    </div>
  );
}