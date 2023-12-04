import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

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
    signOut: (state) => {
      state.userId = null
      state.email = null
      state.password = null
      state.error = null
    },
  },
})

export const { setUserId, setEmail, setPassword, setError, setInitialState, signOut } = userSlice.actions

export const generateUUID = () => {
  return (dispatch) => {
    const userId = uuidv4()
    dispatch(setUserId(userId))
  }
}

export default userSlice.reducer