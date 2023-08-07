"use client";
import React from "react";

import { Box, Link, Typography } from "@mui/material";

const FooterComp = () => {
  return (
    // Create footer component using MUI
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "50px",
        left: 0,
        right: 0,
        paddingTop: 5,
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {"© "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      {/* Made with love */}
      <Typography variant="body2" color="text.secondary" align="center">
        {"Made with "}
        <Link color="inherit" href="https://material-ui.com/">
          Material UI
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default FooterComp;
