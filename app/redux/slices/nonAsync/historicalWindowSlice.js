const { createSlice } = require("@reduxjs/toolkit");

const historicalWindowSlice = createSlice({
  name: "historicalWindowSlice",
  initialState: {
    data: 0,
    isNotSet: true,
    maxLength: 0,
  },
  reducers: {
    setHistoricalWindow: (state, action) => {
      state.data = action.payload;
      state.isNotSet = false;
    },
    setHistoricalWindowMaxLength: (state, action) => {
      state.maxLength = action.payload;
    },
  },
});

export const { setHistoricalWindow, setHistoricalWindowMaxLength } =
  historicalWindowSlice.actions;
export default historicalWindowSlice.reducer;
