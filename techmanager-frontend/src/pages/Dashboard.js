export default function Dashboard() {
  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-gray-500">Clientes</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-gray-500">Equipamentos</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-gray-500">Ordens de Serviço</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

      </div>
    </div>
  );
}