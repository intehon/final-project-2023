import { NavLink, useNavigate  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import logo from '../assets/logo_transparent.png'
import { FaPlus} from "react-icons/fa6"
import { CgProfile } from "react-icons/cg"
import { FiLogOut } from "react-icons/fi"
import { signOut } from '../reducers/userSlice'
import { clearAuthData } from '../reducers/authSlice'

export const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isUserAuthenticated = useSelector((state) => state.user.authenticated)

    if (!isUserAuthenticated) {
        return null
      }

    const handleSignOut = () => {
        dispatch(signOut())
        dispatch(clearAuthData())
        localStorage.removeItem('userData')
        navigate('/')
      }


    return (
        <SidebarContainer>
          <LogoContainer>
            <NavLink to="/home">
              <img src={logo} alt="ShareShelf logo" />
            </NavLink>
          </LogoContainer>
          <SidebarLink to="/addItem">
            <IconWrapper>
              <FaPlus />
            </IconWrapper>
            Add Item
          </SidebarLink>
          <SidebarLink to="/userpage">
            <IconWrapper>
              <CgProfile />
            </IconWrapper>
            Update Profile
          </SidebarLink>
          <SidebarLink to="/" onClick={handleSignOut}>
            <IconWrapper>
              <FiLogOut />
            </IconWrapper>
            Sign Out
          </SidebarLink>
        </SidebarContainer>
      )
    }

    const SidebarContainer = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    background-color: #fff;
    border-right: 1px solid #ccc;
    padding: 20px;
    box-sizing: border-box;
    z-index: 1000;
  
    @media (max-width: 768px) {
      display: none;
    }
  `
  
  const SidebarLink = styled(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    border-radius: 5px;
    color: #333;
    padding: 15px 10px;
    transition: color 0.3s ease;
  
    &:hover {
      background-color: #99b0b6;
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
  
  const IconWrapper = styled.span`
    margin-right: 10px;
    display: flex;
    align-items: center;
  `