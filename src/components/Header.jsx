import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../reducers/userSlice'
export const Header = () => {
  const userId = useSelector(state => state.user.userId) // Get userId from Redux state
  const dispatch = useDispatch()

  const handleSignOut = () => {
    dispatch(signOut())
    //Clear user date from localStorage
    localStorage.removeItem('userData')
  }

  return (
    <header>
      <nav>
          {/* Conditionally render Sign Out or Sign In button based on user's authentication status */}
          {userId ? (
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          ) : (
            <li>
              <NavLink to="/login">Sign In</NavLink>
            </li>
          )}
      </nav>
    </header>
  )
}