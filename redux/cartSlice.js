import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addLocalDataToCart: (state, action) => {
      action.payload.forEach(item => {
        const existingItem = state.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
          existingItem.count += item.count;
        } else {
          state.push(item);
        }
      });
    },
    updateQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.count = action.payload.count;
      }
    },
    addToCart: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.count += action.payload.count;
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },

  },
});

export const { addLocalDataToCart, addToCart, removeFromCart, updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;