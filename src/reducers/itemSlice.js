import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const loadItems = () => {
    const storedItems = localStorage.getItem('items')
    return storedItems ? JSON.parse(storedItems) : []
}

const saveItems = (items) => {
    localStorage.setItem('items', JSON.stringify(items))
}

const initialState = {
  items: loadItems(), //Load items from localStorage initially
}

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { title, description, imageUrl, tags } = action.payload
      const newItem = {
        id: uuidv4(),
        title,
        description,
        imageUrl,
        tags,
        isClaimed: false,
        createdAt: new Date().toISOString(),
      }
      state.items = [...state.items, newItem]
      saveItems(state.items) //Save to localStorage
    },
    claimItem: (state, action) => {
      const itemId = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === itemId)
      if (itemIndex !== -1) {
        state.items[itemIndex] = {
          ...state.items[itemIndex],
          isClaimed: true,
        }
      }
      saveItems(state.items) //Save to localStorage
    },
    deleteItem: (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload)
        saveItems(state.items) //Save to localStorage
      },
      setItems: (state, action) => {
        state.items = action.payload
      }
  },
})

export const { addItem, claimItem, deleteItem, setItems } = itemSlice.actions
export default itemSlice.reducer