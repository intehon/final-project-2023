import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setUserId, setEmail, setPassword, setError } from './reducers/userSlice'
import userReducer from './reducers/userSlice'
import itemsReducer from './reducers/itemSlice'

import { WelcomePage } from './pages/WelcomePage'
import { Home } from './pages/Home'

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  }
})

const userData = JSON.parse(localStorage.getItem('user'))
if (userData) {
  store.dispatch(setUserId(userData.userId))
  store.dispatch(setEmail(userData.email))
  store.dispatch(setPassword(userData.password))
  store.dispatch(setError(userData.error))

}

export const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Define your routes and components here */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}