import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setUserAuthenticated  } from '../reducers/userSlice'
import { setAuthenticated } from '../reducers/authSlice'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

export const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmailValue] = useState('')
  const [password, setPasswordValue] = useState('')
  const [username, setUsernameValue] = useState('')
  const error = useSelector((state) => state.user.error)
  const existingUsers = useSelector((state) => state.user.users)

  const handleSignup = (event) => {
    event.preventDefault()

    const isUserNameExisting = existingUsers.some((user) => user.username === username)
    const isUserEmailExisting = existingUsers.some((user) => user.email === email)
  
    if (isUserNameExisting) {
      dispatch(setError('Username already exists.'))
      return
    }
  
    if (isUserEmailExisting) {
      dispatch(setError('Email already exists.'))
      return
    }

    // Store user data in localStorage
    const userData = {
      email,
      username,
      authenticated: true,
    }

    localStorage.setItem('userData', JSON.stringify(userData))

    //check how setAuthenticated is dispatched in Signup component
    const payload = { authenticated: true, email, password, username }
    console.log('Payload before dispatching setAuthenticated:', payload)

    dispatch(setUserAuthenticated({ authenticated: true, email, password, username }))
    dispatch(setAuthenticated({ authenticated: true, ...userData }))

    // Clear form fields after successful submission
    setEmailValue('')
    setPasswordValue('')
    setUsernameValue('')

    //Redirect to home page
    navigate('/home')
    }

  return (
    <div className='pageContainer'>
    <form onSubmit={handleSignup}>
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
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsernameValue(e.target.value)}
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
    <SubmitButton type="submit">Register</SubmitButton>
    </form>
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
  padding-top: 20px;
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
  margin-top: 10px;
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