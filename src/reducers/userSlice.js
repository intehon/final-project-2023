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
  email: '',
  password: '',
  username: '',
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
    setUserAuthenticated: (state, action) => {
      state.authenticated = action.payload.authenticated

      if (action.payload.authenticated) {
        const { email, password } = action.payload
        state.email = email
        state.password = password
        localStorage.setItem('userData', JSON.stringify({ email, password, authenticated: true }))
      } else {
        localStorage.removeItem('userData');
      }
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setInitialState: (state, action) => {
      return initialState
    },
    signUp: (state, action) => {
      const { email, password, username } = action.payload;
    
      const isEmailRegistered = state.users.some((user) => user.email === email)
      const isUsernameTaken = state.users.some((user) => user.username === username)
    
      if (!isEmailRegistered && !isUsernameTaken) {
        // Add a new user to the array only if the user doesn't already exist
        state.users.push({ email, password, username })
        localStorage.setItem('users', JSON.stringify(state.users))
      
        // Dispatch actions after successful signup
        dispatch(
          setUserAuthenticated({
            authenticated: true,
            email,
            password,
          })
        )
      } else {
        if (isEmailRegistered) {
          dispatch(setError('Email already registered.'))
        }
        if (isUsernameTaken) {
          dispatch(setError('Username already exists.'))
      }
    }
  },
    signOut: (state) => {
      state.authenticated = false;
    },
    setUser: (state, action) => {
      const { email, password, username, error, isAuthenticated } = action.payload;
      state.email = email;
      state.password = password;
      state.username = username;
      state.error = error;
      state.authenticated = isAuthenticated;
    },
    deleteAllUsers: (state) => {
      state.users = [] //Reset the users array to an empty array
    },
  },
})

export const { 
  setUserAuthenticated, 
  setEmail, 
  setPassword, 
  setUsername,
  setError, 
  setInitialState, 
  signOut,
  signUp,
  setUser,
  deleteAllUsers,
} = userSlice.actions

export default userSlice.reducer