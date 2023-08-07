const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getStockMetrics = createAsyncThunk(
  "stockMetrics/getStockMetrics",
  async (stocks) => {
    const stocksString = stocks.join(",");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URI}/stock-metrics/?stocks=${stocksString}`
    );
    return response.json();
  }
);

const stockMetricsSlice = createSlice({
  name: "stockMetricsSlice",
  initialState: {
    data: {},
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStockMetrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStockMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStockMetrics.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default stockMetricsSlice.reducer;
