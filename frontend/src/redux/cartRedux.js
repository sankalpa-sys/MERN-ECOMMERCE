import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price*action.payload.quantity;
    },

    emptyCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0
    },
    removefromCart: (state, action) => {
      const newProductArr = state.products.filter((product) => {
        return product._id !== action.payload._id
      })
      state.products = newProductArr
      state.quantity -= 1;
      state.total -= action.payload.price*action.payload.quantity
    }
  },
});

export const { addProduct, emptyCart,removefromCart } = cartSlice.actions;
export default cartSlice.reducer;