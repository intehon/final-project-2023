import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthenticated, setEmail, setPassword, setError } from '../reducers/userSlice'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [email, setEmailValue] = useState('')
  const [password, setPasswordValue] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const userId = useSelector(state => state.user.userId) // Retrieve userId from Redux state

  const handleLogin = (event) => {
    event.preventDefault()

    const storedEmail = localStorage.getItem('email')
    const storedPassword = localStorage.getItem('password')

    // Simulate login verification using local state and Redux actions
    if (email === storedEmail && password === storedPassword) {
      // Successful login 
      dispatch(setEmail(email))
      dispatch(setPassword(password))
      dispatch(setAuthenticated(true)) //set authenticated to true when logged in to access Home page
      dispatch(setError('')) // Clear error message in Redux state

      const user = {
        email,
      }

      localStorage.setItem('userData', JSON.stringify(user))
      navigate('/home') // Navigate to the '/home' route after successful login
    } else {
      // Unsuccessful login 
      dispatch(setError('Invalid email or password'))
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}