import { createSlice } from '@reduxjs/toolkit';



const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },

    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct:(state,action) =>{
            state.quantity -= 1;
            let quantity = state.quantity
            let quantity2 = state.products[quantity]?.quantity;
            let price2 = state.products[quantity]?.price;
            state.products.pop(action.payload);
            let newTotal = quantity2 * price2 ;
            state.total = state.total - newTotal;
        }
    },
});


export const { addProduct , removeProduct } = cartSlice.actions;

export default cartSlice.reducer;