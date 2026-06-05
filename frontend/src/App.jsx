import "./App.css";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CustomerDetail from "./pages/CustomerDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/customer/:id" element={<CustomerDetail />} />
    </Routes>
  );
}

export default App;