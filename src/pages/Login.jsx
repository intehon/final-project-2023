import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthenticated, setEmail, setPassword, setError } from '../reducers/userSlice'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

export const Login = () => {
  const [email, setEmailValue] = useState('')
  const [password, setPasswordValue] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      <div className='pageContainer'>
        <FormContainer>
          <form onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </FormGroup>
            <SubmitButton type="submit">Login</SubmitButton>
          </form>
        </FormContainer>
      </div>
  )
}

const FormContainer = styled.div`
  width: 300px;
`

const FormGroup = styled.div`
  margin-bottom: 15px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #e5989b;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ffb4a2; 
  }
`