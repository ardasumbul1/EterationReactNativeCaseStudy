import { createSlice } from '@reduxjs/toolkit';


const initialState = [];

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addLocalDataToFavItems: (state, action) => {
      action.payload.forEach(item => {
        const existingItem = state.find(favItem => favItem.id === item.id);
        if (existingItem) {
          existingItem.count += item.count;
        } else {
          state.push(item);
        }
      });
    },
    addToFavorites: (state, action) => {
        console.log("çalıştı")
        state.push(action.payload)
      },
    removeFromFavorites: (state, action) => {
        console.log("çalıştı222222")
        return state.filter(item => item.id !== action.payload.id);
    },
  }
})

export const { addLocalDataToFavItems,addToFavorites,removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;