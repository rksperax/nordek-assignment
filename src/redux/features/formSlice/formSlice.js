import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: "formSlice",
    initialState: {
        isModal: false,
        checkedItem:{},
        loading:true
    },

    reducers: {
        modalToggler(state, action) {
            state.isModal = action.payload;
        },
        selectedData(state, action) {
            state.checkedItem = action.payload;
        },
        showLoadingMessage(state, action){
            state.loading = action.payload;
        }
    },


});

export default formSlice.reducer;
export const { modalToggler,selectedData,showLoadingMessage} = formSlice.actions