import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Admin_Login from "./Components/Auth/Admin_Login";


function App() {
  return (
    <Router>
    <div>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/admin" element={<Admin_Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/home" element={<Home />} />
    <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
