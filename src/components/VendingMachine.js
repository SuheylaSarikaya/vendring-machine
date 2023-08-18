import { useEffect, useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
function VendingMachine(props) {
  const [insertedMoney, setInsertedMoney] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [change, setChange] = useState(0);
  const { productList } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const buyProduct = (product) => {
    fetch("/vendingMachine/buyProduct", {
      body: JSON.stringify(product),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      (response) => {
        response.json();
        setIsLoaded(false);
      },
      (error) => {
        setIsLoaded(false);
        setError(true);
      }
    );
  };

  const handleMoneyInsert = (amount) => {
    setInsertedMoney(insertedMoney + amount);
  };

  const handleProductSelect = (product) => {
    if (insertedMoney >= product.price) {
      setSelectedProduct(product);
      setChange(insertedMoney - product.price);
      setInsertedMoney(0);
      buyProduct(product);
    } else {
      alert("Not enough money inserted.");
    }
  };

  const handleRefund = () => {
    setInsertedMoney(0);
    setSelectedProduct(null);
    setChange(0);
  };

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  return (
    <div>
      <div className="machine">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            position: "relative",
          }}
        >
          {productList.map((product) => (
            <ImageButton
              focusRipple
              key={product.name}
              style={{
                width: "33.33%",
                height: "570px",
              }}
              onClick={() => handleProductSelect(product)}
            >
              <ImageSrc
                style={{
                  backgroundImage: `url(data:image/jpeg;base64,${product.img})`,
                  height: "570px",
                }}
              />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {product.name}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "33.33%",
            height: "5%",
            justifyContent: "center",
            alignItems: "right",
            backgroundColor: "#1E90FF",
            variant: "contained",
          }}
        >
          <p style={{ color: "#F8F8FF", fontSize: 18 }}>
            Inserted money: {insertedMoney}
          </p>
          <p style={{ color: "#F8F8FF", fontSize: 18 }}>
            {" "}
            (Tap on the product to buy{"\n"})
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => handleMoneyInsert(1)}>1 </Button>
          <Button onClick={() => handleMoneyInsert(5)}> 5 </Button>
          <Button onClick={() => handleMoneyInsert(10)}> 10 </Button>
          <Button onClick={() => handleMoneyInsert(20)}> 20 </Button>
          <Button
            onClick={handleRefund}
            disabled={(insertedMoney === 0) & (change === 0)}
          >
            Refund
          </Button>
        </div>

        <div
          style={{
            width: "33.33%",
            height: "5%",
            justifyContent: "center",
            alignItems: "left",
            backgroundColor: "#1E90FF",
            variant: "contained",
          }}
          disabled={selectedProduct ==!null ? true : false}
        >
          {selectedProduct && (
            <p style={{ color: "#F8F8FF", fontSize: 18 }}>
              Selected product: {selectedProduct.name} ({selectedProduct.price}{" "}
              units)
            </p>
          )}
          {change > 0 && (
            <p style={{ color: "#F8F8FF", fontSize: 18 }}>
              Change: {change} units
            </p>
          )}
          {selectedProduct === null}
        </div>
      </div>
    </div>
  );
}

export default VendingMachine;
