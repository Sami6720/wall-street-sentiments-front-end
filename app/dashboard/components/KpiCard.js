"use client";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import React from "react";

export const KpiCard = (props) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
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
            <Typography variant="h4">{props.value}</Typography>
          )}
          <Typography>
            {props.purpose}{" "}
            <Tooltip title={props.details}>
              <InfoIcon color="info" fontSize="string"></InfoIcon>
            </Tooltip>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
