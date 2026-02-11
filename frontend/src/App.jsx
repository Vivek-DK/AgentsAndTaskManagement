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

        {/* public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login/admin" element={<Login role="admin" />} />
        <Route path="/login/agent" element={<Login role="agent" />} />

        {/* admin dashboard main */}
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

        {/* admin agents page */}
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

        {/* admin tasks page (admin only) */}
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

        {/* agent dashboard */}
        <Route
          path="/agent-dashboard"
          element={
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
