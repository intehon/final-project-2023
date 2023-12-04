import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setUserId, setEmail, setPassword, setError } from './reducers/userSlice'
import userReducer from './reducers/userSlice'
import itemsReducer from './reducers/itemSlice'
import { setItems } from './reducers/itemSlice'
import { WelcomePage } from './pages/WelcomePage'
import { Home } from './pages/Home'
import { Login } from './pages/Login'

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  },
})


// Load user data from localStorage
const userData = JSON.parse(localStorage.getItem('user'))
if (userData) {
  store.dispatch(setUserId(userData.userId))
  store.dispatch(setEmail(userData.email))
  store.dispatch(setPassword(userData.password))
  store.dispatch(setError(userData.error))
}

// Load items data from localStorage
const storedItems = localStorage.getItem('items')
if (storedItems) {
  const parsedItems = JSON.parse(storedItems)
  store.dispatch(setItems(parsedItems)) // Dispatch parsedItems to the itemsReducer
}

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Define your routes and components here */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}