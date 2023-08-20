import logo from './logo.svg';
import './App.css';
import Home from '../src/components/Home/Home';

import Login from './components/Login/Login.js';

import Protected from './components/Protected';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import   { useEffect, useState} from 'react';
import ApplicationBar from './components/ApplicationBar';
import VendingMachineSupplier from './components/VendingMachineSupplier';
import { AuthContext } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("tokens") || ""
  );
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  console.log("authTokens", authTokens);

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    setAuthTokens("");
  };


  return (
    
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router>
      <div>
       <ApplicationBar></ApplicationBar>
        <Route exact path='/' element={<Home/>}></Route>
        <PrivateRoute exact path="/adminPage" element={ <VendingMachineSupplier/>} />
        <Route path="/loginAdmin" element={<Login></Login> } />
      </div>
    </Router>
  </AuthContext.Provider>

  );
}

export default App;
