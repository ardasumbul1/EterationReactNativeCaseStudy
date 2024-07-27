import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addLocalDataToCart: (state, action) => {
      // Add items from the payload to the cart
      action.payload.forEach(item => {
        // Check if the item already exists in the cart
        const existingItem = state.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
          // If item exists, update its quantity
          existingItem.count += item.count;
        } else {
          // If item does not exist, add it to the cart
          state.push(item);
        }
      });
    },
    addToCart: (state, action) => {
        const item = state.find(item => item.id === action.payload.id);
        if (item) {
          item.count += action.payload.count;
        }else{
          state.push(action.payload)
        }
      },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.count = action.payload.count;
      }
    },
  },
});

export const { addLocalDataToCart,addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;