import { configureStore } from '@reduxjs/toolkit'
import { setUserAuthenticated, setEmail, setPassword } from './reducers/userSlice'
import { setItems } from './reducers/itemSlice'
import userReducer from './reducers/userSlice'
import itemsReducer from './reducers/itemSlice'
import authReducer from './reducers/authSlice'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WelcomePage } from './pages/WelcomePage'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { AddItem } from './components/AddItem'
import { Header } from './components/Header'
import { UserPage } from './pages/UserPage'
import { Signup } from './pages/Signup'
import { PageAdmin } from './pages/PageAdmin'
import { Sidebar } from './components/Sidebar'
import { SignOut } from './pages/SignOut'
import { NotFoundPage } from './components/NotFoundPage'
import { ItemDetail } from './components/ItemDetail'


const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
    auth: authReducer,
  }
})

// Load user data from localStorage
const userData = JSON.parse(localStorage.getItem('userData'))
if (userData) {
  const { authenticated, email, password } = userData

  if (typeof authenticated === 'boolean' && email && password) {
    store.dispatch(setUserAuthenticated(authenticated))
    store.dispatch(setEmail(email))
    store.dispatch(setPassword(password))
  }
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
          <Sidebar/>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/signup" element={<Signup />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/addItem" element={<AddItem />} />
              <Route path="/items/:itemId" element={<ItemDetail />} />
              <Route path="/userPage" element={<UserPage />} />
              <Route path='/admin' element={<PageAdmin />} />
              <Route path='/signOut' element={<SignOut />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
      </BrowserRouter>
    </Provider>
    )
}