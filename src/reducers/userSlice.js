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
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload.authenticated;
    
      if (action.payload.authenticated) {
        const { email, password } = action.payload;
        state.email = email;
        state.password = password;
        localStorage.setItem('userData', JSON.stringify({ email, password }));
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
        // Add a new user to the array
        state.users.push({ email, password, username });
        localStorage.setItem('users', JSON.stringify(state.users));
    
        // Dispatch setAuthenticated action after successful signup
        dispatch(
          setAuthenticated({
            authenticated: true,
            email,
            password,
          })
        );
      }
    },
    signOut: (state) => {
      console.log('sign out reducer triggered')
      state.authenticated = false
      state.email = null
      state.password = null
      state.username = null
      state.error = null
    },
    setUser: (state, action) => {
      const { email, password, error, isAuthenticated } = action.payload;
      state.email = email;
      state.password = password;
      state.error = error;
      state.authenticated = isAuthenticated;
    },
    deleteAllUsers: (state) => {
      state.users = [] //Reset the users array to an empty array
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
  signUp,
  setUser,
  deleteAllUsers,
} = userSlice.actions

export default userSlice.reducer