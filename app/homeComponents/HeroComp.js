"use client";

import { Box, Typography, Button, Grow } from "@mui/material";
import React from "react";
import TableCompHome from "./TableCompHome";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";

export const HeroComp = () => {
  const router = useRouter();
  const [isTyping, setIsTyping] = React.useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
      className="heroContainer"
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          paddingTop: { xs: 5, md: 20 },
        }}
        className="firstColumnInMD"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: {
              xs: "center",
            },
          }}
        >
          <Typography variant="h3" align="center">
            Welcome to <br></br>Wall Street Sentiments
          </Typography>
          <Typography variant="h5" sx={{ paddingTop: 2 }} align="center">
            W
            <TypeAnimation
              cursor={false}
              sequence={[
                "ant to see what our ML models predict for today's most talked stocks?",
                750,
                () => setIsTyping(false),
              ]}
              wrapper="span"
              speed={70}
            />
          </Typography>
        </Box>
        <Box
          sx={{
            paddingTop: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grow in={!isTyping}>
            <Button
              variant="outlined"
              sx={{
                mr: 2,
                border: "2px solid",
                color: "black",
                borderRadius: 10,
              }}
              onClick={() => router.push("dashboard")}
            >
              Get started
            </Button>
          </Grow>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          paddingTop: { xs: 5, md: 15 },
          paddingLeft: { xs: 0, md: 10 },
        }}
        className="secondColumnInMD"
      >
        <TableCompHome></TableCompHome>
      </Box>
    </Box>
  );
};
