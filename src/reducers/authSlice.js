
import { createSlice } from '@reduxjs/toolkit'

// Function to retrieve authentication data from localStorage
const loadAuthData = () => {
  const storedAuthData = localStorage.getItem('authData')
  return storedAuthData
    ? JSON.parse(storedAuthData)
    : { currentUser: null, isAuthenticated: false, error: null }
}

const initialState = loadAuthData()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
      state.isAuthenticated = !!action.payload
      state.error = null

      // Update local storage with the new authentication data
      localStorage.setItem('authData', JSON.stringify(state))
    },
    setAuthError: (state, action) => {
      state.error = action.payload
    },
    clearAuthData: () => {
      return {
        currentUser: null,
        isAuthenticated: false,
        error: null,
      }
    },
    setAuthenticated: (state, action) => {
        state.currentUser = action.payload.currentUser
        state.isAuthenticated = action.payload.isAuthenticated;
        state.error = null
  
        // Update local storage with the new authentication data
        localStorage.setItem('authData', JSON.stringify(state))
      },
  },
})

export const { 
  setCurrentUser, 
  setAuthError, 
  clearAuthData, 
  setAuthenticated 
} = authSlice.actions

export default authSlice.reducer