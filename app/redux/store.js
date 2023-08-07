import { configureStore } from "@reduxjs/toolkit";

import historicalWindowReducer from "./slices/nonAsync/historicalWindowSlice";
import modelPerfMetricsReducer from "./slices/async/modelPerfMetrics";
import modelPredictionsReducer from "./slices/async/modelPredictions";
import stockMetricsReducer from "./slices/async/stockMetricsSlice";
import selectedModelNameReducer from "./slices/nonAsync/selectedModelNameSlice";
import selectedStockNameReducer from "./slices/nonAsync/selectedStockNameSlice";
import selectedNumericalMetricReducer from "./slices/nonAsync/selectedNumericalMetricSlice";
import selectedCategoricalMetricReducer from "./slices/nonAsync/selectedCategoricaclMetricSlice";
import selectedMetricsForReducer from "./slices/nonAsync/selectedMetricsForSlice";

export default configureStore({
  reducer: {
    historicalWindow: historicalWindowReducer,
    modelPerfMetrics: modelPerfMetricsReducer,
    modelPredictions: modelPredictionsReducer,
    selectedModelName: selectedModelNameReducer,
    selectedStockName: selectedStockNameReducer,
    stockMetrics: stockMetricsReducer,
    selectedNumericalMetric: selectedNumericalMetricReducer,
    selectedCategoricalMetric: selectedCategoricalMetricReducer,
    selectedMetricsFor: selectedMetricsForReducer,
  },
});
