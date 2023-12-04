import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setPassword, setError, generateUUID } from '../reducers/userSlice'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [email, setEmailValue] = useState('')
  const [password, setPasswordValue] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector(state => state.user.userId) // Retrieve userId from Redux state

  const handleLogin = (event) => {
    event.preventDefault()

    const storedEmail = localStorage.getItem('email')
    const storedPassword = localStorage.getItem('password')

    // Simulate login verification using local state and Redux actions
    if (email === storedEmail && password === storedPassword) {
      // Successful login 
      dispatch(setEmail(email))
      dispatch(setPassword(password))
      dispatch(setError('')) // Clear error message in Redux state

      // Dispatch action to generate a UUID for the user if it's not already generated
      if (!userId) {
        dispatch(generateUUID())
      }

      const user = {
        userId: userId || generateRandomUserId(), // Use existing userId or generate a random one
        email,
        password,
      }

      localStorage.setItem('userData', JSON.stringify(user))
      navigate('/home') // Navigate to the '/home' route after successful login
    } else {
      // Unsuccessful login 
      dispatch(setError('Invalid email or password'))
    }
  }

  // Function to generate a random userId if not available
  const generateRandomUserId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
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