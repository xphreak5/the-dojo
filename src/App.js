import './App.css';

// Pages and components
import Dashboard from "./pages/dashboard/Dashboard"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Project from "./pages/project/Project"
import Create from "./pages/create/Create"
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import OnlineUsers from './components/OnlineUsers';


function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route exact path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route exact path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
              <Route exact path="/projects/:id" element={user ? <Project /> : <Navigate to="/login" />} />
              <Route exact path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route exact path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
