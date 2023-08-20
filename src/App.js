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


  const [lstorage, setLstorage] = useState(false);
  

  const updateLocalStorage = (lstorage) => {
    setLstorage(localStorage.getItem("auth"));
    console.log(lstorage);
  };


  return (
    <div className="App">
      <BrowserRouter>
        <ApplicationBar></ApplicationBar>
        
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path="/loginAdmin"  element={updateLocalStorage&&<Login></Login> }/>  
          <Route exact path="/adminPage" element={ lstorage&&<VendingMachineSupplier/>} />
             
        </Routes>
      </BrowserRouter>

    </div>
    
  );
}

export default App;
