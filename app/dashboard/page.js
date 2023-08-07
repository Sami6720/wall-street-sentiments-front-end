"use client";

import React, { useEffect } from "react";
import { KpiCard } from "./components/KpiCard";
import { Box, CircularProgress, Container } from "@mui/material";
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
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          paddingTop: 5,
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
        className="kpiCardContainer"
      >
        {modelPerfMetricsState.loading ? (
          <CircularProgress></CircularProgress>
        ) : (
          kpiCards
        )}
      </Box>
      <Box
        className="tableAndVizContainer"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            width: { xs: "1", md: "30%" },
            className: "controlPanelCardContainer",
            paddingTop: 5,
          }}
        >
          <ControlPanelCard></ControlPanelCard>
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
          sx={{
            width: { xs: "1", md: "30%" },
            className: "pieGraphContainer",
            paddingTop: 5,
          }}
        >
          <PieGraph></PieGraph>
        </Box>
        <Box
          sx={{
            width: { xs: "1", md: "60%" },
            className: "lineGraphContainer",
            paddingTop: 5,
          }}
        >
          <LineGraph></LineGraph>
        </Box>
      </Box>
    </Container>
  );
}
