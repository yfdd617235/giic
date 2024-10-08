import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Cambia BrowserRouter por HashRouter
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router> {/* Cambiado a HashRouter */}
          {/* <main className="container mx-auto px-3 lg:px-25 pt-20 pb-20"> */}
          <main className=" mx-auto">
            <NavBar/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<h1><LoginPage /></h1>} />
              <Route element={<ProtectedRoute />}>
              <Route path="/register" element={<h1><RegisterPage /></h1>} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
            
          </main>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
