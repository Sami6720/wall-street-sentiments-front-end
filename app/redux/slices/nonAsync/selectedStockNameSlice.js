const { createSlice } = require("@reduxjs/toolkit");

export const selectedStockNameSlice = createSlice({
  name: "selectedStockName",
  initialState: {
    data: "",
    isNotSet: true
  },
  reducers: {
    setSelectedStockName: (state, action) => {
      state.data = action.payload;
      state.isNotSet = false;
    },
  },
});

export const { setSelectedStockName } = selectedStockNameSlice.actions;
export default selectedStockNameSlice.reducer;
