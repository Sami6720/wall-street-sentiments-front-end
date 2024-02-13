"use client";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import React from "react";

export const KpiCard = (props) => {
  return (
    <Card
      sx={{
        borderRadius: 5,
        boxShadow: 1,
        padding: 2,
        margin: 2,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        borderColor: props.borderColorKPI,
        borderWidth: "thin",
        borderStyle: "solid",
      }}
    >
      <CardContent>
        <Box sx={{ textAlign: "center", paddingBottom: 1 }}>
          {props.loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h3">{props.value}</Typography>
          )}
          <Typography>{props.purpose}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
