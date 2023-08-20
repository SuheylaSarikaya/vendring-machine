import logo from './logo.svg';
import './App.css';
import Home from '../src/components/Home/Home';

import Login from './components/Login/Login.js';

import Protected from './components/Protected';
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom';
import   { useEffect, useState} from 'react';
import ApplicationBar from './components/ApplicationBar';
import VendingMachineSupplier from './components/VendingMachineSupplier';
function App() {

  if(localStorage.getItem("auth")){
    return <Navigate to="/loginAdmin" replace={true} />
  }


  return (
    <div className="App">
      <BrowserRouter>
        <ApplicationBar></ApplicationBar>
        
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path="/loginAdmin"  element={<Login></Login> }/>
         
          <Route exact path='/adminPage' element={<VendingMachineSupplier  ></VendingMachineSupplier> }></Route>
          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
