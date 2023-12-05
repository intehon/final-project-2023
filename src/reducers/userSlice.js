import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authenticated: false,
  email: null,
  password: null,
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
      state.userId = null
      state.email = null
      state.password = null
      state.error = null
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload
    }
  },
})

export const { setAuthenticated, setEmail, setPassword, setError, setInitialState, signOut } = userSlice.actions

export default userSlice.reducer