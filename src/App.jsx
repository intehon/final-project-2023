

import { configureStore } from '@reduxjs/toolkit'
import { setEmail, setPassword, setError } from './reducers/userSlice'
import userReducer from './reducers/userSlice'
import itemsReducer from './reducers/itemSlice'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { setItems } from './reducers/itemSlice'
import { WelcomePage } from './pages/WelcomePage'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { AddItem } from './components/AddItem'
import { Header } from './components/Header'
import { UserPage } from './pages/UserPage'
import { SignUp } from './pages/SignUp'

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  }
})

// Load user data from localStorage
const userData = JSON.parse(localStorage.getItem('user'))
if (userData) {
  // store.dispatch(setUserId(userData.userId))
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
        <Header />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUp />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/userPage" element={<UserPage />} />
          </Routes>
      </BrowserRouter>
    </Provider>
    )
}