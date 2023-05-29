import { Mail, Notifications, Pets } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, InputBase, Menu, MenuItem, styled, Toolbar, Typography, } from "@mui/material";
import React, { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
const myImage = require("../image/logo.png");

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
      const navigationTo = async () => {
              setCurrentUser(await JSON.parse(localStorage.getItem('userLogedIn')));
              setIsLoaded(true);
          
      }
      navigationTo();
  }, []);

  // LOGOUT
  
  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <>
    {currentUser && (
    <AppBar position="sticky" style={{ backgroundColor: 'white' }} >
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          <StyledToolbar>
            <img src={myImage} alt="My Image" style={{ width: '50px' }} />
            <h4 style={{ color: 'GoldenRod' }}     > Travel Me</h4>
          </StyledToolbar>
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />

        <Search style={{ backgroundColor: 'GhostWhite', width: '300px' }}         >
          <InputBase placeholder="search..." />
        </Search>
        <Icons sx={{ ml: 5 }}     >
          <Badge badgeContent={1} color="error">
            <Mail style={{ color: 'GoldenRod', fontSize: 30 }} />
          </Badge>

          <Avatar

            sx={{ ml: 5, width: 40, height: 40 }}
            src={currentUser.image}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={currentUser.image}
          />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem><Link to={`/profile/${currentUser._id}`} style={{ textDecoration: 'none', color: 'black' }}> Profile </Link></MenuItem>
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>

      </Menu>
    </AppBar>
                )}
                </>
  );
};

export default Navbar;