import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomerDetail from "./pages/CustomerDetail";
import Matches from "./pages/Matches";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/customer/:id" element={<CustomerDetail />} />
      <Route path="/matches" element={<Matches />} />
    </Routes>
  );
}

export default App;