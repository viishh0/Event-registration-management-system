import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import RegistrationForm from "./pages/RegistrationForm";
import RegistrationList from "./pages/RegistrationList";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

      <Route path="/" element={<LoginPage />} />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>

        <Route
  path="/add-registration"
  element={
    <ProtectedRoute>
      <RegistrationForm />
    </ProtectedRoute>
  }
/>

       <Route
  path="/registration-list"
  element={
    <ProtectedRoute>
      <RegistrationList />
    </ProtectedRoute>
  }
/>
        <Route
          path="/about"
          element={<About />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;