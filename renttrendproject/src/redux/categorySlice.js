import { createSlice } from "@reduxjs/toolkit"

const categorySlice =  createSlice({
    name:"category",
    initialState:{categories:[]},
    reducers:{
        store_categories(state,action){
            state.categories =  action.payload }   }
})
export const {store_categories} = categorySlice.actions
export default categorySlice
export const selectCategories =  state=>state.category.categories