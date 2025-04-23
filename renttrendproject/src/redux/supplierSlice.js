import { createSlice } from "@reduxjs/toolkit"

const supplierSlice = createSlice({
    name:"supplier",
    initialState:{suppliers:[]},
    reducers:{

        store_suppliers(state,action){
            state.suppliers = action.payload}}
})
export const {store_suppliers} = supplierSlice.actions
export default supplierSlice
export const selectsuppliers = state=>state.supplier.suppliers



