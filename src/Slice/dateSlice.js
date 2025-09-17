import { createSlice } from '@reduxjs/toolkit';


const initialDate = new Date();
const initialState = {
    currentDate: initialDate.toISOString(),

};

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate(state, action) {
            state.currentDate = action.payload;
        },
    },
});


export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
