import './App.css';

// Pages and components
import Dashboard from "./pages/dashboard/Dashboard"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Project from "./pages/project/Project"
import Create from "./pages/create/Create"
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
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
            <Switch>
              <Route exact path="/">{user ? <Dashboard /> : <Redirect to="/login" />}</Route>
              <Route exact path="/create">{user ? <Create /> : <Redirect to="/login" />}</Route>
              <Route exact path="/projects/:id">{user ? <Project /> : <Redirect to="/login" />}</Route>
              <Route exact path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
              <Route exact path="/signup">{!user ? <Signup /> : <Redirect to="/" />}</Route>
            </Switch>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
