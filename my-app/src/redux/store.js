const { configureStore } = require("@reduxjs/toolkit");
import uploadReducer from "./uploadSlice";

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
  },
});
