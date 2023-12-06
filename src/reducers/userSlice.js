import { createSlice } from '@reduxjs/toolkit'

// Function to retrieve user data from localStorage
const loadUserData = () => {
  const storedUserData = localStorage.getItem('userData')
  return storedUserData ? JSON.parse(storedUserData) : null
}

const storedUser = loadUserData()

const initialState = {
  authenticated: !!storedUser, // Set authenticated based on stored user data
  email: storedUser ? storedUser.email : null,
  password: storedUser ? storedUser.password : null,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setInitialState: (state, action) => {
      return initialState
    },
    signOut: (state) => {
      state.authenticated = false
      state.email = null
      state.password = null
      state.error = null
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload

      // If setting authenticated to true, store user data in localStorage
      if (action.payload) {
        const { email, password } = state
        localStorage.setItem('userData', JSON.stringify({ email, password }))
      } else {
        // If setting authenticated to false (logout), remove user data from localStorage
        localStorage.removeItem('userData')
      }
    },
  },
})

export const { setAuthenticated, setEmail, setPassword, setError, setInitialState, signOut } = userSlice.actions

export default userSlice.reducer