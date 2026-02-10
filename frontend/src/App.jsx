import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Agents from "./pages/Agents";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./routes/ProtectedRoute";
import AgentDashboard from "./pages/AgentDashboard";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login/admin" element={<Login role="admin" />} />
        <Route path="/login/agent" element={<Login role="agent" />} />

        {/* Dashboard main */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Dashboard sub-pages */}
        <Route
          path="/admin-dashboard/agents"
          element={
            <ProtectedRoute>
              <Layout>
                <Agents />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard/tasks"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <Tasks />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/agent-dashboard" element={
          <ProtectedRoute role="agent">
            <Layout>
              <AgentDashboard />
              </Layout>
          </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
