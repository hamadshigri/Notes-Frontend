import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import ManageNotes from './pages/ManageNotes';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes >
          <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <Register />} />
          <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/note" element={<ManageNotes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App