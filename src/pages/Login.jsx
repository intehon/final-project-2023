import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAuthenticated, setError } from '../reducers/userSlice'
import { setCurrentUser } from '../reducers/authSlice'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

export const Login = () => {
  const [email, setEmailValue] = useState('')
  const [password, setPasswordValue] = useState('')
  const error = useSelector((state) => state.user.error)
  const users = useSelector((state) => state.user.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
  
    // Find user with entered email in Redux state
    const foundUser = users.find((user) => user.email === email)
  
    if (foundUser && foundUser.password === password) {
      const userData = {
        username: foundUser.username,
        email: foundUser.email,
        password: foundUser.password,
        authenticated: true,
      }
  
      // Successful login, set user data in localStorage and Redux state
      localStorage.setItem('userData', JSON.stringify(userData))
  
      //Dispatch action to set current user after successful login
      dispatch(setUserAuthenticated(userData));
  
      navigate('/home')
    } else {
      // Unsuccessful login
      dispatch(setError('Invalid email or password'))
    }
  }

  return (
      <div className='pageContainer'>
        <div>
          <form onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor="email">Email:</Label>
              <InputWithError
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmailValue(e.target.value)}
                error={error}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password:</Label>
              <InputWithError
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPasswordValue(e.target.value)}
              error={error}
            />
            </FormGroup>
            <SubmitButton type="submit">Login</SubmitButton>
          </form>
        </div>
          {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      </div>
  )
}


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
  background-color: var(--button-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color); 
  }
`

const ErrorMessage = styled.div`
  color: red;
  font-style: italic;
  margin-top: 5px;
  font-size: 12px;
`

const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
`

const shakingStyles = css`
  animation: ${shakeAnimation} 0.4s ease-in-out;
`

const InputWithError = styled(Input)`
  ${({ error }) => error && shakingStyles}
`