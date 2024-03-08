import { configureStore } from '@reduxjs/toolkit';

import fileReducer from "@/redux/features/fileSlice"


const store = configureStore({
  reducer: {
    storeFiles:fileReducer
  },
});

export default store;
