import logo from './logo.svg';
import './App.css';
import Home from '../src/components/Home/Home';

import Login from './components/Login/Login.js';

import Protected from './components/Protected';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import   { useEffect, useState} from 'react';
import ApplicationBar from './components/ApplicationBar';
import VendingMachineSupplier from './components/VendingMachineSupplier';
function App() {




  return (
    <div className="App">
      <BrowserRouter>
        <ApplicationBar></ApplicationBar>
        
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path="/loginAdmin"  element={<Login></Login> }/>{ localStorage.getItem("auth") && 
          <Route exact path="/adminPage" element={<VendingMachineSupplier/>} />
        }
          
    
        
        </Routes>
      </BrowserRouter>

    </div>
    
  );
}

export default App;
