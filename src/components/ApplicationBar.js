import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Home from "./Home/Home";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Login from "./Login/Login";
import VendingMachineSupplier from "./VendingMachineSupplier";
const drawerWidth = 240;
const navItems = ["Home", "Admin Page"];

function ApplicationBar() {
  const navigate=useNavigate();
  return (
    <Box sx={{ flexGrow: 1, height: "5%" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "left",
              color: "#D3D3D3",
            }}
          >
            VENDING MACHINE
          </Typography>
          <Link to="/" underline="none">
            <Button
              style={{ color: "#F8F8FF", fontSize: 15 }}
              color="inherit"
              onClick={() => {
                <Home />;
                localStorage.removeItem("auth");
              }}
            >
              HOME
            </Button>
          </Link>
          {!localStorage.getItem("auth")&&<Link to="/loginAdmin">
            <Button
              style={{ color: "#F8F8FF", fontSize: 15 }}
              color="inherit"
              onClick={() => {
                <Login />;
              }}
            >
              ADMIN LOGIN
            </Button>
          </Link>
            }
            {localStorage.getItem("auth")&&<Button
              style={{ color: "#F8F8FF", fontSize: 15 }}
              color="inherit"
              onClick={() => {
                localStorage.removeItem("auth");
                navigate('/loginAdmin');
              }}
            >
              LOGOUT
            </Button>
          }
            
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ApplicationBar;

/*
{<Button
              style={{ color: "#F8F8FF", fontSize: 15 }}
              color="inherit"
              onClick={() => {
      
                navigate('/loginAdmin');
              }}
            >
              LOGOUT
            </Button>
          }
          
          */