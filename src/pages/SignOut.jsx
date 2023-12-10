import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearAuthData } from '../reducers/authSlice'

export const SignOut = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(clearAuthData())
      localStorage.removeItem('userData')
    }
    navigate('/')
  }, [dispatch, navigate, isAuthenticated])

  return null
}