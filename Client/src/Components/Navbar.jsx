import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { useEffect } from "react";
function Navbar() {
  //services menu
  const [anchor, setAnchor] = React.useState(null);
  const openmenu = Boolean(anchor);
  const handleClickE = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleCloseE = () => {
    setAnchor(null);
  };
  //Login signup user profile
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let navigate = useNavigate();
  const userdetails = localStorage.getItem("user");
  const currentuser = JSON.parse(userdetails);
  const updatedusername = localStorage.getItem("updatedusername");
  const updatedimage = localStorage.getItem("updatedimage");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (token) {
      setUser(currentuser);
    }
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("updatedusername");
    localStorage.removeItem("updatedimage");
    setUser("");
    navigate("/Signin");
  };

  return (
    <>
      <header>
        <nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1>GreenTech</h1>
          </Link>
          <ul>
            <Link to="/aboutus" id="aboutbtn">
              About Us
            </Link>
            <Button
              id="fade-button"
              aria-controls={openmenu ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openmenu ? "true" : undefined}
              onClick={handleClickE}
            >
              Services
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchor}
              open={openmenu}
              onClose={handleCloseE}
              TransitionComponent={Fade}
            >
              <Link
                to="/WasteCollection"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <MenuItem onClick={handleCloseE}>Waste Collection</MenuItem>
              </Link>
              <MenuItem onClick={handleCloseE}>Lost and Found Objects</MenuItem>
              <MenuItem onClick={handleCloseE}>Potential Hazard</MenuItem>
            </Menu>
            <Link id="payment-btn" to="/Payment">
              Payment
            </Link>
            <li>
              <a href="">Customer Service</a>
            </li>
          </ul>

          <div className="userlink">
            {!localStorage.getItem("token") ? (
              <Link to="/Signin">
                <AccountCircleSharpIcon
                  className="usericon"
                  fontSize="large"
                  style={{ color: "white" }}
                />
              </Link>
            ) : (
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    marginRight: "20px",
                  }}
                >
                  <Typography sx={{ minWidth: 100 }}>
                    User : {updatedusername ? updatedusername : user.username}
                  </Typography>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={updatedimage ? updatedimage : user.image}
                      ></Avatar>
                    </IconButton>
                  </Tooltip>
                  {token ? (
                    <Link to="/message">
                      <div className="notification">
                        <Badge badgeContent={0}>
                          <MailIcon />
                        </Badge>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Link
                    to="/Profile"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Avatar /> Profile
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <Link
                    to="/Signin"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handlelogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Link>
                </Menu>
              </React.Fragment>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
