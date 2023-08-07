const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getModelPredictions = createAsyncThunk(
  "modelPredictions/getModelPredictions",
  async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URI}/predictions`
    );
    return response.json();
  }
);

export const modelPredictionsSlice = createSlice({
  name: "modelPredictionsSlice",
  initialState: {
    data: {},
    loading: true,
    stocks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getModelPredictions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getModelPredictions.fulfilled, (state, action) => {
        state.data = JSON.parse(action.payload.body).reduce(
          (modelKeyPredictionsValueObj, currentModelAndPredictionsObj) => {
            const { model, ...remainingData } = currentModelAndPredictionsObj;
            modelKeyPredictionsValueObj[model] = remainingData.predictions;
            return modelKeyPredictionsValueObj;
          },
          {}
        );
        state.stocks = JSON.parse(action.payload.body)[0].predictions.map(
          (predictionObj) => predictionObj.ticker
        );
        state.loading = false;
      })
      .addCase(getModelPredictions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default modelPredictionsSlice.reducer;
