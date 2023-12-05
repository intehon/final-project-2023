import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../reducers/userSlice'


export const Header = () => {
  const authenticated = useSelector(state => state.user.authenticated)
  // const email = useSelector(state => state.user.email) //get email from redux state
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
          {authenticated ? (
              <button onClick={handleSignOut}>Sign Out</button>
          ) : (
              <NavLink to="/login">Sign In</NavLink>

          )}
      </nav>
    </header>
  )
}