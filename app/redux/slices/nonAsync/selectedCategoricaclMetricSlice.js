const { createSlice } = require("@reduxjs/toolkit");

const selectedCategoricaclMetricSlice = createSlice({
  name: "selectedCategoricaclMetric",
  initialState: {
    data: "",
    isNotSet: true,
  },
  reducers: {
    setSelectedCategoricaclMetric: (state, action) => {
      state.data = action.payload;
      state.isNotSet = false;
    },
    resetSelectedCategoricaclMetric: (state) => {
      state.data = "";
      state.isNotSet = true;
    },
  },
});

export const {
  setSelectedCategoricaclMetric,
  resetSelectedCategoricaclMetric,
} = selectedCategoricaclMetricSlice.actions;
export default selectedCategoricaclMetricSlice.reducer;
