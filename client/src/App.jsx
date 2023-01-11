import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/nav/Nav";
import { AuthProvider, useAuth } from "./context/UserCtx";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  const { state, dispatch } = useAuth();
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/login" element={<Login />} />
      </Routes>
    </div>
  );
}
export default App;
