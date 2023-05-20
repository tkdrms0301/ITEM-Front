import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Handyman from "@mui/icons-material/Handyman";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import HomeIcon from "@mui/icons-material/Home";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation({ content }) {
  const currentNav = useLocation();
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    navigate(`/${newValue}`, { replace: true });
    setValue(newValue);
  };

  useEffect(() => {
    setValue(new URL(window.location.href).pathname.split("/")[1]);
  }, [content]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        borderTop: `1px solid black`,
        zIndex: 1200,
      }}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Market"
          icon={<ShoppingBasketIcon />}
          value="market"
        />
        <BottomNavigationAction
          label="RepairService"
          icon={<Handyman />}
          value="repair"
        />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} value="" />
        <BottomNavigationAction
          label="Community"
          icon={<PeopleIcon />}
          value="community"
        />
        <BottomNavigationAction
          label="MyPage"
          icon={<PersonIcon />}
          value="mypage"
        />
      </BottomNavigation>
    </Box>
  );
}
