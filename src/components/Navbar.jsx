import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { signOut } from '../reducers/userSlice'
import { FaPlus} from "react-icons/fa6"
import { FaHome } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { FiLogOut } from "react-icons/fi"
import logo from '../assets/logo_transparent.png'

export const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.user.authenticated)
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
    <>
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
              {unclaimedItems} out of {totalItems} items are still up for grabs!</NavBarText>
              <NavBarText>Go get it! *grab grab* 🦀
            </NavBarText>
          </TextWrapper>
        )}
          <MobileOnly>
          {isAuthenticated ? (
            <>
            <StyledNavLink to="/userpage">
              <NavButton activeClassName="active">
                Update Profile <CgProfile />
              </NavButton>
            </StyledNavLink>
              {isAddItemPage ? (
                <NavButton activeClassName="active" onClick={handleGoHome}>
                  Explore Items <FaHome />
                </NavButton>
              ) : (
                <StyledNavLink to="/addItem">
                  <NavButton activeClassName="active">
                    Add Items <FaPlus />
                  </NavButton>
                </StyledNavLink>
              )}
              <NavButton onClick={handleSignOut}>
                Logout <FiLogOut />
              </NavButton>
            </>
          ) : (
            null
          )}
        </MobileOnly>
        {!isAuthenticated && (
          <NavButton onClick={handleLoginOrBack}>{buttonText}</NavButton>
        )}
    </Navbar>
    {!isAuthenticated && ( 
              <LogoContainer>
              <img src={logo} alt="ShareShelf logo" />
            </LogoContainer>  
        )}

          </>
    
  )
}

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;

  @media (min-width: 768px) {
    flex-direction: row; 
    justify-content: center;
    align-items: center;
  }
`

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--button-color);
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  gap: 10px;
  text-decoration: none; 
  font-size: 12px;

  &:hover {
    background-color: var(--secondary-color); 
  }
`


const NavBarText = styled.p`
  font-size: 12px;
  color: rgb(162, 162, 162);
`

const TextWrapper = styled.div`
  text-align: center;
  padding: 10px;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 100%;
    padding: 0;
  }
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`

const MobileOnly = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px; 

  @media (min-width: 768px) {
    display: none; 
  }
`

const LogoContainer = styled.div`
  margin: 0 auto;
  max-width: 180px; 
  padding: 10px;
  
  img {
    width: 100%; 
    height: auto; 
    display: block;
    margin: 0 auto; 
  }
`