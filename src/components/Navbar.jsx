import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { signOut } from '../reducers/userSlice'
import { FaPlus} from "react-icons/fa6"
import { FaHome } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { FiLogOut } from "react-icons/fi"

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

  const isHomePage = location.pathname === '/home'

  const handleGoHome = () => {
    if (!isHomePage) {
      navigate('/home')
    } else {
      navigate('/')
    }
  }
  
  const isAddItemPage = location.pathname === '/addItem'  

  const showNoItemsText = totalItems === 0

  return (
    <Navbar>
 {showNoItemsText ? (
        <TextWrapper>
          <NavBarText>
            Unlock the magic of sharing. Turn your cherished belongings into someone else's treasure. 🧙🏽
          </NavBarText>
        </TextWrapper>
      ) : (
        <TextWrapper>
          <NavBarText>
            {unclaimedItems} out of {totalItems} items are still up for grabs! Go get it! *grab grab* 🦀
          </NavBarText>
        </TextWrapper>
      )}
      <NavButtonWrapper>
        {authenticated ? (
          <>
            <NavLink to="/userpage">
              <NavButton activeClassName="active">
                <CgProfile />
              </NavButton>
            </NavLink>
            {isAddItemPage ? (
            <NavButton activeClassName="active" onClick={handleGoHome}>
              <FaHome />
            </NavButton>
          ) : (
            <NavLink to="/addItem">
              <NavButton activeClassName="active">
                <FaPlus />
              </NavButton>
            </NavLink>
          )}
            <NavButton onClick={handleSignOut}>
              <FiLogOut />
            </NavButton>
          </>
        ) : (
          <NavButton onClick={handleLoginOrBack}>{buttonText}</NavButton>
        )}
      </NavButtonWrapper>
    </Navbar>
  )
}

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const NavButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #e5989b;
  color: #fff;

  &:hover {
    background-color: #ffb4a2; 
  }
`
const NavBarText = styled.p`
  font-size: 12px;
  color: rgb(162, 162, 162);
`

const NavButtonWrapper = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-evenly; 
  width: 100%; 
  margin-top: 8px; 

  @media (min-width: 768px) {
    flex-direction: row; 
    margin-top: 0; 
  }
`

const TextWrapper = styled.div`
  width: 60%;
  padding: 10px;

  @media (min-width: 768px) {
    width: 100%;
    padding: 0;
  }
`