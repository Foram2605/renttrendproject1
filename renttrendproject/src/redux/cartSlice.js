import { createSlice }  from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const cartSlice = createSlice({
    name:'cart',
    initialState:{cartItems:[] , total:0 },
    reducers:{
        addtocart(state,action){ 
            console.log(action.payload)
            const itemIndex =  state.cartItems.findIndex(item=>item.id == action.payload.id)
            if(itemIndex== -1 ){
                state.cartItems.push({...action.payload , qty:1})
                toast.success(`${action.payload.name} added to cart`)
            }
            else  toast.info(`${action.payload.name} already added to cart`)
         },
        // increase(state,action){
        //     const itemIndex =  state.cartItems.findIndex(item=>item.id == action.payload.id)
        //     if(action.payload.stock >  state.cartItems[itemIndex].qty){
        //         state.cartItems[itemIndex].qty++
        //     }
        //     else toast.info(`only ${action.payload.stock} qty available`)
        // },
        // decrease(state,action){
        //     const itemIndex =  state.cartItems.findIndex(item=>item.id == action.payload.id)
        //     if( state.cartItems[itemIndex].qty > 1)  state.cartItems[itemIndex].qty--
        //     else state.cartItems[itemIndex].qty = 1
        // },
        removefromcart(state,action){
            const filters =  state.cartItems.filter(item=>item.id != action.payload)
            state.cartItems  = filters
        },
        emptycart(state,action){
            state.cartItems = [] ; state.total = 0
        }
        ,
        calculatetotal(state,action){
            const t =  state.cartItems.reduce((prev,curr)=>{return prev+(curr.price*curr.qty)},0)
            state.total =  t
        }
    }
})
export const {addtocart , increase,decrease,removefromcart,emptycart,calculatetotal} = cartSlice.actions 
export default cartSlice

export const selectCart =  state=>state.cart.cartItems
export const selectTotal =  state=>state.cart.total