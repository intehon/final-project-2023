import { useDispatch } from 'react-redux';
import { deleteAllUsers } from '../reducers/userSlice'
import styled from '@emotion/styled';

export const PageAdmin = () => {
  const dispatch = useDispatch()

  const handleDeleteAllUsers = () => {
    dispatch(deleteAllUsers())
  }

  return (
    <div className='pageContainer'>
        <Button onClick={handleDeleteAllUsers}>DELETE ALL USERS ☠️</Button>
    </div>
  )
}

const Button = styled.button`
  background-color: var(--button-color);
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color); 
  }
`