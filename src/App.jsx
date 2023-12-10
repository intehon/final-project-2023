import { configureStore } from '@reduxjs/toolkit'
import { setUser } from './reducers/userSlice'
import { setItems } from './reducers/itemSlice'
import userReducer from './reducers/userSlice'
import itemsReducer from './reducers/itemSlice'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WelcomePage } from './pages/WelcomePage'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { AddItem } from './components/AddItem'
import { Header } from './components/Header'
import { UserPage } from './pages/UserPage'
import { Signup } from './pages/Signup'
import { PageAdmin } from './pages/PageAdmin'

const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  }
})

// Load user data from localStorage
const userData = JSON.parse(localStorage.getItem('user'))
if (userData && userData.email && userData.password && userData.error) {
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
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/userPage" element={<UserPage />} />
            <Route path='/admin' element={<PageAdmin />} />
          </Routes>
      </BrowserRouter>
    </Provider>
    )
}