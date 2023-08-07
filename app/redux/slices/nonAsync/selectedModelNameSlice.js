const { createSlice } = require("@reduxjs/toolkit");

const modelNameMapping = {
  XGBoost: "xgboost",
  "Random Forest": "random_forest",
};

const selectedModelNameSlice = createSlice({
  name: "selectedModelName",
  initialState: {
    name: "xgboost",
  },
  reducers: {
    setSelectedModelName: (state, action) => {
      state.name = modelNameMapping[action.payload];
    },
  },
});

export default selectedModelNameSlice.reducer;
export const { setSelectedModelName } = selectedModelNameSlice.actions;
