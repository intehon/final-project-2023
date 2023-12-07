import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { setEmail, setPassword, setUsername } from '../reducers/userSlice'

export const UserPage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const storedUserData = JSON.parse(localStorage.getItem('userData')) || {}

  const [newEmail, setNewEmail] = useState(storedUserData.email || '')
  const [newUsername, setNewUsername] = useState(storedUserData.username || '')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    // Update local state when Redux state changes (username, email)
    setNewEmail(user.email || '')
    setNewUsername(user.username || '')
  }, [user])

  
  const handleEmailChange = (e) => {
    setNewEmail(e.target.value)
  }

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    //dispatch actions to update user information if values are different
    if (newEmail !== user.email) {
      dispatch(setEmail(newEmail))
    }
    if (newPassword !== user.password) {
      dispatch(setPassword(newPassword))
    }
    if (newUsername !== user.username) {
      dispatch(setUsername(newUsername))
    }

    //clear the form inputs after submission
    setNewEmail('')
    setNewUsername('')
    setNewPassword('')
  };

  return (
    <PageContainer>
      <UserInfo>
        <h2>User Profile</h2>
        <UserInfoDetails>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </UserInfoDetails>
      </UserInfo>
      <UserForm onSubmit={handleFormSubmit}>
        <h2>Update Profile</h2>
        <StyledForm>
          <FormLabel>New Username:</FormLabel>
          <FormInput type="text" value={newUsername} onChange={handleUsernameChange} />
          <FormLabel>New Email:</FormLabel>
          <FormInput type="email" value={newEmail} onChange={handleEmailChange} />
          <FormLabel>New Password:</FormLabel>
          <FormInput type="password" value={newPassword} onChange={handlePasswordChange} />
          <SubmitButton type="submit">Update</SubmitButton>
        </StyledForm>
      </UserForm>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const UserInfo = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`

const UserInfoDetails = styled.div`
  p {
    margin-bottom: 10px;
  }
`

const UserForm = styled.form`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
`

const FormLabel = styled.label`
  margin-bottom: 5px;
`

const FormInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
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