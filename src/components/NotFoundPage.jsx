import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  // Redirect to the '/home' route when the 404 page is rendered
  useEffect(() => {
    navigate('/home')
  }, [navigate])

  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Redirecting to home...</p>
    </div>
  )
}