import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{users:[]},
    reducers:{

        store_users(state,action){
            state.users = action.payload}}
})
export const {store_users} = userSlice.actions
export default userSlice
export const selectusers = state=>state.user.users



