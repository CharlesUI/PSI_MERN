import "./App.css";
import "./pages/pageStyles.css";
import { Routes, Route, Navigate } from "react-router-dom";

// COMPONENTS
import NavBar from "./components/NavBar";

// ROUTES
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import RecordsPage from "./pages/RecordsPage";
import ProfilePage from "./pages/ProfilePage";
import LogInPage from "./pages/LogInPage";

// HOOKS
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { state } = useAuthContext();

  console.log("Initial State in The App Component", state);

  return (
    <div className="App">
      <NavBar />
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={state.user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/inventory"
            element={state.user ? <InventoryPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/records"
            element={state.user ? <RecordsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={state.user ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!state.user ? <LogInPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
