import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name:"checkout",
    initialState:{address:{}},
    reducers:{
        store_address (state,action){
            state.address =  action.payload
        }
    }
})
export default checkoutSlice
export const {store_address} = checkoutSlice.actions
export const selectAddress =  state=>state.checkout.address