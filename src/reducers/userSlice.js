import { createSlice } from '@reduxjs/toolkit'

// Function to retrieve users data from localStorage
const loadUsersData = () => {
  const storedUsersData = localStorage.getItem('users')
  return storedUsersData ? JSON.parse(storedUsersData) : []
}

const storedUsers = loadUsersData()

const initialState = {
  users: storedUsers,
  authenticated: false, 
  currentUser: null, 
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
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setInitialState: (state, action) => {
      return initialState
    },
    signUp: (state, action) => {
      const { email, password, username } = action.payload

      // Check if email or username already exists
      const isEmailRegistered = state.users.some((user) => user.email === email)
      const isUsernameTaken = state.users.some((user) => user.username === username)

      if (isEmailRegistered) {
        state.error = 'Email is already registered. Please login instead.'
        return
      }

      if (isUsernameTaken) {
        state.error = 'Username already taken. Choose another one.'
        return
      }

      // Add a new user to the array
      state.users.push({ email, password, username })
      localStorage.setItem('users', JSON.stringify(state.users))
    },
    signOut: (state) => {
      state.authenticated = false
      state.email = null
      state.password = null
      state.username = null
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

export const { 
  setAuthenticated, 
  setEmail, 
  setPassword, 
  setUsername,
  setError, 
  setInitialState, 
  signOut,
  signUp
} = userSlice.actions

export default userSlice.reducer