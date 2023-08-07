"use client";

import { Box, Typography, Button } from "@mui/material";
import React from "react";
import TableCompHome from "./TableCompHome";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";

export const HeroComp = () => {
  const router = useRouter();
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
        <Typography variant="h3">
          Welcome to <br></br>W
          <TypeAnimation
            sequence={[
              "all Street Sentiments",
              () => {
                console.log("Sequence completed");
              },
            ]}
            wrapper="span"
            cursor={false}
            repeat={1}
            speed={10}
          ></TypeAnimation>
        </Typography>
        <Typography variant="h5" sx={{ paddingTop: 2 }}>
          Want to see what our ML models predict for today&apos;s most talked
          stocks?
        </Typography>
        <Box sx={{ paddingTop: 5 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mr: 2 }}
            onClick={() => router.push("dashboard")}
          >
            Get started
          </Button>
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
