import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { signOut } from '../reducers/userSlice';

export const NavBar = () => {
  const authenticated = useSelector(state => state.user.authenticated)
  const items = useSelector((state) => state.items.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = () => {
    dispatch(signOut())
    // Clear user data from localStorage
    localStorage.removeItem('userData')
    //Redirect to welcome page ('/') after signed out
    navigate('/')
  }

  const isLoginPage = location.pathname === '/login'
  const buttonText = isLoginPage ? 'Back' : 'Login'

  const handleLoginOrBack = () => {
    if (isLoginPage) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  const totalItems = items.length
  const unclaimedItems = items.filter((item) => !item.isClaimed).length


  return (
    <Navbar>
      <div>
      <NavBarText>{unclaimedItems} out of {totalItems} items are still up for grabs! Go get it!</NavBarText>
      <NavBarText>🫳🏽 *crab grab* 🦀</NavBarText>
      </div>
      <div>
      {authenticated ? (
          <NavButton onClick={handleSignOut}>Sign Out</NavButton>
        ) : (
          <NavButton onClick={handleLoginOrBack}>{buttonText}</NavButton>
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

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  /* margin-bottom: 10px; */
`

const NavButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #e5989b;
  color: #fff;
  margin-right: 10px; 

  &:hover {
    background-color: #ffb4a2; 
  }
`
const NavBarText = styled.p`
  font-size: 12px;
`