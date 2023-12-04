import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  items: [],
}

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { title, description } = action.payload
      const newItem = {
        id: uuidv4(),
        title,
        description,
        isClaimed: false,
        createdAt: new Date().toISOString(),
      }
      state.items = [...state.items, newItem]
    },
    claimItem: (state, action) => {
      const itemId = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        state.items[itemIndex] = {
          ...state.items[itemIndex],
          isClaimed: true,
        };
      }
    },
    deleteItem: (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload)
      },
    // Other actions related to items (update, delete, etc.) can be defined here
  },
})

export const { addItem, claimItem, deleteItem } = itemSlice.actions
export default itemSlice.reducer