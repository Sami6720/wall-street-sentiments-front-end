"use client";

import { Card } from "@mui/material";
import { PieChart, pieArcClasses, pieArcLabelClasses } from "@mui/x-charts";

import React from "react";
import { useSelector } from "react-redux";

const contstructPieGraph = (
  selectedStockNameState,
  selectedCategoricalMetricState,
  stockMetricsState,
  modelPerfMetricsState,
  selectedMetricsForState,
  selectedModelNameState
) => {
  if (stockMetricsState.loading || modelPerfMetricsState.loading) {
    return <div>Loading...</div>;
  }

  const sx = {
    [`& .${pieArcClasses.faded}`]: {
      fill: "gray",
    },
  };

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 370,
    legend: {
      hidden: true,
    },
  };

  switch (selectedMetricsForState.data) {
    case "stocks": {
      if (selectedCategoricalMetricState.isNotSet) {
        return <div>Select a categorical metric</div>;
      }
      if (selectedStockNameState.isNotSet) {
        return <div>Select a Stock name!</div>;
      }

      const data = [
        ...new Set(
          stockMetricsState.data[selectedStockNameState.data]["categorical"][
            [selectedCategoricalMetricState.data]
          ]
        ),
      ].map((category, index) => {
        return {
          id: index,
          value: stockMetricsState.data[selectedStockNameState.data][
            "categorical"
          ][selectedCategoricalMetricState.data].filter(
            (value) => value === category
          ).length,
          label: category,
        };
      });

      const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

      const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
      };

      return (
        <PieChart
          series={[
            {
              data: data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30 },
              arcLabel: getArcLabel,
              outerRadius: 120,
            },
          ]}
          sx={{
            [`& .${pieArcClasses.faded}`]: {
              fill: "gray",
            },
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontSize: 17,
            },
          }}
          {...sizing}
        />
      );
    }

    case "models": {
      if (selectedCategoricalMetricState.isNotSet) {
        return <div>Select a categorical metric</div>;
      }

      const data = selectedCategoricalMetricState.data.map(
        (metricName, index) => {
          return {
            id: index,
            value:
              modelPerfMetricsState.data[selectedModelNameState.name][
                metricName
              ],
            label: metricName,
          };
        }
      );

      const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

      const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
      };

      return (
        <PieChart
          series={[
            {
              data: data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30 },
              arcLabel: getArcLabel,
              outerRadius: 120,
            },
          ]}
          sx={{
            [`& .${pieArcClasses.faded}`]: {
              fill: "gray",
            },
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontSize: 17,
            },
          }}
          {...sizing}
        />
      );
    }

    default:
      break;
  }
};

const PieGraph = () => {
  const selectedStockNameState = useSelector(
    (state) => state.selectedStockName
  );
  const selectedCategoricalMetricState = useSelector(
    (state) => state.selectedCategoricalMetric
  );
  const stockMetricsState = useSelector((state) => state.stockMetrics);
  const modelPerfMetricsState = useSelector((state) => state.modelPerfMetrics);
  const selectedMetricsForState = useSelector(
    (state) => state.selectedMetricsFor
  );
  const selectedModelNameState = useSelector(
    (state) => state.selectedModelName
  );

  return (
    <Card
      sx={{
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: 2,
      }}
    >
      {contstructPieGraph(
        selectedStockNameState,
        selectedCategoricalMetricState,
        stockMetricsState,
        modelPerfMetricsState,
        selectedMetricsForState,
        selectedModelNameState
      )}
    </Card>
  );
};

export default PieGraph;
