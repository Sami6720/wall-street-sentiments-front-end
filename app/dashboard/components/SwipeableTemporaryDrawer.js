import React, { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ControlPanelCard from "./ControlPanelCard";
import { Box } from "@mui/material";

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const listStyles = {
    width: 250,
  };

  const fullListStyles = {
    width: "auto",
  };

  const list = (anchor) => (
    <div
      style={{
        ...listStyles,
        ...((anchor === "top" || anchor === "bottom") && fullListStyles),
      }}
      role="presentation"
    >
      <ControlPanelCard />
    </div>
  );

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        display: { md: "none", xs: "block" },
      }}
    >
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{
              width: "100%",
              height: "3rem",
              borderRadius: 0,
              borderTop: "1px solid #e0e0e0",
            }}
            onClick={toggleDrawer(anchor, true)}
          >
            <KeyboardArrowUpIcon />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <Button fullWidth onClick={toggleDrawer(anchor, false)}>
              <KeyboardArrowDownIcon />
            </Button>
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </Box>
  );
}
