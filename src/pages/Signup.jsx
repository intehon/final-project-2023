import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setEmail, setPassword } from '../reducers/userSlice'

export const Signup = () => {
  const dispatch = useDispatch()
  const [email, setEmailValue] = useState('')
  const [password, setPasswordValue] = useState('')

  const handleSignup = (event) => {
    event.preventDefault()

    localStorage.setItem('email', email)
    localStorage.setItem('password', password)

    dispatch(setEmail(email))
    dispatch(setPassword(password))

    // Clear form fields after submission
    setEmailValue('')
    setPasswordValue('')
  }

  return (
    <div>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}