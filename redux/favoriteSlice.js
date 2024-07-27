import { createSlice } from '@reduxjs/toolkit';


const initialState = [];

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
        console.log("çalıştı")
        state.push(action.payload)
      },
    removeFromFavorites: (state, action) => {
        console.log("çalıştı")
        return state.filter(item => item.id !== action.payload);
    },
  }
})

export const { addToFavorites,removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;