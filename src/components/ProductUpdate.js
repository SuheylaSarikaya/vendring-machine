import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function ProductUpdate({ selectedProduct, setSelectedProduct }) {


  const updateCount = () => {
    fetch("/api/vendingMachine/updateCountProduct", {
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
        label="Product Stock Status"
        variant="filled"
        size="small"
        position="start"
        style={{ fontSize: 15 }}
        onChange={(e) =>
          setSelectedProduct({
            ...selectedProduct,
            count: Number(e.target.value),
          })
        }
        type="text"
        value={selectedProduct?.count}
      ></TextField>{" "}
      &nbsp;
      <Button
        style={{ fontSize: 12, width: "13%" }}
        variant="contained"
        onClick={() => {
          updateCount();
        
        }}
      >
        {" "}
        Update Product Count{" "}
      </Button>
    </div>
  );
}

export default ProductUpdate;
