"use client";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { convertSnakeToTitleCase } from "@/app/utils";

import { setHistoricalWindow } from "../../redux/slices/nonAsync/historicalWindowSlice";
import { setSelectedModelName } from "@/app/redux/slices/nonAsync/selectedModelNameSlice";
import { setSelectedStockName } from "@/app/redux/slices/nonAsync/selectedStockNameSlice";
import { setSelectedNumericalMetric } from "@/app/redux/slices/nonAsync/selectedNumericalMetricSlice";
import {
  resetSelectedCategoricaclMetric,
  setSelectedCategoricaclMetric,
} from "@/app/redux/slices/nonAsync/selectedCategoricaclMetricSlice";
import { setSelectedMetricsFor } from "@/app/redux/slices/nonAsync/selectedMetricsForSlice";

const ControlPanelCard = () => {
  const modelNames = ["XGBoost", "Random Forest"];
  const dispatch = useDispatch();

  const historicalWindowState = useSelector((state) => state.historicalWindow);
  const stockMetricsState = useSelector((state) => state.stockMetrics);
  const modelPerfMetricsState = useSelector((state) => state.modelPerfMetrics);
  const selectedMetricsForState = useSelector(
    (state) => state.selectedMetricsFor
  );

  const modelCategoricalMetrics = {
    "Total Buy vs Not Buy Prediction Counts": [
      "total_buy_predictions_count",
      "total_not_buy_predictions_count",
    ],
    "Total Correct Buy vs Not Buy Prediction Counts": [
      "total_correct_buy_predictions_count",
      "total_correct_not_buy_predictions_count",
    ],
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
      <CardContent>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Model</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Model"
              onChange={(e) => {
                dispatch(setSelectedModelName(e.target.value));
              }}
            >
              {modelNames.map((modelName) => (
                <MenuItem key={modelName} value={modelName}>
                  {modelName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            paddingTop: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Stock</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Stock"
              onChange={(e) => {
                dispatch(setSelectedStockName(e.target.value));
              }}
            >
              {stockMetricsState.loading ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                Object.keys(stockMetricsState.data).map((stock) => (
                  <MenuItem key={stock} value={stock}>
                    {stock}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            paddingTop: 2,
          }}
        >
          {" "}
          <Typography>
            Select Metrics For{" "}
            <Tooltip title="For now, numerical metrics for only stocks can be shown">
              <InfoIcon fontSize="string" color="info"></InfoIcon>
            </Tooltip>
          </Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => {
                dispatch(resetSelectedCategoricaclMetric());
                dispatch(setSelectedMetricsFor(e.target.value));
              }}
            >
              <FormControlLabel
                value="stocks"
                control={<Radio />}
                label="Stocks"
              />
              <FormControlLabel
                value="models"
                control={<Radio />}
                label="Models"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            paddingTop: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Categorical Metric
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Categorical Metric"
              onChange={(e) => {
                dispatch(setSelectedCategoricaclMetric(e.target.value));
              }}
            >
              {stockMetricsState.loading || modelPerfMetricsState.loading ? (
                <MenuItem>Loading...</MenuItem>
              ) : selectedMetricsForState.data === "stocks" ? (
                Object.keys(
                  stockMetricsState.data[Object.keys(stockMetricsState.data)[0]]
                    .categorical
                ).map((metricName) => (
                  <MenuItem key={metricName} value={metricName}>
                    {convertSnakeToTitleCase(metricName)}
                  </MenuItem>
                ))
              ) : (
                Object.keys(modelCategoricalMetrics).map((metricName) => (
                  <MenuItem
                    key={metricName}
                    value={modelCategoricalMetrics[metricName]}
                  >
                    {metricName}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            paddingTop: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Numerical Metric
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Numerical Metric"
              onChange={(e) => {
                dispatch(setSelectedNumericalMetric(e.target.value));
              }}
            >
              {stockMetricsState.loading ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                Object.keys(
                  stockMetricsState.data[Object.keys(stockMetricsState.data)[0]]
                    .numerical
                ).map((metricName) => (
                  <MenuItem key={metricName} value={metricName}>
                    {convertSnakeToTitleCase(metricName)}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <Box
            sx={{
              paddingTop: 2,
            }}
          >
            {" "}
            <Typography>
              Historical Span (Days){" "}
              <Tooltip title="For now, numerical metrics only">
                <InfoIcon fontSize="string" color="info"></InfoIcon>
              </Tooltip>
            </Typography>
            <Slider
              defaultValue={historicalWindowState.maxLength} // Start from the right end
              valueLabelDisplay="auto"
              min={1}
              max={historicalWindowState.maxLength}
              onChange={(e) => {
                dispatch(setHistoricalWindow(e.target.value - 1)); // Subtract 1 to account for the 0 index
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ControlPanelCard;
