import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomerDetail from "./pages/CustomerDetail";
import Matches from "./pages/Matches";
import SentMatches from "./pages/SentMatches";
import JourneyPipelinePage from "./pages/JourneyPipelinePage";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/customer/:id"
        element={<CustomerDetail />}
      />

      <Route
        path="/matches/:id"
        element={<Matches />}
      />

      <Route
        path="/sent-matches"
        element={<SentMatches />}
      />

      <Route
        path="/journey-pipeline"
        element={<JourneyPipelinePage />}
      />

      <Route
        path="/analytics"
        element={<Analytics />}
      />
    </Routes>


    
  );
}

export default App;