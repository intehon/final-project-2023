import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuthenticated } from '../reducers/userSlice'
import { ItemListing } from '../components/ItemListing';

export const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.user.authenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'))
  
    if (storedUserData && storedUserData.authenticated) {
      dispatch(setAuthenticated(storedUserData));
    }
  }, [dispatch])


  const storedUserData = useSelector((state) => state.user)

  console.log('Stored userData: ', storedUserData)


    return (
        <div className='pageContainer'>
      {isAuthenticated ? <ItemListing /> : null}
        </div>
    )
}