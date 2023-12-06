import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { signOut } from '../reducers/userSlice';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
`

const NavButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #b5838d;
  color: #fff;
  margin-right: 10px; 

  &:hover {
    background-color: #e5989b; 
  }
`

export const NavBar = () => {
  const authenticated = useSelector(state => state.user.authenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = () => {
    dispatch(signOut())
    // Clear user data from localStorage
    localStorage.removeItem('userData')
    //Redirect to welcome page ('/') after signed out
    navigate('/')
  }

  return (
    <Navbar>
      <div>{/* Your site logo or title can be placed here */}</div>
      <div>
        {authenticated ? (
          <NavButton onClick={handleSignOut}>Sign Out</NavButton>
        ) : (
          <Link to="/login">
            <NavButton>Login</NavButton>
          </Link>
        )}
        {authenticated && (
          <NavLink to="/addItem">
            <NavButton activeClassName="active">Add Item</NavButton>
          </NavLink>
        )}
      </div>
    </Navbar>
  )
}