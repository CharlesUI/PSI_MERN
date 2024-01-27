import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import InventoryPage from "./pages/InventoryPage";
import PosPage from './pages/PosPage'
import SalesReportPage from './pages/SalesReportPage'
import NavBar from "./components/NavBar";

import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext()

  return (
    <div className="app">
      <NavBar />
      <div className="pages">
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to={'/login'}/>} />
          <Route path="/login" element={!user ? <LogInPage /> : <Navigate to={'/'}/>} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to={'/login'}/>} />
          <Route path="/inventory" element={user ? <InventoryPage /> : <Navigate to={'/login'}/>} />
          <Route path="/pos" element={user ? <PosPage /> : <Navigate to={'/login'}/>} />
          <Route path="/sales-report" element={user ? <SalesReportPage /> : <Navigate to={'/login'}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
