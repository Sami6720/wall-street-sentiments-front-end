"use client";

import React, { useEffect } from "react";
import { KpiCard } from "./components/KpiCard";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Drawer,
  SwipeableDrawer,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";
// import TableCompDash from "./components/TableCompDash";
import ControlPanelCard from "./components/ControlPanelCard";
import LineGraph from "./components/LineGraph";
import PieGraph from "./components/PieGraph";

import { useDispatch, useSelector } from "react-redux";
import { getModelPerfMetrics } from "../redux/slices/async/modelPerfMetrics";
import { getModelPredictions } from "../redux/slices/async/modelPredictions";
import { getStockMetrics } from "../redux/slices/async/stockMetricsSlice";
import dynamic from "next/dynamic";

const TableCompDash = dynamic(() => import("./components/TableCompDash"), {
  ssr: false,
});

export default function Dashboard() {
  const dispatch = useDispatch();

  const modelPerfMetricsState = useSelector((state) => state.modelPerfMetrics);
  const modelPredictionsState = useSelector((state) => state.modelPredictions);
  const selectedModelName = useSelector(
    (state) => state.selectedModelName.name
  );

  const secret = process.env.NEXT_PUBLIC_BASE_API_URI;

  useEffect(() => {
    dispatch(getModelPerfMetrics());
  }, []);
  useEffect(() => {
    dispatch(getModelPredictions());
  }, []);

  if (!modelPredictionsState.loading) {
    dispatch(getStockMetrics(modelPredictionsState.stocks));
  }

  const metricNameToPurposeMapping = {
    historic_buy_predictions_profit: "Historic Predictions Profit ($)",
    historic_not_buy_predictions_save: "Historic Predictions Save ($)",
    cumulative_accuracy: "Cumulative Accuracy (%)",
    total_good_days_accuracy_wise: "Good Days Accuracy Wise (Days)",
    total_good_days_money_wise: "Good Days Money Wise (Days)",
    total_days: "Total Days Model In Use (Days)",
  };

  const getKpiCardBorderColor = (metricName, metricValue) => {
    if (
      ![
        "historic_buy_predictions_profit",
        "historic_not_buy_predictions_save",
      ].includes(metricName)
    ) {
      return "info.main";
    }

    if (metricValue > 0) return "success.main";
    if (metricValue < 0) return "error.main";
  };
  const kpiCards = !modelPerfMetricsState.loading
    ? Object.entries(modelPerfMetricsState.data[selectedModelName]).map(
        ([metricName, metricValue]) => {
          if (!metricNameToPurposeMapping[metricName]) {
            console.log(`metricName not found in mapping ${metricName}`);
            return null;
          }
          return (
            <Box
              key={metricName}
              sx={{
                width: { xs: "1", md: "30%" },
                height: { xs: "1", md: "30%" },
              }}
              className="modelAccuracyKPICard"
            >
              <KpiCard
                purpose={metricNameToPurposeMapping[metricName]}
                value={metricValue}
                loading={false}
                borderColorKPI={getKpiCardBorderColor(metricName, metricValue)}
              />
            </Box>
          );
        }
      )
    : null;

  return (
    <Box className="ComponentHolder" display="flex">
      <Box
        className="ControlPanelSideBar"
        sx={{
          width: { xs: "100%", md: "15%" },
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant="h4"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontWeight: 500,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            alignSelf: "center",
          }}
        >
          WSS
        </Typography>
        <ControlPanelCard />
      </Box>
      <Box
        className="MainContent"
        sx={{
          width: { xs: "100%", md: "85%" },
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          className="KpiCardContainer"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          sx={{
            paddingBottom: "1rem",
            marginBottom: "1rem",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {kpiCards}
        </Box>
        <Box
          sx={{
            width: { xs: "1", md: "60%" },
            paddingTop: 5,
          }}
          className="tableContainer"
        >
          <TableCompDash></TableCompDash>
        </Box>
        <Box
          className="table"
          sx={{
            width: { xs: "100%", md: "100%" },
            padding: "1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TableCompDash />
        </Box>
      </Box>
    </Box>
  );
}
