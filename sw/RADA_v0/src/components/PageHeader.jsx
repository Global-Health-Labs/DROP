
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import companyLogo from "./../assets/ghlabs_logo.png";
/**
 * This class renders the header on top of every page.
 */
export default function Header(props) {
  return (
      <AppBar position="static">

        <Toolbar style={{backgroundColor: '#084c9e'}}>
        
          {/* Display company logo */}
          <img src={companyLogo} alt="GH Labs" 
            style={{width: '70px', height: 'auto', margin: '0 10px'}} />

          {/* The Typography component applies 
           default font weights and sizes */}
          <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
            {props.title ?? 'RoboNAAT Worklist Generator'}
          </Typography>
        </Toolbar>
      </AppBar>
  );
}