import { useDispatch } from 'react-redux';
import { deleteAllUsers } from '../reducers/userSlice'

export const PageAdmin = () => {
  const dispatch = useDispatch()

  const handleDeleteAllUsers = () => {
    dispatch(deleteAllUsers())
  }

  return (
    <div className='pageContainer'>
        <button onClick={handleDeleteAllUsers}>DELETE ALL USERS ☠️</button>
    </div>
  )
}