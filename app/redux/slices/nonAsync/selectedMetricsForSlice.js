const { createSlice } = require("@reduxjs/toolkit");

const selectedMetricsForSlice = createSlice({
  name: "selectedMetricsForSlice",
  initialState: {
    data: "stocks",
  },
  reducers: {
    setSelectedMetricsFor: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSelectedMetricsFor } = selectedMetricsForSlice.actions;
export default selectedMetricsForSlice.reducer;
