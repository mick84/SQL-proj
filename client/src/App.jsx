import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/nav/Nav";
import { useAuth } from "./context/UserCtx";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { LeadsPage } from "./pages/LeadsPage";
function App() {
  const { state, dispatch } = useAuth();

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="auth/register"
          element={state.user ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/leads"
          element={state.user ? <LeadsPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="auth/login"
          element={state.user ? <Navigate to="/" replace /> : <Login />}
        />
      </Routes>
    </div>
  );
}
export default App;
