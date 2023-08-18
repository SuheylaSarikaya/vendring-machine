import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { positions } from '@mui/system';
function PriceUpdate({ selectedProduct, setSelectedProduct }) {

  const updatePrice = () => {
    fetch("vendingMachine/updatePriceProduct", {
      body: JSON.stringify(selectedProduct),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  
  return (
    <div
      
      style={{
        fontSize: 15,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <TextField
        id="filled-standard-basic"
        label="Product price"
        variant="filled"
        size="small"
        
        style={{ fontSize: 15 }}
        onChange={(e) =>
          setSelectedProduct({
            ...selectedProduct,
            price: Number(e.target.value),
          })
        }
        type="text"
        value={selectedProduct?.price}
      ></TextField>
      &nbsp;
      <Button
        style={{ fontSize: 12, width: "10%" }}
        variant="contained"
        onClick={() => {
          updatePrice();
        }}
      >
        {" "}
        Update Price{" "}
      </Button>
    </div>
  );
}

export default PriceUpdate;
