import { configureStore } from "@reduxjs/toolkit";
import dateReducer from '../Slice/dateSlice';

const store = configureStore({
    reducer: { date: dateReducer }
});

export default store;