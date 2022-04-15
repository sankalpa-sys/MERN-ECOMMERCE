import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    userId: null,

  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price*action.payload.quantity;
      state.userId = action.payload.userId
    },

    emptyCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0
    },
    removefromCart: (state, action) => {


      // Important

      const index  = state.products.findIndex((f)=>{ return f._id === action.payload.id && f.userId === action.payload.userId})
      const newProductArr = [
        ...state.products.slice(0, index),
        ...state.products.slice(index + 1)
      ]

      state.products = newProductArr
      state.quantity -= 1;
      state.total -= action.payload.price*action.payload.quantity
    }
  },
});

export const { addProduct, emptyCart,removefromCart } = cartSlice.actions;
export default cartSlice.reducer;