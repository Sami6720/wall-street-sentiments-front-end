"use client";

import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { setHistoricalWindowMaxLength } from "@/app/redux/slices/nonAsync/historicalWindowSlice";
import { convertSnakeToTitleCase } from "@/app/utils";

export default function LineGraph() {
  const dispatch = useDispatch();

  const selectedNumericalMetricState = useSelector(
    (state) => state.selectedNumericalMetric
  );
  const selectedStockNameState = useSelector(
    (state) => state.selectedStockName
  );
  const stockMetricsState = useSelector((state) => state.stockMetrics);
  const historicalWindowState = useSelector((state) => state.historicalWindow);

  const getLineGraphDataArray = (
    stockMetricsState,
    selectedStockNameState,
    selectedNumericalMetricState
  ) => {
    return stockMetricsState.data[selectedStockNameState.data]["numerical"][
      selectedNumericalMetricState.data
    ];
  };

  return (
    <Card
      sx={{
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {stockMetricsState.loading ? (
        <p>Loading...</p>
      ) : selectedStockNameState.isNotSet ? (
        <p>Please select a stock name</p>
      ) : selectedNumericalMetricState.isNotSet ? (
        <p>Please select a numerical metric</p>
      ) : (
        (dispatch(
          setHistoricalWindowMaxLength(
            getLineGraphDataArray(
              stockMetricsState,
              selectedStockNameState,
              selectedNumericalMetricState
            ).length
          )
        ),
        (
          <LineChart
            series={[
              {
                data: getLineGraphDataArray(
                  stockMetricsState,
                  selectedStockNameState,
                  selectedNumericalMetricState
                ).slice(0, historicalWindowState.data + 1),
                label: convertSnakeToTitleCase(
                  selectedNumericalMetricState.data
                ),
              },
            ]}
            height={400}
          />
        ))
      )}
    </Card>
  );
}
