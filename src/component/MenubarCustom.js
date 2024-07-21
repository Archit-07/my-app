import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from './DashboardCustom';
import UserProfile from './UserProfile'; // Import your Profile component
import { useNavigate } from "react-router-dom";
import LoginForm from './LoginForm';

export default function MenuBar() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [displayedComponent, setDisplayedComponent] = useState(<Dashboard />); // Set Dashboard as default
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  const location = useLocation();
  const profileData = location.state || {};
  // console.log("username & password", username, password);

  const handleLogout = () => {
    // Clear session data (e.g., sessionStorage.clear())
    sessionStorage.clear();
    localStorage.setItem('loggedIn', false);
    navigate("/");
  };

  function handleMenuClick(popupState, menuItem) {
    console.log(`Clicked on ${menuItem}`);
    setSelectedMenuItem(menuItem);
    popupState.close();

      switch (menuItem) {
        case "Dashboard":
          setDisplayedComponent(<Dashboard />);
          break;
        case "My account":
          setDisplayedComponent(<UserProfile profileData = {profileData} />);
          break;
        case "Logout":
          return handleLogout();
          break;
        default:
          setDisplayedComponent(<Dashboard />);
      }
  }

  if(loggedIn) {
    return (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: '2%', marginRight: "10%", marginBottom: "10%" }}>
              <Button sx={{ width: "8rem" }} variant="contained" {...bindTrigger(popupState)}>
                {selectedMenuItem}
              </Button>
            </div>
  
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={() => handleMenuClick(popupState, "Dashboard")}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick(popupState, "My account")}>
                My account
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick(popupState, "Logout")}>
                Logout
              </MenuItem>
            </Menu>
            {displayedComponent}
          </React.Fragment>
        )}
      </PopupState>
    );
  } else {
    return <LoginForm />;
  }
  
}
