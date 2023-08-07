const { createSlice } = require("@reduxjs/toolkit");

const selectedNumericalMetricSlice = createSlice({
  name: "selectedNumericalMetric",
  initialState: {
    data: "",
    isNotSet: true,
  },
  reducers: {
    setSelectedNumericalMetric: (state, action) => {
      state.data = action.payload;
      state.isNotSet = false;
    },
  },
});

export const { setSelectedNumericalMetric } =
  selectedNumericalMetricSlice.actions;
export default selectedNumericalMetricSlice.reducer;
