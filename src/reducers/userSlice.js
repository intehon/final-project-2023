import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  email: null,
  password: null,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    },
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
  },
})

export const { setUserId, setEmail, setPassword, setError, setInitialState } = userSlice.actions

export default userSlice.reducer