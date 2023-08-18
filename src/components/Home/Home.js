import React, { useEffect, useState } from 'react';
import ReactDOM  from "react-dom";
import VendingMachine from '../VendingMachine';

import ProductUpdate from '../ProductUpdate';
import VendingMachineSupplier from '../VendingMachineSupplier';
import Login from '../Login/Login';
function Home(){
    const [isLoaded, setIsLoaded] = useState(false);
    const [productList, setProductList] = useState([]);
    const [error, setError]= useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);


    useEffect(() => {
        setIsLoaded(true);
    
        fetch('vendingMachine/getProduct')
          .then(response => response.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setProductList(result);
            },
            (error) => {
              setIsLoaded(false);
              setError(true);
            }
          
          )
    }, []);

    if(error){
      return <div>Error!!!!</div>
    }else if(!isLoaded){
      return <div>Loading...</div>
    }else{
      return (
          <div className="container">
        
                <VendingMachine productList={productList} ></VendingMachine>
                
              {
                  selectedProduct!==null&&<ProductUpdate selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
              }
          </div>
      );
    }

}

export default Home;