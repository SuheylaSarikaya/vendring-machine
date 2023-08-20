import { useEffect, useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProductUpdate from "./ProductUpdate";
import PriceUpdate from "./PriceUpdate";
import { styled } from "@mui/material/styles";
import sup from "./VendingMachineSupplier.css";
function VendingMachineSupplier() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState(null);
  const [count, setCount] = useState(null);
  const [reset, setReset] = useState(false);
  const [collect, setCollect] = useState(false);

  const resetMachine = () => {
    fetch("/api/vendingMachine/resetMachine", {
      body: JSON.stringify(),
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

  const collectMoney = () => {
    fetch("/api/vendingMachine/collectMoney", {
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

  useEffect(() => {
    setIsLoaded(true);

    fetch("/api/vendingMachine/getProduct")
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setProductList(result);
        },
        (error) => {
          setIsLoaded(false);
          setError(true);
        }
      );
  }, []);

  return (
    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
        className="Sup"
      >
        &nbsp;
        {productList.map((product) => (
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia
              component="img"
              alt=""
              height="400"
              src={`data:image/jped;base64, ${product.img}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Product price : {product.price} - Product count: {product.count}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  setSelectedProduct(product);
                  setCount(product);
                }}
              >
                Update Stock
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setSelectedProduct(product);
                  setPrice(product);
                }}
              >
                Update Price
              </Button>
            </CardActions>
          </Card>
        ))}
        &nbsp;
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        &nbsp;
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setReset(!reset);
              resetMachine();
            }}
          >
            Reset machine
          </Button>
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}>
          
            <ProductUpdate
              selectedProduct={count}
              setSelectedProduct={setCount}
            />

            <PriceUpdate
              selectedProduct={price}
              setSelectedProduct={setPrice}         
            />
         
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setCollect(!collect);
              collectMoney();
            }}
          >
            Collect money
          </Button>
        </div>
        &nbsp;
      </div>
    </div>
  );
}

export default VendingMachineSupplier;
