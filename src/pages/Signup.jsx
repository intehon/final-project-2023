import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setEmail, setPassword, setAuthenticated } from '../reducers/userSlice'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

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
  background-color: #b5838d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e5989b; 
  }
`

export const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmailValue] = useState('')
  const [password, setPasswordValue] = useState('')

  const handleSignup = (event) => {
    event.preventDefault()

    localStorage.setItem('email', email)
    localStorage.setItem('password', password)

    dispatch(setEmail(email))
    dispatch(setPassword(password))
    dispatch(setAuthenticated(true)) 

    const user = {
      email,
    }

    //Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(user))

    // Clear form fields after submission
    setEmailValue('')
    setPasswordValue('')

    //Redirect to home page
    navigate('/home')
  }

  return (
    <form onSubmit={handleSignup}>
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
      <SubmitButton type="submit">Signup</SubmitButton>
    </form>
  )
}