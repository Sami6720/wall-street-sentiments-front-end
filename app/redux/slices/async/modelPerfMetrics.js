const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

export const getModelPerfMetrics = createAsyncThunk(
  "modelPerfMetrics/getModelPerfMetrics",
  async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URI}/model-perf-metrics`
    );
    return response.json();
  }
);

export const modelPerMetricsSlice = createSlice({
  name: "modelPerfMetricsSlice",
  initialState: {
    data: {},
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getModelPerfMetrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getModelPerfMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = JSON.parse(action.payload.body).reduce(
          (modelKeyPurposesValueObj, currentModelAndMetricsObj) => {
            const { model, ...metrics } = currentModelAndMetricsObj;
            modelKeyPurposesValueObj[model] = metrics;
            return modelKeyPurposesValueObj;
          },
          {}
        );
      })
      .addCase(getModelPerfMetrics.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default modelPerMetricsSlice.reducer;
