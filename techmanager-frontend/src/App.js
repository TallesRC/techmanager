import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Equipamentos from "./pages/Equipamentos";
import OrdensServico from "./pages/OrdensServico";

import LayoutSidebar from "./components/LayoutSidebar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <LayoutSidebar>
                <Dashboard />
              </LayoutSidebar>
            </PrivateRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <LayoutSidebar>
                <Clientes />
              </LayoutSidebar>
            </PrivateRoute>
          }
        />

        <Route
          path="/equipamentos"
          element={
            <PrivateRoute>
              <LayoutSidebar>
                <Equipamentos />
              </LayoutSidebar>
            </PrivateRoute>
          }
        />

        <Route
          path="/ordens"
          element={
            <PrivateRoute>
              <LayoutSidebar>
                <OrdensServico />
              </LayoutSidebar>
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;